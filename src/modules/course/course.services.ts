import { type CourseType } from '@prisma/client'
import {
  type CourseInputType,
  type CourseWithModuleSubmodule,
  type CourseWithTypePayload,
  type CourseWithTypes,
  type CreateCourseModuleAndSubmodulePayload,
  type UpdateCourseModuleAndSubmodulePayload,
} from '../../typings/course.types'
import { type Paginate, type PaginateParams } from '../../typings/utils.types'
import prisma from '../../utils/db'
import { AppError } from '../../utils/errors'

export const createCourse = async (payload: CourseInputType): Promise<CourseWithTypePayload> => {
  // using transaction to make sure all queries are executed
  const { types, ...rest } = payload

  const typesName = await prisma.courseType.findMany({
    where: {
      course_type_id: {
        in: types,
      },
    },
  })

  if (!typesName.length) {
    throw new AppError(400, 'Course type not found', 'course_type_not_found')
  }

  const data = await prisma.course.create({
    data: {
      ...rest,
      course_type: {
        createMany: {
          data: types.map((type) => ({
            course_type_id: type,
          })),
        },
      },
    },
  })

  return {
    ...data,
    types: typesName,
  }
}

export const getAllCourse = async (obj?: PaginateParams): Promise<Paginate<CourseWithTypes>> => {
  // get all course with the types
  const { page = 1, limit = 10, sort = 'created_at', order = 'desc' } = obj ?? {}

  const data = await prisma.course.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      course_type: {
        include: {
          type: true,
        },
      },
    },
    // check if sort and order is not undefined
    orderBy: sort && order ? { [sort]: order } : undefined,
  })

  const total = await prisma.course.count()

  return {
    data,
    page,
    limit,
    total_page: Math.ceil(total / limit),
  }
}

export const getCourseById = async (id: string): Promise<CourseWithModuleSubmodule | null> => {
  const data = await prisma.course.findUnique({
    include: {
      course_type: {
        include: {
          type: true,
        },
      },
      course_module: {
        include: {
          course_submodule: true,
        },
      },
    },
    where: {
      course_id: id,
    },
  })
  return data
}

export const updateCourse = async (id: string, payload: CourseInputType): Promise<CourseWithTypePayload> => {
  const { types, ...rest } = payload

  const typesName = await prisma.courseType.findMany({
    where: {
      course_type_id: {
        in: types,
      },
    },
  })

  if (!typesName.length) {
    throw new AppError(400, 'Course type not found', 'course_type_not_found')
  }

  const data = await prisma.course.update({
    where: {
      course_id: id,
    },
    data: {
      ...rest,
      course_type: {
        deleteMany: {},
        createMany: {
          data: types.map((type) => ({
            course_type_id: type,
          })),
        },
      },
    },
  })

  return {
    ...data,
    types: typesName,
  }
}

export const createCourseType = async (name: string): Promise<CourseType> => {
  const data = await prisma.courseType.create({
    data: {
      name,
    },
  })

  return data
}

export const hasJoin = async (userId: string, courseId: string) => {
  const userCourse = await prisma.courseProgress.findFirst({
    where: {
      AND: [
        {
          user_id: userId,
        },
        {
          course_id: courseId,
        },
      ],
    },
  })

  if (!userCourse) {
    return false
  }

  return true
}

export const joinCourse = async (userId: string, courseId: string) => {
  const userCourse = await prisma.courseProgress.create({
    data: {
      user_id: userId,
      course_id: courseId,
    },
  })

  if (!userCourse) {
    return null
  }

  return userCourse
}

export const isCourseExist = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: {
      course_id: courseId,
    },
  })

  if (!course) {
    return false
  }

  return true
}

export const createCourseModuleAndSubmodule = async (courseId: string, payload: CreateCourseModuleAndSubmodulePayload) => {
  await prisma.$transaction(async (prisma) => {
    for (const moduleData of payload) {
      const { course_submodule, ...courseModuleData } = moduleData

      const createdModule = await prisma.courseModule.create({
        data: courseModuleData,
      })

      if (course_submodule && course_submodule.length > 0) {
        await prisma.courseSubmodule.createMany({
          data: course_submodule.map((submodule) => ({
            ...submodule,
            course_module_id: createdModule.course_module_id,
          })),
        })
      }
    }
  })

  const result = await prisma.course.findUnique({
    where: {
      course_id: courseId,
    },
    include: {
      course_module: {
        include: {
          course_submodule: true,
        },
      },
    },
  })

  return result
}

export const updateCourseModuleAndSubmodule = async (courseId: string, payload: UpdateCourseModuleAndSubmodulePayload) => {
  await prisma.$transaction(async (prisma) => {
    for (const moduleData of payload) {
      const { course_submodule, ...courseModuleData } = moduleData

      await prisma.courseModule.update({
        where: {
          course_module_id: courseModuleData.course_module_id as string,
        },
        data: courseModuleData,
      })

      if (course_submodule && course_submodule.length > 0) {
        await Promise.all(
          course_submodule.map(
            async (submodule) =>
              await prisma.courseSubmodule.update({
                where: {
                  course_submodule_id: submodule.course_submodule_id as string,
                },
                data: {
                  submodule_title: submodule.submodule_title,
                  order_level: submodule.order_level,
                  submodule_url: submodule.submodule_url,
                  submodule_type: submodule.submodule_type,
                },
              }),
          ),
        )
      }
    }
  })

  const result = await prisma.course.findUnique({
    where: {
      course_id: courseId,
    },
    include: {
      course_module: {
        include: {
          course_submodule: true,
        },
      },
    },
  })

  return result
}
