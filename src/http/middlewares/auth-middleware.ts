import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../utils/jwt';
import { UsersRepository } from '../../db/repositories/users-repository';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }
    
    const token = authHeader.split(' ')[1]

    try {
        const decoded = verifyToken(token)

        const usersRepository = new UsersRepository()

        const user = await usersRepository.loadById(decoded.userId)
        if(!user) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }

        req.user = {
            id: user.id,
            email: user.email,
        }

        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}