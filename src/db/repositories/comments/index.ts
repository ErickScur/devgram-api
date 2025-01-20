import { Repository } from 'typeorm';
import { Comment } from '../../models/comment';
import { appDataSource } from '../../config/data-source';
import { CreateCommentDTO } from './dtos/create-comment-dto';
import { UpdateCommentDTO } from './dtos/update-comment-dto';

export class CommentsRepository {
    private repository: Repository<Comment>

    constructor() {
        this.repository = appDataSource.getRepository(Comment)
    }

    async create(data: CreateCommentDTO): Promise<Comment> {
        return await this.repository.save(data)
    }

    async loadPostComments(postId: number): Promise<Comment[]> {
        return await this.repository.find({
            where: {
                postId
            }
        })
    }

    async loadCommentById(commentId: number): Promise<Comment | null> {
        return await this.repository.findOne({
            where: {
                id: commentId
            },
            relations: ['post']
        })
    }

    async updateComment(commentId: number, data: UpdateCommentDTO): Promise<Comment> {
        return await this.repository.save({
            id: commentId,
            ...data,
        })
    }

    async delete(commentId: number): Promise<void> {
        await this.repository.delete({
            id: commentId
        })
    }
}