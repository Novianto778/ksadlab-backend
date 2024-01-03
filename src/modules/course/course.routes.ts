import { Router } from 'express'
import verifyRoles from '../../middleware/verifyRoles'
import { createNewCourse, getCourseDetail, getCourses, putCourse } from './course.handler'

const router = Router()

router.get('/', getCourses)
router.post('/', verifyRoles('admin'), createNewCourse)
router.get('/:id', getCourseDetail)
router.put('/:id', verifyRoles('admin'), putCourse)

export default router
