import { Router } from 'express'
import { FollowsController } from '../controllers/follows-controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const followsRouter = Router()
const followsController = new FollowsController()

followsRouter.post('/follow/:followingId', authMiddleware, (req, res) =>
    followsController.createFollow(req, res)
);
followsRouter.delete('/unfollow/:id', authMiddleware, (req, res) =>
    followsController.unfollow(req, res)
);
followsRouter.get('/users/:id/followers', authMiddleware, (req, res) =>
    followsController.listFollowers(req, res)
);
followsRouter.get('/users/:id/following', authMiddleware, (req, res) =>
    followsController.listFollowing(req, res)
);

export { followsRouter };
