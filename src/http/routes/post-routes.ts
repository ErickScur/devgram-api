import { Router } from 'express';
import { PostsController } from '../controllers/posts-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const postRouter = Router()
const postsController = new PostsController()

postRouter.post('/posts', authMiddleware, (req, res) => postsController.create(req, res))
postRouter.get('/posts', authMiddleware, (req, res) => postsController.loadAll(req, res))
postRouter.get('/posts/:id', authMiddleware, (req, res) => postsController.loadById(req, res))
postRouter.patch('/posts/:id', authMiddleware, (req, res) => postsController.update(req, res))
postRouter.delete('/posts/:id', authMiddleware, (req, res) => postsController.delete(req, res))

postRouter.post('/posts/:id/like', authMiddleware, (req, res) => postsController.likePost(req, res))
postRouter.post('/posts/:id/unlike', authMiddleware, (req, res) => postsController.unlikePost(req, res))

export { postRouter }