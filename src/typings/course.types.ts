import { type CourseType, type Prisma } from '@prisma/client'

export type Course = Omit<Prisma.CourseCreateInput, 'CourseModule' | 'CourseTypePivot'>
export type CourseInputType = Course & {
  types: number[]
}

export type CourseWithTypes = Prisma.CourseGetPayload<{
  include: {
    course_type: {
      include: {
        type: true
      }
    }
  }
}>

export type CourseWithTypePayload = Course & {
  types: CourseType[]
}

export type CourseWithModuleSubmodule = Prisma.CourseGetPayload<{
  include: {
    course_module: {
      include: {
        course_submodule: true
      }
    }
  }
}>
