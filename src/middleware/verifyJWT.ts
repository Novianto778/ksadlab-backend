import 'dotenv/config'
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

type User = {
  role: string
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  const token = authHeader?.split(' ')[1]

  if (token === undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Verifikasi token gagal',
      data: null,
    })
  }
  jwt.verify(token, String(process.env.JWT_SECRET), (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Token tidak valid',
        data: null,
      })
    }
    req.role = user ? (user as User).role : undefined
    next()
  })
}

export default verifyJWT