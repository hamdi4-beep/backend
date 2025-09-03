import express, { urlencoded } from 'express'
import { PORT } from '../config/env'
import commentRouter from './routes/comment.routes'
import replyRouter from './routes/reply.routes'
import errorMiddleware from './middlewares/error.middleware'
import connect_to_db from './database/mongodb'

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/replies', replyRouter)

app.use(errorMiddleware)

app.get('/', (request, response, next) => {
    response
        .status(200)
        .json({
            success: true,
            message: 'API is up and running on the backend server'
        })
})

app.get('/error', (request, response, next) => {
    const error = new Error('A problem occurred on the backend')

    response
        .status(500)
        .json({
            success: false,
            message: error.message
        })

    next(error)
})

app.listen(PORT, () => {
    console.log('Listening in for requests on port', PORT)
    connect_to_db()
})