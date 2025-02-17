import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Post } from './post'
import { PostLike } from './post-like'
import { Comment } from './comment'
import { Follow } from './follow'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column({ unique: true, name: 'email' })
    email: string

    @Column({ name: 'password' })
    password: string

    @Column({ name: 'name' })
    name: string

    @Column({ nullable: true, name: 'profile_picture' })
    profilePicture?: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updateAt: Date

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[]

    @OneToMany(() => PostLike, (postLike) => postLike.post)
    likes: PostLike[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]

    @OneToMany(() => Follow, (follow) => follow.following)
    followers: Follow[]

    @OneToMany(() => Follow, (follow) => follow.follower)
    following: Follow[]
}