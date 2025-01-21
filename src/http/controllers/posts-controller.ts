import { Request, Response } from 'express';
import { PostsRepository } from '../../db/repositories/posts';
import { createPostValidator } from '../validators/create-post-validator';
import { ZodError } from 'zod';
import { updatePostValidator } from '../validators/update-post-validator';

export class PostsController {
    private postsRepository: PostsRepository

    constructor() {
        this.postsRepository = new PostsRepository()
    }

    async create(req: Request, res: Response) {
        try {
            const imageUrl = req.file?.path

            const data = createPostValidator.parse(req.body)

            const authorId = req.user?.id
            if (!authorId) {
                res.status(401).json({
                    message: 'Unauthorized'
                })
                return
            }

            const post = await this.postsRepository.create({
                content: data.content,
                authorId,
                image: imageUrl,
            })

            res.status(201).json({
                post
            })
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: error.errors
                })
            } else {
                res.status(500).json({ error })
            }
        }
    }

    async loadAll(req: Request, res: Response) {
        const posts = await this.postsRepository.loadAll()

        res.status(200).json({
            posts
        })
    }

    async loadById(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            res.status(400).json({
                message: 'Post id is required'
            })
            return
        }

        const post = await this.postsRepository.loadById(Number(id))
        if (!post) {
            res.status(404).json({
                message: 'Post not found'
            })
            return
        }

        res.status(200).json({
            post
        })
    }

    async update(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            res.status(400).json({
                message: 'Post id is required'
            })
            return
        }

        const post = await this.postsRepository.loadById(Number(id))
        if (!post) {
            res.status(404).json({
                message: 'Post not found'
            })
            return
        }

        if (req.user?.id !== post.authorId) {
            res.status(403).json({
                message: 'Forbidden - only the author can update the post'
            })
            return
        }

        try {
            const data = updatePostValidator.parse(req.body)

            const updatedPost = await this.postsRepository.update(Number(id), {
                ...data,
            })

            res.status(200).json({
                updatedPost
            })
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: error.errors
                })
            } else {
                res.status(500).json({ error })
            }
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            res.status(400).json({
                message: 'Post id is required'
            })
            return
        }

        const post = await this.postsRepository.loadById(Number(id))
        if (!post) {
            res.status(404).json({
                message: 'Post not found'
            })
            return
        }

        if (req.user?.id !== post.authorId) {
            res.status(403).json({
                message: 'Forbidden - only the author can delete the post'
            })
            return
        }

        await this.postsRepository.delete(Number(id))

        res.status(200).json({
            message: 'Post was deleted'
        })
    }

    async likePost(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            res.status(400).json({
                message: 'Post id is required'
            })
            return
        }

        const post = await this.postsRepository.loadById(Number(id))
        if (!post) {
            res.status(404).json({
                message: 'Post not found'
            })
            return
        }

        const userId = Number(req.user?.id)

        const postLike = await this.postsRepository.loadPostLike(post.id, userId)
        if (postLike) {
            res.status(200).json({
                post
            })
            return
        }

        await this.postsRepository.createLike(post.id, userId)
        const updatedPost = await this.postsRepository.update(post.id, {
            likes: post.likes + 1
        })

        res.status(200).json({
            post: updatedPost
        })
    }

    async unlikePost(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            res.status(400).json({
                message: 'Post id is required'
            })
            return
        }

        const post = await this.postsRepository.loadById(Number(id))
        if (!post) {
            res.status(404).json({
                message: 'Post not found'
            })
            return
        }

        const userId = Number(req.user?.id)

        const postLike = await this.postsRepository.loadPostLike(post.id, userId)
        if (!postLike) {
            res.status(200).json({
                post
            })
            return
        }

        await this.postsRepository.deleteLike(post.id, userId)
        const updatedPost = await this.postsRepository.update(post.id, {
            likes: post.likes - 1
        })

        res.status(200).json({
            post: updatedPost
        })
    }

    async loadFeed(req: Request, res: Response ){
        const userId = req.user?.id
        if (!userId) {
            res.status(401).json({
                message: 'Unauthorized'
            })
            return
        }

        const page = Number(req.query.page) ?? 1
        const limit = Number(req.query.limit) ?? 10

        const feed = await this.postsRepository.loadFeed(
            userId,
            page,
            limit
        )

        res.status(200).json({
            feed
        })
    }
}