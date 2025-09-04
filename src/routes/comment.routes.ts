import { Router } from "express";
import { createComment, getCommentById, getComments } from "../controllers/comment.controller";

const commentRouter = Router()

commentRouter.get('/', getComments)
commentRouter.get('/:id', getCommentById)
commentRouter.post('/create-comment', createComment)

export default commentRouter