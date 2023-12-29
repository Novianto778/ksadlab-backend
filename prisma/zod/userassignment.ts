import * as z from 'zod'
import * as imports from '../null'
import { CompleteAssignment, RelatedAssignmentModel, CompleteUser, RelatedUserModel } from './index'

export const UserAssignmentModel = z.object({
  user_id: z.string(),
  assignment_id: z.string(),
  completion_status: z.boolean().nullish(),
  submission_date: z.date().nullish(),
  grade: z.number().int().nullish(),
})

export interface CompleteUserAssignment extends z.infer<typeof UserAssignmentModel> {
  assignment: CompleteAssignment
  user: CompleteUser
}

/**
 * RelatedUserAssignmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserAssignmentModel: z.ZodSchema<CompleteUserAssignment> = z.lazy(() =>
  UserAssignmentModel.extend({
    assignment: RelatedAssignmentModel,
    user: RelatedUserModel,
  }),
)
