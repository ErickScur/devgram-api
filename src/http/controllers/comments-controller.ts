import { CommentsRepository } from '../../db/repositories/comments';
import { Request, Response } from 'express';
import { PostsRepository } from '../../db/repositories/posts';
import { createCommentValidator } from '../validators/create-comment-validator';
import { ZodError } from 'zod';
import { updateCommentValidator } from '../validators/update-comment-validator';

export class CommentsController {
  private commentsRepository: CommentsRepository;
  private postsRepository: PostsRepository;

  constructor() {
    this.commentsRepository = new CommentsRepository();
    this.postsRepository = new PostsRepository();
  }

  async createComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        message: 'Post id is required',
      });
      return;
    }

    const post = await this.postsRepository.loadById(Number(id));
    if (!post) {
      res.status(404).json({
        message: 'Post not found',
      });
      return;
    }

    const userId = Number(req.user?.id);

    try {
      const data = createCommentValidator.parse(req.body);

      const comment = await this.commentsRepository.create({
        content: data.content,
        postId: post.id,
        userId,
      });

      res.status(201).json({
        comment,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.errors,
        });
      } else {
        res.status(500).json({
          error,
        });
      }
    }
  }

  async loadPostComments(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        message: 'Post id is required',
      });
      return;
    }

    const post = await this.postsRepository.loadById(Number(id));
    if (!post) {
      res.status(404).json({
        message: 'Post not found',
      });
      return;
    }

    res.status(200).json({
      comments: post.comments,
    });
  }

  async updateComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        message: 'Post id is required',
      });
      return;
    }

    const comment = await this.commentsRepository.loadCommentById(Number(id));
    if (!comment) {
      res.status(404).json({
        message: 'Comment not found',
      });
      return;
    }

    const userId = Number(req.user?.id);

    if (userId !== comment.userId) {
      res.status(403).json({
        message: 'Only comment author can update',
      });
      return;
    }

    try {
      const data = updateCommentValidator.parse(req.body);

      await this.commentsRepository.updateComment(comment.id, data)

      res.status(200).json({
        message: 'Comment was updated'
      })
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.errors,
        });
      } else {
        res.status(500).json({
          error,
        });
      }
    }
  }

  async deleteComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        message: 'Post id is required',
      });
      return;
    }

    const comment = await this.commentsRepository.loadCommentById(Number(id));
    if (!comment) {
      res.status(404).json({
        message: 'Comment not found',
      });
      return;
    }

    const userId = Number(req.user?.id);

    if (userId !== comment.userId || userId !== comment.post.authorId) {
      res.status(403).json({
        message: 'Only comment or post author can delete the comment',
      });
      return;
    }

    await this.commentsRepository.delete(comment.id)
    res.status(200).json({
        message: 'Comment was deleted'
    })
  }
}
