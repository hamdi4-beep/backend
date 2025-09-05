import express, { NextFunction } from 'express'
import Reply from '../models/reply.model'

export const getReplies = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const replies = await Reply.find()

        if (!replies) {
            const error = new Error('No reply document exists!') as Error & { statusCode: number }
            error.statusCode = 404
            throw error
        }

        response
            .status(200)
            .json({
                success: true,
                replies
            })
    } catch (err) {
        next(err)
    }
}