import * as z from 'zod'
import * as imports from '../null'
import {
  CompleteCourseProgress,
  RelatedCourseProgressModel,
  CompleteCourseModule,
  RelatedCourseModuleModel,
  CompleteUserNote,
  RelatedUserNoteModel,
} from './index'

export const CourseSubmoduleModel = z.object({
  course_submodule_id: z.string(),
  submodule_title: z.string(),
  submodule_type: z.string(),
  module_url: z.string(),
  order_level: z.number().int(),
  course_module_id: z.string(),
})

export interface CompleteCourseSubmodule extends z.infer<typeof CourseSubmoduleModel> {
  course_progress: CompleteCourseProgress[]
  course_module: CompleteCourseModule
  user_note: CompleteUserNote[]
}

/**
 * RelatedCourseSubmoduleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseSubmoduleModel: z.ZodSchema<CompleteCourseSubmodule> = z.lazy(() =>
  CourseSubmoduleModel.extend({
    course_progress: RelatedCourseProgressModel.array(),
    course_module: RelatedCourseModuleModel,
    user_note: RelatedUserNoteModel.array(),
  }),
)
