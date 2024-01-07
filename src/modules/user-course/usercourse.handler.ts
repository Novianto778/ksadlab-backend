import { type Request, type Response } from 'express'
import { notFoundCourse } from '../../utils/notFound'
import { tryCatch } from '../../utils/tryCatch'
import { finishASubmodule, getUserCourseById, getUserCourses } from './usercourse.services'

export const getAllUserCourses = tryCatch(async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'User tidak ditemukan',
      data: null,
    })
  }
  const data = await getUserCourses(req.userId)
  return res.status(200).json({
    error: null,
    message: 'Get all user courses success',
    data,
  })
})

export const getUserCourseDetail = tryCatch(async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'User tidak ditemukan',
      data: null,
    })
  }
  const { courseId } = req.params

  const data = await getUserCourseById(req.userId, courseId)
  return res.status(200).json({
    error: null,
    message: 'Get user course detail success',
    data,
  })
})

export const putFinishAModule = tryCatch(async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'User tidak ditemukan',
      data: null,
    })
  }
  const { courseId } = req.params
  await notFoundCourse(String(courseId), res)

  const { course_submodule_id } = req.body

  const data = await finishASubmodule({
    userId: req.userId,
    courseId,
    submoduleId: course_submodule_id,
  })

  return res.status(200).json({
    error: null,
    message: 'Finish a module success',
    data,
  })
})
