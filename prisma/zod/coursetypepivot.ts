import * as z from 'zod'
import * as imports from '../null'
import { CompleteCourse, RelatedCourseModel, CompleteCourseType, RelatedCourseTypeModel } from './index'

export const CourseTypePivotModel = z.object({
  course_type_id: z.number().int(),
  course_id: z.string(),
})

export interface CompleteCourseTypePivot extends z.infer<typeof CourseTypePivotModel> {
  course: CompleteCourse
  type: CompleteCourseType
}

/**
 * RelatedCourseTypePivotModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseTypePivotModel: z.ZodSchema<CompleteCourseTypePivot> = z.lazy(() =>
  CourseTypePivotModel.extend({
    course: RelatedCourseModel,
    type: RelatedCourseTypeModel,
  }),
)
