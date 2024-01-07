import 'dotenv/config'
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

type User = {
  role: string
  user_id: string
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies
  const bearerToken = req.headers.authorization?.split(' ')[1]
  if (!cookies?.jwt && !bearerToken) return res.status(401).json({ message: 'Unauthorized' })

  const token = (cookies.jwt as string) || bearerToken

  if (token === undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Verifikasi token gagal',
      data: null,
    })
  }

  if (bearerToken) {
    jwt.verify(token, String(process.env.JWT_SECRET), (err, user) => {
      if (err) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Token tidak valid',
          data: null,
        })
      }

      req.role = user ? (user as User).role : undefined
      req.userId = user ? (user as User).user_id : undefined
      next()
    })
    return
  }

  jwt.verify(token, String(process.env.JWT_REFRESH_SECRET), (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Token tidak valid',
        data: null,
      })
    }

    req.role = user ? (user as User).role : undefined
    req.userId = user ? (user as User).user_id : undefined
    next()
  })
}

export default verifyJWT
