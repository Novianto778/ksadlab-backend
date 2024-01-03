import { type Prisma } from '@prisma/client'
import { type Request } from 'express'
import { type PaginateParams } from '../../typings/utils.types'
import prisma from '../../utils/db'
import { parseJWT } from '../../utils/jwt'

export const getCurrentUserSession = async (req: Request) => {
  const cookie = req.cookies
  if (!cookie?.jwt) return null

  const refreshToken = cookie.jwt

  const data = parseJWT(refreshToken)
  return { ...data, password: 'xxxxxx' }
}

export const getAllUsers = async (obj: PaginateParams) => {
  const { page = 1, limit = 10, sort, order } = obj
  const params: Prisma.UserFindManyArgs = {
    skip: (page - 1) * limit,
    take: limit,
  }

  // check if sort and order is not undefined
  // undefined && undefined = undefined should be handled

  if (sort && order) {
    const orderInput = order.toUpperCase() === 'ASC' ? 'asc' : 'desc'
    params.orderBy = {
      [sort]: orderInput,
    }
  }

  const result = await prisma.user.findMany({
    select: {
      _count: true,
      user_id: true,
      email: true,
      nama: true,
      angkatan: true,
      level: true,
      role: true,
      created_at: true,
    },
    ...params,
  })
  return {
    data: result,
    page,
    limit,
    total_page: Math.ceil(result.length / limit),
  }
}
