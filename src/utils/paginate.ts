// pagination function using prisma

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
