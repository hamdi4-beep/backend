import { Router } from "express";
import { getReplies } from "../controllers/reply.controller";

const replyRouter = Router()

replyRouter.get('/', getReplies)

export default replyRouter