import { type Request, type Response } from 'express'
import {
  type CourseInputType,
  type CreateCourseModuleAndSubmodulePayload,
  type UpdateCourseModuleAndSubmodulePayload,
} from '../../typings/course.types'
import { tryCatch } from '../../utils/tryCatch'
import {
  createCourse,
  createCourseModuleAndSubmodule,
  createCourseType,
  getAllCourse,
  getCourseById,
  hasJoin,
  updateCourse,
  updateCourseModuleAndSubmodule,
} from './course.services'

import { notFoundCourse } from '../../utils/notFound'
import { validateQueryParams } from '../../utils/paginate'
import { courseValidation } from '../../validations/course.validation'
import { getUserCourseById } from '../user-course/usercourse.services'

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
  const { courseId } = req.params

  await notFoundCourse(String(courseId), res)

  const data = await getCourseById(courseId)
  return res.status(200).json({
    error: null,
    message: 'Get course detail success',
    data,
  })
})

export const putCourse = tryCatch(async (req: Request, res: Response) => {
  const { courseId } = req.params
  const payload = req.body as CourseInputType

  const result = courseValidation.parse(payload)

  await notFoundCourse(String(courseId), res)

  const data = await updateCourse(courseId, result)
  return res.status(200).json({
    error: null,
    message: 'Update course success',
    data,
  })
})

export const postCourseType = tryCatch(async (req: Request, res: Response) => {
  const { type } = req.body

  const data = await createCourseType(type)
  return res.status(200).json({
    error: null,
    message: 'Create course type success',
    data,
  })
})

export const postJoinCourse = tryCatch(async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'User tidak ditemukan',
      data: null,
    })
  }
  const { courseId } = req.params

  await notFoundCourse(String(courseId), res)

  const isUserHasJoin = await hasJoin(req.userId, courseId)

  if (isUserHasJoin) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'User sudah join course',
      data: null,
    })
  }

  const data = await getUserCourseById(req.userId, courseId)
  return res.status(200).json({
    error: null,
    message: 'Join course success',
    data,
  })
})

export const postModuleAndSubmodule = tryCatch(async (req: Request, res: Response) => {
  const { courseId } = req.params
  const payload = req.body as CreateCourseModuleAndSubmodulePayload

  await notFoundCourse(String(courseId), res)

  const coursePayload = payload.map((item) => {
    return {
      ...item,
      course_id: courseId,
    }
  })

  const data = await createCourseModuleAndSubmodule(courseId, coursePayload)
  return res.status(200).json({
    error: null,
    message: 'Create course module and submodule success',
    data,
  })
})

export const putModuleAndSubmodule = tryCatch(async (req: Request, res: Response) => {
  const { courseId } = req.params
  const payload = req.body as UpdateCourseModuleAndSubmodulePayload

  await notFoundCourse(String(courseId), res)

  if (!payload || payload.length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Payload tidak boleh kosong',
      data: null,
    })
  }

  const coursePayload = payload.map((item) => {
    return {
      ...item,
      course_id: courseId,
    }
  })

  const data = await updateCourseModuleAndSubmodule(courseId, coursePayload)
  return res.status(200).json({
    error: null,
    message: 'Create course module and submodule success',
    data,
  })
})
