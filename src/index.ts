import express from 'express'
import dotenv from 'dotenv'
import { appDataSource } from './db/config/data-source'
import { userRouter, authRouter, postRouter } from './http/routes'


dotenv.config()

const app = express()
app.use(express.json())

app.use(userRouter)
app.use(authRouter)
app.use(postRouter)

app.get('/', (request, response) => {
    response.json({
        status: 'Application is Running'
    })
})

const PORT = process.env.PORT

appDataSource.initialize()
    .then(() => {
        console.log('Connected to the DB')

        app.listen(PORT, () => {
            console.log('Application started')
        })
    })
    .catch((error) => console.error(`Error connecting to the DB:`, error))