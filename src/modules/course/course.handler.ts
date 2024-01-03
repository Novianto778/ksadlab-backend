import { type Request, type Response } from 'express'
import { type CourseInputType } from '../../typings/course.types'
import { tryCatch } from '../../utils/tryCatch'
import { createCourse, getAllCourse, getCourseById, updateCourse } from './course.services'

import { validateQueryParams } from '../../utils/paginate'
import { courseValidation } from '../../validations/course.validation'

export const createNewCourse = tryCatch(async (req: Request, res: Response) => {
  const payload = req.body as CourseInputType

  const result = courseValidation.parse(payload)

  const data = await createCourse(result)
  return res.status(201).json({
    error: null,
    message: 'Create new course success',
    data,
  })
})

export const getCourses = tryCatch(async (req: Request, res: Response) => {
  const params = validateQueryParams(req.query)

  const data = await getAllCourse(params)
  return res.status(200).json({
    error: null,
    message: 'Get all courses success',
    data,
  })
})

export const getCourseDetail = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await getCourseById(id)
  return res.status(200).json({
    error: null,
    message: 'Get course detail success',
    data,
  })
})

export const putCourse = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const payload = req.body as CourseInputType

  const result = courseValidation.parse(payload)

  const data = await updateCourse(id, result)
  return res.status(200).json({
    error: null,
    message: 'Update course success',
    data,
  })
})
