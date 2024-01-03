import * as z from 'zod'
import * as imports from '../null'
import { CompletePost, RelatedPostModel, CompleteUser, RelatedUserModel } from './index'

export const CommentModel = z.object({
  comment_id: z.string(),
  content: z.string(),
  user_id: z.string(),
  post_id: z.string(),
  parent_id: z.string().nullish(),
  created_at: z.date().nullish(),
})

export interface CompleteComment extends z.infer<typeof CommentModel> {
  comment?: CompleteComment | null
  other_Comment: CompleteComment[]
  post: CompletePost
  user: CompleteUser
}

/**
 * RelatedCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCommentModel: z.ZodSchema<CompleteComment> = z.lazy(() =>
  CommentModel.extend({
    comment: RelatedCommentModel.nullish(),
    other_Comment: RelatedCommentModel.array(),
    post: RelatedPostModel,
    user: RelatedUserModel,
  }),
)
