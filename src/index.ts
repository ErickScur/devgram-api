import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from './http/routes/user-routes'
import { appDataSource } from './db/config/data-source'

dotenv.config()

const app = express()
app.use(express.json())

app.use(userRouter)

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