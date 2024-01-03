// pagination function using prisma

import { type PaginateParams } from '../typings/utils.types'

export const paginate = async (model: any, page: number = 1, limit: number = 10) => {
  const data = await model.findMany({
    skip: (page - 1) * limit,
    take: limit,
  })
  const total = await model.count()
  return {
    data,
    page,
    limit,
    total_page: Math.ceil(total / limit),
  }
}

export const validateQueryParams = (obj: PaginateParams) => {
  const { page = 1, limit = 10, sort, order } = obj

  if (page && isNaN(page)) throw new Error('Page must be number')
  if (limit && isNaN(limit)) throw new Error('Limit must be number')
  if (sort && typeof sort !== 'string') throw new Error('Sort must be string')
  if (order && typeof order !== 'string') throw new Error('Order must be string')

  return {
    page: Number(page),
    limit: Number(limit),
    sort: sort ?? undefined,
    order: (order as 'asc' | 'desc') || undefined,
  }
}
