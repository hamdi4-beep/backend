import express, { NextFunction } from 'express'
import Reply from '../models/reply.model'
import mongoose from 'mongoose'

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

export const getReplyById = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const reply = await Reply.findById(request.params.id)

        if (!reply) {
            const error = new Error('Unable to find a reply with that id') as Error & {statusCode: number}
            error.statusCode = 404
            throw error
        }

        response
            .status(200)
            .json({
                success: true,
                reply
            })
    } catch (err) {
        next(err)
    }
}

export const createReply = async (request: express.Request, response: express.Response, next: NextFunction) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const newReplies = await Reply.create([{
            ...request.body
        }], {session})

        response
            .status(201)
            .json({
                success: true,
                reply: newReplies[0]
            })

        await session.commitTransaction()
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        next(err)
    }
}