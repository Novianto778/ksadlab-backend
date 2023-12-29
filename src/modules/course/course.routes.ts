import { Router } from 'express'
import { createNewCourse, getCourseDetail, getCourses, putCourse } from './course.handler'

const router = Router()

router.get('/', getCourses)
router.post('/', createNewCourse)
router.get('/:id', getCourseDetail)
router.put('/:id', putCourse)

export default router
