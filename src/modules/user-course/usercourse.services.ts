import { type FinishModuleArgs } from '../../typings/usercourse.types'
import prisma from '../../utils/db'

export const getUserCourses = async (userId: string) => {
  const userCourses = await prisma.course.findMany({
    include: {
      _count: true,
      course_progress: {
        where: {
          user_id: userId,
        },

        // include: {
        //   course_submodule: {
        //     select: {
        //       _count: true,
        //     },
        //   },
        // },
      },
    },
  })

  if (!userCourses) {
    return null
  }

  return userCourses
}

export const getUserCourseById = async (userId: string, courseId: string) => {
  const userCourse = await prisma.course.findUnique({
    where: {
      course_id: courseId,
    },
    include: {
      course_progress: {
        where: {
          user_id: userId,
        },
      },
    },
  })

  if (!userCourse) {
    return null
  }

  return userCourse
}

export const finishASubmodule = async ({ userId, courseId, submoduleId }: FinishModuleArgs) => {
  // if user has a progress, but not the have submodule, update it
  const userHasProgress = await prisma.courseProgress.findFirst({
    where: {
      AND: [
        {
          user_id: userId,
        },
        {
          course_id: courseId,
        },
        {
          course_submodule_id: null,
        },
      ],
    },
  })

  if (userHasProgress) {
    const newUserCourse = await prisma.courseProgress.update({
      data: {
        course_submodule_id: submoduleId,
        completed_at: new Date(),
      },
      where: {
        progress_id: userHasProgress.progress_id,
      },
    })

    return newUserCourse
  }

  // check if user has a progress
  const userCourse = await prisma.courseProgress.findFirst({
    where: {
      AND: [
        {
          user_id: userId,
        },
        {
          course_id: courseId,
        },
        {
          course_submodule_id: submoduleId,
        },
      ],
    },
  })

  // if user hasn't a progress, create a new one
  if (!userCourse) {
    const newUserCourse = await prisma.courseProgress.create({
      data: {
        user_id: userId,
        course_id: courseId,
        course_submodule_id: submoduleId,
        completed_at: new Date(),
      },
    })

    return newUserCourse
  } else {
    // if user has a progress, update it
    const newUserCourse = await prisma.courseProgress.update({
      data: {
        completed_at: new Date(),
        course_submodule_id: null,
      },
      where: {
        progress_id: userCourse.progress_id,
      },
    })

    return newUserCourse
  }
}
