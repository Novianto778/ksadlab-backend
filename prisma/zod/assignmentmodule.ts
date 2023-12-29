import * as z from 'zod'
import * as imports from '../null'
import { CompleteAssignment, RelatedAssignmentModel, CompleteCourseModule, RelatedCourseModuleModel } from './index'

export const AssignmentModuleModel = z.object({
  assignment_id: z.string(),
  course_module_id: z.string(),
})

export interface CompleteAssignmentModule extends z.infer<typeof AssignmentModuleModel> {
  assignment: CompleteAssignment
  course_module: CompleteCourseModule
}

/**
 * RelatedAssignmentModuleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAssignmentModuleModel: z.ZodSchema<CompleteAssignmentModule> = z.lazy(() =>
  AssignmentModuleModel.extend({
    assignment: RelatedAssignmentModel,
    course_module: RelatedCourseModuleModel,
  }),
)
