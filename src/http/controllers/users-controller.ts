import { Request, Response } from 'express'
import { registerValidator } from '../validators/register-validator'
import { ZodError } from 'zod'
import { hashPassword } from '../../utils/hash-password'
import { UsersRepository } from '../../db/repositories/users-repository'

export class UsersController {
    private usersRepository: UsersRepository

    constructor() {
        this.usersRepository = new UsersRepository()
    }

    async register(request: Request, response: Response) {
        try {
            const { email, password, name } = registerValidator.parse(request.body)

            const hashedPassword = await hashPassword(password)

            const createdUser = await this.usersRepository.create({
                email,
                name,
                password: hashedPassword,
            })

            response.status(201).json({
                message: 'User was created!',
                createdUser
            })
        } catch (error) {
            if (error instanceof ZodError) {
                response.status(400).json({
                    errors: error.errors
                })
            } else {
                console.log(error)
                response.status(500).json({
                    error,
                })
            }
        }
    }
}