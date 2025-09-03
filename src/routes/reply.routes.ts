import { Router } from "express";

const replyRouter = Router()

replyRouter.get('/', (request, response) =>
    response.send({
        success: true,
        message: 'GET all replies'
    })
)

export default replyRouter