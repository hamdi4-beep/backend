import express, { NextFunction } from 'express'
import mongoose from 'mongoose'
import Comment from '../models/comment.model'

const isObjectEmpty = (obj: Object) =>
    Object.keys(obj).length === 0

const handleError = (message: string, statusCode: number) => {
    const error = new Error(message) as Error & { statusCode: number}
    error.statusCode = statusCode
    throw error
}

export const getComments = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const comments = await Comment.find()

        response
            .status(200)
            .json({
                success: true,
                message: 'Retreived all comments',
                data: comments
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
                message: 'Retreived a single comment',
                data: comment
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
                data: newComments[0]
            })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        next(err)
    }
}