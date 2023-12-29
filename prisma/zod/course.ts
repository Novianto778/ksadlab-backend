import * as z from 'zod'
import * as imports from '../null'
import { CompleteCourseModule, RelatedCourseModuleModel, CompleteCourseTypePivot, RelatedCourseTypePivotModel } from './index'

export const CourseModel = z.object({
  course_id: z.string(),
  title: z.string(),
  description: z.string(),
  level: z.number().int(),
  cover: z.string().nullish(),
})

export interface CompleteCourse extends z.infer<typeof CourseModel> {
  course_module: CompleteCourseModule[]
  course_type: CompleteCourseTypePivot[]
}

/**
 * RelatedCourseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseModel: z.ZodSchema<CompleteCourse> = z.lazy(() =>
  CourseModel.extend({
    course_module: RelatedCourseModuleModel.array(),
    course_type: RelatedCourseTypePivotModel.array(),
  }),
)
