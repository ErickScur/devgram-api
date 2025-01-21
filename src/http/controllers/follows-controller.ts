import { Request, Response } from 'express';
import { FollowsRepository } from '../../db/repositories/follows';

export class FollowsController {
    private followsRepository: FollowsRepository

    constructor() {
        this.followsRepository = new FollowsRepository()
    }

    async createFollow(req: Request, res: Response) {
        const followerId = req.user?.id
        if (!followerId) {
            res.status(401).json({
                message: 'Unauthorized'
            })
            return
        }

        const followingId = req.params.followingId
        if (!followerId) {
            res.status(400).json({
                message: 'Following Id is required'
            })
            return
        }

        const alreadyFollow = await this.followsRepository.loadFollow(followerId, Number(followingId))
        if (alreadyFollow) {
            res.status(403).json({
                message: 'You already follow this user'
            })
            
            return
        }

        await this.followsRepository.createFollow(followerId, Number(followingId))

        res.status(201).json({
            message: 'Follow was added'
        })
    }

    async unfollow(req: Request, res: Response) {
        const followerId = req.user?.id;
        if (!followerId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
    
        const followingId = req.params.id;
        if (!followingId) {
            res.status(400).json({ message: 'Following Id is required' });
            return;
        }
    
        const follow = await this.followsRepository.loadFollow(followerId, Number(followingId));
        if (!follow) {
            res.status(403).json({ message: 'You do not follow this user' });
            return;
        }
    
        await this.followsRepository.deleteFollow(followerId, Number(followingId));
        res.status(200).json({ message: 'Unfollow successful' });
    }
    
    async listFollowers(req: Request, res: Response) {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({ message: 'User Id is required' });
            return;
        }
    
        const followers = await this.followsRepository.loadFollowers(Number(userId));
        res.status(200).json({ followers });
    }
    
    async listFollowing(req: Request, res: Response) {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({ message: 'User Id is required' });
            return;
        }
    
        const following = await this.followsRepository.loadFollowing(Number(userId));
        res.status(200).json({ following });
    }   
}