import { Repository } from 'typeorm';
import { User } from '../../models/user';
import { appDataSource } from '../../config/data-source';
import { CreateUserDTO } from './dtos/create-user-dto';

export class UsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = appDataSource.getRepository(User)
    }

    async create(data: CreateUserDTO): Promise<User> {
        return await this.repository.save(data)
    }

    async loadByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({
            where: {
                email,
            }
        })
    }

    async loadById(id: number): Promise<User | null> {
        return await this.repository.findOne({
            where: {
                id,
            }
        })
    }
}