import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { JwtPayload } from '../interfaces/userInterface'
import { Request, Response, NextFunction } from 'express'

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload
    }
}

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY || 'fallback_secret_key'

export const authenticateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token is required' })
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid' })
        }
        const payload = decoded as JwtPayload
        req.user = payload

        next()
    })
}