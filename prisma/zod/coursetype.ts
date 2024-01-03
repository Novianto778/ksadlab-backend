import * as z from "zod"
import * as imports from "../null"
import { CompleteCourseTypePivot, RelatedCourseTypePivotModel } from "./index"

export const CourseTypeModel = z.object({
  course_type_id: z.number().int(),
  name: z.string(),
})

export interface CompleteCourseType extends z.infer<typeof CourseTypeModel> {
  course_type: CompleteCourseTypePivot[]
}

/**
 * RelatedCourseTypeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseTypeModel: z.ZodSchema<CompleteCourseType> = z.lazy(() => CourseTypeModel.extend({
  course_type: RelatedCourseTypePivotModel.array(),
}))
