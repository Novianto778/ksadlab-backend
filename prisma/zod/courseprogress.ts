import * as z from "zod"
import * as imports from "../null"
import { CompleteCourseModule, RelatedCourseModuleModel, CompleteCourseSubmodule, RelatedCourseSubmoduleModel, CompleteUser, RelatedUserModel } from "./index"

export const CourseProgressModel = z.object({
  progress_id: z.string(),
  completed_at: z.date().nullish(),
  course_module_id: z.string(),
  course_submodule_id: z.string(),
  user_id: z.string(),
})

export interface CompleteCourseProgress extends z.infer<typeof CourseProgressModel> {
  course_module: CompleteCourseModule
  course_submodule: CompleteCourseSubmodule
  user: CompleteUser
}

/**
 * RelatedCourseProgressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseProgressModel: z.ZodSchema<CompleteCourseProgress> = z.lazy(() => CourseProgressModel.extend({
  course_module: RelatedCourseModuleModel,
  course_submodule: RelatedCourseSubmoduleModel,
  user: RelatedUserModel,
}))
