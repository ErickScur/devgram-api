import { Repository } from 'typeorm';
import { Post } from '../../models/post';
import { appDataSource } from '../../config/data-source';
import { CreatePostDTO } from './dtos/create-post-dto';
import { UpdatePostDTO } from './dtos/update-post-dto';
import { PostLike } from '../../models/post-like';

export class PostsRepository {
    private repository: Repository<Post>
    private likesRepository: Repository<PostLike>
    
    constructor() {
        this.repository = appDataSource.getRepository(Post)
        this.likesRepository = appDataSource.getRepository(PostLike)
    }

    async loadAll(): Promise<Post[]> {
        return await this.repository.find()
    }

    async loadById(id: number): Promise<Post | null> {
        return await this.repository.findOne({
            where: {
                id
            },
            relations: ['comments']
        })
    }

    async create(data: CreatePostDTO): Promise<Post> {
        return await this.repository.save(data)
    }

    async update(postId: number, data: UpdatePostDTO): Promise<Post> {
        return await this.repository.save({
            id: postId,
            ...data,
        },)
    }

    async delete(postId: number): Promise<void> {
        await this.repository.delete({ id: postId })
    }

    async createLike(postId: number, userId: number): Promise<void> {
        await this.likesRepository.save({
            postId,
            userId,
        })
    }

    async deleteLike(postId: number, userId: number): Promise<void> {
        await this.likesRepository.delete({
            postId,
            userId,
        })
    }

    async loadPostLike(postId: number, userId: number): Promise<PostLike | null> {
        return await this.likesRepository.findOne({
            where: {
                postId,
                userId,
            }
        })
    }
}