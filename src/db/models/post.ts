import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { PostLike } from "./post-like";
import { Comment } from './comment'

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

    @Column()
    likes: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'author_id' })
    author: User

    @OneToMany(() => PostLike, (postLike) => postLike.post)
    postLikes: PostLike[]

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]
}