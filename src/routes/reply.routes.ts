import { Router } from "express";
import { createReply, getReplies, getReplyById } from "../controllers/reply.controller";

const replyRouter = Router()

replyRouter.get('/', getReplies)
replyRouter.get('/:id', getReplyById)
replyRouter.post('/create-reply', createReply)

export default replyRouter