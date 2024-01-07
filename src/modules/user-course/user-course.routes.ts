import { Router } from 'express'
import { getAllUserCourses, getUserCourseDetail, putFinishAModule } from './usercourse.handler'

const router = Router()

router.get('/', getAllUserCourses)
router.get('/:courseId', getUserCourseDetail)
router.put('/:courseId/finish', putFinishAModule)

export default router
