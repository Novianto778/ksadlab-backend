import { z } from 'zod'

export const courseValidation = z.object({
  title: z.string(),
  description: z.string(),
  level: z.number().int(),
  cover: z.string().nullish(),
  types: z.array(z.number()),
})
