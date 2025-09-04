import express, { NextFunction } from 'express'
import User from '../models/user.model'
import { handleError } from '../utils'

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

export const getUserById = async (request: express.Request, response: express.Response, next: NextFunction) => {
    const userId = request.params.id

    try {
        const user = await User.findById(userId)

        if (!user) {
            handleError('No such user was found', 404)
            return
        }

        response
            .status(200)
            .json({
                success: true,
                user
            })
    } catch (err) {
        next(err)
    }
}