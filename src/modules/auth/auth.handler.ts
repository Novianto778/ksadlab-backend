import { type Request, type Response } from 'express'
import { COOKIE_EXPIRED } from '../../config/cookies'
import { type UserType } from '../../typings/auth.types'
import { compare, encript } from '../../utils/bcrypt'
import { isProduction } from '../../utils/isProduction'
import { generateAccessToken, generateRefreshToken, parseJWT, verifyRefreshToken } from '../../utils/jwt'
import { tryCatch } from '../../utils/tryCatch'
import { LoginSchema } from '../../validations/auth.validation'
import { createUser, userLogin } from './auth.services'

export const register = tryCatch(async (req: Request, res: Response) => {
  // const result = RegisterSchema.parse(req.body)
  const result = req.body as UserType

  const { email, password, angkatan, level, nama, role } = result
  // encript password
  const hashedPassword = encript(password)
  // create user
  const user = await createUser({
    email,
    password: hashedPassword,
    angkatan,
    level,
    nama,
    role,
  })
  // return response
  return res.status(201).json({
    error: null,
    message: 'User created successfully',
    data: user,
  })
})

export const login = tryCatch(async (req: Request, res: Response) => {
  const result = LoginSchema.parse(req.body)

  const { password } = result
  const user = await userLogin(result)
  if (user === null) {
    return res.status(404).json({
      error: 'User tidak ditemukan',
      message: 'Login gagal',
      data: null,
    })
  }
  if (!compare(password, user.password)) {
    return res.status(400).json({
      error: 'Password salah',
      message: 'Login gagal',
      data: null,
    })
  }

  user.password = 'xxxxxx'
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    maxAge: COOKIE_EXPIRED,
  })
  return res.status(200).json({
    error: null,
    message: 'Login sukses',
    data: user,
    accessToken,
    refreshToken,
  })
})

export const refreshToken = tryCatch(async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt
  const verify = verifyRefreshToken(refreshToken)
  if (verify === null) {
    return res.status(401).json({
      error: 'Token tidak valid',
      message: 'Refresh token gagal',
      data: null,
    })
  }
  const data = parseJWT(refreshToken)
  const user = await userLogin(data)
  if (user === null) {
    return res.status(404).json({
      error: 'Token tidak valid',
      message: 'Refresh token gagal',
      data: null,
    })
  }
  user.password = 'xxxxxx'
  const newAccessToken = generateAccessToken(user)
  const newRefreshToken = generateRefreshToken(user)

  res.cookie('jwt', newRefreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    maxAge: COOKIE_EXPIRED,
  })

  return res.status(200).json({
    error: null,
    message: 'Refresh token berhasil',
    data: user,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  })
})

export const logout = tryCatch(async (req: Request, res: Response) => {
  res.clearCookie('jwt')
  return res.status(200).json({
    error: null,
    message: 'Logout sukses',
    data: null,
  })
})
