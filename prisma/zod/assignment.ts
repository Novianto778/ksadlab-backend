import * as z from 'zod'
import * as imports from '../null'
import { CompleteAssignmentModule, RelatedAssignmentModuleModel, CompleteUserAssignment, RelatedUserAssignmentModel } from './index'

export const AssignmentModel = z.object({
  assignment_id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  start_date: z.date(),
  due_date: z.date(),
  assignment_task_url: z.string(),
})

export interface CompleteAssignment extends z.infer<typeof AssignmentModel> {
  assignment_module: CompleteAssignmentModule[]
  user_assignment: CompleteUserAssignment[]
}

/**
 * RelatedAssignmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAssignmentModel: z.ZodSchema<CompleteAssignment> = z.lazy(() =>
  AssignmentModel.extend({
    assignment_module: RelatedAssignmentModuleModel.array(),
    user_assignment: RelatedUserAssignmentModel.array(),
  }),
)
