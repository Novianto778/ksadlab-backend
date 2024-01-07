import { Router } from 'express'
import verifyRoles from '../../middleware/verifyRoles'
import {
  createNewCourse,
  getCourseDetail,
  getCourses,
  postCourseType,
  postJoinCourse,
  postModuleAndSubmodule,
  putCourse,
  putModuleAndSubmodule,
} from './course.handler'

const router = Router()

router.get('/', getCourses)
router.post('/', verifyRoles('admin'), createNewCourse)
router.post('/type', verifyRoles('admin'), postCourseType)
router.get('/:courseId', getCourseDetail)
router.put('/:courseId', verifyRoles('admin'), putCourse)
router.post('/:courseId/join', verifyRoles('student'), postJoinCourse)
router.post('/:courseId/create', verifyRoles('admin'), postModuleAndSubmodule)
router.put('/:courseId/update', verifyRoles('admin'), putModuleAndSubmodule)

export default router
