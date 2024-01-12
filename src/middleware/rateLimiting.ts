import { type NextFunction, type Request, type Response } from 'express'
import Redis from 'ioredis'
import moment from 'moment'
import { AppError } from '../utils/errors'
const redisClient = new Redis({ host: 'localhost', port: 6379 })

const RATELIMIT_DURATION_IN_SECONDS = 60
const NUMBER_OF_REQUEST_ALLOWED = 5

const rateLimiting = async (req: Request, res: Response, next: NextFunction) => {
  const userIp = req.ip
  const currentTime = moment().unix()

  console.log(userIp)

  if (!userIp) {
    next()
    return
  }

  const result = await redisClient.hgetall(userIp)
  if (Object.keys(result).length === 0) {
    await redisClient.hset(userIp, {
      createdAt: currentTime,
      count: 1,
    })
    next()
    return
  }
  if (result) {
    const diff = currentTime - Number(result.createdAt)

    if (diff > RATELIMIT_DURATION_IN_SECONDS) {
      await redisClient.hset(userIp, {
        createdAt: currentTime,
        count: 1,
      })
      next()
      return
    }
  }
  if (Number(result.count) >= NUMBER_OF_REQUEST_ALLOWED) {
    const error = new AppError(429, 'Too Many Request', 'rate_limit_exceeded')
    next(error)
  } else {
    await redisClient.hset(userIp, {
      count: parseInt(result.count) + 1,
    })
    next()
  }
}

export default rateLimiting
