import { type CourseInputType, type CourseWithModuleSubmodule, type CourseWithTypePayload, type CourseWithTypes } from '../../typings/course.types'
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
