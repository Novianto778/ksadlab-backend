import { type Request, type Response } from 'express'
import { tryCatch } from '../../utils/tryCatch'
import { getAllUsers, getCurrentUserSession } from './user.services'

export const getUserSession = tryCatch(async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'User not found',
      data: null,
    })
  }
  const result = await getCurrentUserSession(req)

  return res.status(200).json({
    error: null,
    message: 'Get user session success',
    data: result,
  })
})

export const getUsers = tryCatch(async (req: Request, res: Response) => {
  const { page, limit, sort, order } = req.query
  const result = await getAllUsers({
    page: Number(page) || undefined,
    limit: Number(limit) || undefined,
    sort: String(sort) || undefined,
    order: (order as 'asc' | 'desc') || undefined,
  })

  return res.status(200).json({
    error: null,
    message: 'Get all users success',
    ...result,
  })
})
