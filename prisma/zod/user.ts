import * as z from 'zod'
import * as imports from '../null'
import {
  CompleteComment,
  RelatedCommentModel,
  CompleteCourseProgress,
  RelatedCourseProgressModel,
  CompletePost,
  RelatedPostModel,
  CompleteUserAssignment,
  RelatedUserAssignmentModel,
  CompleteUserNote,
  RelatedUserNoteModel,
} from './index'

export const UserModel = z.object({
  user_id: z.string(),
  email: z.string(),
  nama: z.string(),
  password: z.string(),
  role: z.string(),
  level: z.number().int(),
  angkatan: z.number().int(),
  created_at: z.date().nullish(),
  updated_at: z.date().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  comment: CompleteComment[]
  course_progress: CompleteCourseProgress[]
  post: CompletePost[]
  user_assignment: CompleteUserAssignment[]
  user_note: CompleteUserNote[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    comment: RelatedCommentModel.array(),
    course_progress: RelatedCourseProgressModel.array(),
    post: RelatedPostModel.array(),
    user_assignment: RelatedUserAssignmentModel.array(),
    user_note: RelatedUserNoteModel.array(),
  }),
)
