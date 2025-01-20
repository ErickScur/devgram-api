import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post";
import { User } from "./user";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'post_id' })
    postId: number

    @Column({ name: 'user_id' })
    userId: number

    @Column()
    content: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'post_id' })
    post: Post

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'user_id' })
    user: User
}