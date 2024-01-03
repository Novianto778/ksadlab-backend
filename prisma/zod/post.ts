import * as z from "zod"
import * as imports from "../null"
import { CompleteComment, RelatedCommentModel, CompleteUser, RelatedUserModel } from "./index"

export const PostModel = z.object({
  post_id: z.string(),
  title: z.string(),
  content: z.string(),
  cover: z.string().nullish(),
  created_at: z.date().nullish(),
  user_id: z.string(),
})

export interface CompletePost extends z.infer<typeof PostModel> {
  comment: CompleteComment[]
  user: CompleteUser
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() => PostModel.extend({
  comment: RelatedCommentModel.array(),
  user: RelatedUserModel,
}))
