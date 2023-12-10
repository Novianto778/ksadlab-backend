import { type NextFunction, type Request, type Response } from 'express'
import { ZodError } from 'zod'
import { logger } from './winston'

export class AppError extends Error {
  errorCode: number
  statusCode: string
  constructor(errorCode: number, message: string, statusCode: string) {
    super(message)
    this.errorCode = errorCode
    this.statusCode = statusCode
  }
}

export const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.issues.map((issue) => issue.path[0] + ' ' + issue.message).join(', '),
      error: 'Bad Request',
      data: null,
    })
  }

  logger.error(err)
  const message = err.message
  res.status(500).json({
    error: message,
    message: 'Internal Server Error',
    data: null,
  })
}

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Halaman tidak ditemukan',
    message: 'Halaman tidak ditemukan',
    data: null,
  })
}
