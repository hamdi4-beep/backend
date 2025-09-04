import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', () => {})

export default userRouter