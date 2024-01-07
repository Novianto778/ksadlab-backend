import { type Response } from 'express'
import { isCourseExist } from '../modules/course/course.services'

export const notFoundCourse = async (courseId: string, res: Response) => {
  const isCourseValid = await isCourseExist(courseId)

  if (!isCourseValid) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Course tidak ditemukan',
      data: null,
    })
  }
}
