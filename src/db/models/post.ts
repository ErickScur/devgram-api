import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'author_id' })
    authorId: number

    @Column()
    content: string

    @Column()
    image?: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'author_id' })
    author: User
}