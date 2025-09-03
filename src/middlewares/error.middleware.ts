import express, { NextFunction } from 'express'

const errorMiddleware = (error: any, request: express.Request, response: express.Response, next: NextFunction) => {
    console.error('Something went wrong:', error.message)

    response
        .status(error.statusCode || 500)
        .json({
            success: false,
            error: error.message || 'Server Error'
        })
}

export default errorMiddleware