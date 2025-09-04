import express, { urlencoded } from 'express'
import { NODE_ENV, PORT } from '../config/env'
import commentRouter from './routes/comment.routes'
import replyRouter from './routes/reply.routes'
import errorMiddleware from './middlewares/error.middleware'
import connect_to_db from './database/mongodb'
import arcjetMiddleware from './middlewares/arcjet.middleware'

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use(arcjetMiddleware)

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

app.listen(PORT, () => {
    console.log(`Listening for requests on port: ${PORT}, in ${NODE_ENV} environment`)
    connect_to_db()
})