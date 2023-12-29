import * as z from 'zod'
import * as imports from '../null'
import {
  CompleteAssignmentModule,
  RelatedAssignmentModuleModel,
  CompleteCourse,
  RelatedCourseModel,
  CompleteCourseProgress,
  RelatedCourseProgressModel,
  CompleteCourseSubmodule,
  RelatedCourseSubmoduleModel,
} from './index'

export const CourseModuleModel = z.object({
  course_module_id: z.string(),
  module_title: z.string(),
  order_level: z.number().int(),
  course_id: z.string(),
})

export interface CompleteCourseModule extends z.infer<typeof CourseModuleModel> {
  assignment_module: CompleteAssignmentModule[]
  course: CompleteCourse
  course_progress: CompleteCourseProgress[]
  course_submodule: CompleteCourseSubmodule[]
}

/**
 * RelatedCourseModuleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseModuleModel: z.ZodSchema<CompleteCourseModule> = z.lazy(() =>
  CourseModuleModel.extend({
    assignment_module: RelatedAssignmentModuleModel.array(),
    course: RelatedCourseModel,
    course_progress: RelatedCourseProgressModel.array(),
    course_submodule: RelatedCourseSubmoduleModel.array(),
  }),
)
