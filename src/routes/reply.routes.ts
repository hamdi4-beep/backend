import { Router } from "express";
import { createReply, getReplies } from "../controllers/reply.controller";

const replyRouter = Router()

replyRouter.get('/', getReplies)
replyRouter.post('/create-reply', createReply)

export default replyRouter