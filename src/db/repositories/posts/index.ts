import { Repository } from 'typeorm';
import { Post } from '../../models/post';
import { appDataSource } from '../../config/data-source';
import { CreatePostDTO } from './dtos/create-post-dto';
import { UpdatePostDTO } from './dtos/update-post-dto';

export class PostsRepository {
    private repository: Repository<Post>
    
    constructor() {
        this.repository = appDataSource.getRepository(Post)
    }

    async loadAll(): Promise<Post[]> {
        return await this.repository.find()
    }

    async loadById(id: number): Promise<Post | null> {
        return await this.repository.findOne({
            where: {
                id
            }
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
}