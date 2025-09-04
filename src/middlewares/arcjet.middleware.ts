import express, { NextFunction } from 'express'
import aj from '../../config/arcjet'

const arcjetMiddleware = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const decision = await aj.protect(request, {
            requested: 1
        })

        if (decision.isDenied()) {
            if (decision.reason.isBot()) {
                return response.status(409).json({
                    success: false,
                    message: 'Bot detection'
                })
            }

            if (decision.reason.isRateLimit()) {
                return response.status(429).json({
                    success: false,
                    message: 'Rate limit exceeded'
                })
            }
        }

        next()

    } catch (error) {
        console.log('Arcjet error:', error)
        next(error)
    }
}

export default arcjetMiddleware