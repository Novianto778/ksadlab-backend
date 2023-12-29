export type Paginate<T> = {
  data: T[]
  page: number
  limit: number
  total_page: number
}

export type PaginateParams = {
  page?: number
  limit?: number
}
