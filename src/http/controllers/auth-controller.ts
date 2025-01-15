import { Request, Response } from 'express'
import { UsersRepository } from '../../db/repositories/users-repository'
import { authenticateValidator } from '../validators/authenticate-validator'
import { ZodError } from 'zod'
import { verifyPassword } from '../../utils/hash-password'
import { generateToken } from '../../utils/jwt'

export class AuthController {
    private usersRepository: UsersRepository
    
    constructor() {
        this.usersRepository = new UsersRepository()
    }

    async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = authenticateValidator.parse(request.body)
            
            const user = await this.usersRepository.loadByEmail(email)
            if (!user) {
                response.status(401).json({
                    message: 'Unauthorized'
                })
                return
            }

            const isPasswordValid = await verifyPassword(password, user.password)
            if (!isPasswordValid) {
                response.status(401).json({
                    message: 'Unauthorized'
                })
                return
            }

            const token = generateToken(user.id)
            response.status(200).json({
                token,
            })
        } catch (error) {
            if (error instanceof ZodError) {
                response.status(400).json({
                    error: error.errors
                })
            } else {
                response.status(500).json({
                    error,
                })
            }
        }
    }
}