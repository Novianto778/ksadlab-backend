import * as z from "zod"
import * as imports from "../null"
import { CompleteCourse, RelatedCourseModel, CompleteCourseModule, RelatedCourseModuleModel, CompleteCourseSubmodule, RelatedCourseSubmoduleModel, CompleteUser, RelatedUserModel } from "./index"

export const CourseProgressModel = z.object({
  progress_id: z.string(),
  completed_at: z.date().nullish(),
  course_module_id: z.string().nullish(),
  course_submodule_id: z.string().nullish(),
  user_id: z.string(),
  course_id: z.string(),
})

export interface CompleteCourseProgress extends z.infer<typeof CourseProgressModel> {
  course: CompleteCourse
  course_module?: CompleteCourseModule | null
  course_submodule?: CompleteCourseSubmodule | null
  user: CompleteUser
}

/**
 * RelatedCourseProgressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseProgressModel: z.ZodSchema<CompleteCourseProgress> = z.lazy(() => CourseProgressModel.extend({
  course: RelatedCourseModel,
  course_module: RelatedCourseModuleModel.nullish(),
  course_submodule: RelatedCourseSubmoduleModel.nullish(),
  user: RelatedUserModel,
}))
