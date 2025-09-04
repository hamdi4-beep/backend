import express, { NextFunction } from 'express'
import aj from '../../config/arcjet'

const arcjetMiddleware = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const decision = await aj.protect(request, {
            requested: 1
        })

        switch (decision.isDenied()) {
            case decision.reason.isBot():
                response
                    .status(403)
                    .json({
                        success: false,
                        message: 'Bot detection'
                    })

                break

            case decision.reason.isRateLimit():
                response
                    .status(429)
                    .json({
                        success: false,
                        message: 'Rate limit exceeded'
                    })

                break

            default:
                response
                    .status(403)
                    .json({
                        success: false,
                        message: 'Access denied'
                    })
        }

        next()

    } catch (error) {
        console.log('Arcjet error:', error)
        next(error)
    }
}

export default arcjetMiddleware