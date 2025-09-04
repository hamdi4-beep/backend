import express, { NextFunction } from 'express'
import mongoose from 'mongoose'
import Comment from '../models/comment.model'
import { handleError, isObjectEmpty } from '../utils'

export const getComments = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const comments = await Comment.find()

        response
            .status(200)
            .json({
                success: true,
                comments
            })
    } catch (err) {
        next(err)
    }
}

export const getCommentById = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const comment = await Comment.findById(request.params.id)

        if (!comment)
            handleError('No such comment exists', 404)

        response
            .status(200)
            .json({
                success: true,
                comment
            })
    } catch (err) {
        next(err)
    }
}

export const createComment = async (request: express.Request, response: express.Response, next: NextFunction) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {comment} = request.body
        
        if (isObjectEmpty(comment))
            handleError('The comment object cannot be empty', 400)

        const newComments = await Comment.create([comment], {session})

        await session.commitTransaction()

        response
            .status(201)
            .json({
                success: true,
                message: 'Comment created successfully!',
                comment: newComments[0]
            })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        next(err)
    }
}