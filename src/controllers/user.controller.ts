import express, { NextFunction } from 'express'
import User from '../models/user.model'

export const getUsers = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const users = await User.find()
        
        response
            .status(200)
            .json({
                success: true,
                users
            })
    } catch (err) {
        next(err)
    }
}