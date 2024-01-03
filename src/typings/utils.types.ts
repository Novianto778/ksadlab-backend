export type Paginate<T> = {
  data: T[]
  page: number
  limit: number
  total_page: number
}

export type PaginateParams = {
  page?: number
  limit?: number
  sort?: string
  order?: Order
}

export type Order = 'asc' | 'desc'
