import { Router } from 'express'
import { UsersController } from '../controllers/users-controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const userRouter = Router()
const usersController = new UsersController()

userRouter.post('/register', (req, res) => usersController.register(req, res))
userRouter.get('/me', authMiddleware, (req, res) => usersController.getLoggedUser(req, res))

export { userRouter }