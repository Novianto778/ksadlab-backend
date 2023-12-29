import { type LoginSchemaType, type UserType } from '../../typings/auth.types'
import prisma from '../../utils/db'

export const createUser = async (payload: UserType): Promise<UserType> => {
  const data = await prisma.user.create({
    data: {
      ...payload,
    },
  })
  return data
}

export const userLogin = async (payload: LoginSchemaType): Promise<UserType | null> => {
  const data = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  })
  return data
}
