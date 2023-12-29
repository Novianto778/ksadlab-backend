import { type Request, type Response } from 'express'
import { type CourseInputType } from '../../typings/course.types'
import { tryCatch } from '../../utils/tryCatch'
import { createCourse, getAllCourse, getCourseById, updateCourse } from './course.services'

import { courseValidation } from '../../validations/course.validation'

export const createNewCourse = tryCatch(async (req: Request, res: Response) => {
  const payload = req.body as CourseInputType

  const result = courseValidation.parse(payload)

  const data = await createCourse(result)
  return res.status(201).json({
    error: null,
    message: 'Create course success',
    data,
  })
})

export const getCourses = tryCatch(async (req: Request, res: Response) => {
  const { page, limit } = req.query
  const data = await getAllCourse({
    page: Number(page) || undefined,
    limit: Number(limit) || undefined,
  })
  return res.status(200).json({
    error: null,
    message: 'Get all course success',
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
