import * as z from "zod"
import * as imports from "../null"
import { CompleteCourseSubmodule, RelatedCourseSubmoduleModel, CompleteUser, RelatedUserModel } from "./index"

export const UserNoteModel = z.object({
  user_id: z.string(),
  course_submodule_id: z.string(),
  content: z.string(),
  created_at: z.date().nullish(),
})

export interface CompleteUserNote extends z.infer<typeof UserNoteModel> {
  course_submodule: CompleteCourseSubmodule
  user: CompleteUser
}

/**
 * RelatedUserNoteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserNoteModel: z.ZodSchema<CompleteUserNote> = z.lazy(() => UserNoteModel.extend({
  course_submodule: RelatedCourseSubmoduleModel,
  user: RelatedUserModel,
}))
