import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config()

import {
    Comment,
    Follow,
    Post,
    PostLike,
    User
} from '../models'

export const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
    migrations: ['dist/db/migrations/*.js'],
    entities: [
        Comment,
        Follow,
        Post,
        PostLike,
        User
    ]
})