import { type Prisma } from '@prisma/client'
import { type z } from 'zod'
import { type LoginSchema } from '../validations/auth.validation'

export type LoginSchemaType = z.infer<typeof LoginSchema>

export type UserType = Prisma.UserCreateInput
