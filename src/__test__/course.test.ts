import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/db'
let token = ''
let courseId = ''
let userId = ''
let userId2 = ''
let token2 = ''
describe('course - admin role', () => {
  beforeAll(async () => {
    await supertest(web).post('/api/auth/register').send({
      email: 'admin7778@gmail.com',
      nama: 'Admin',
      angkatan: 2020,
      level: 1,
      password: '12345678',
      role: 'admin',
    })
    const res = await supertest(web).post('/api/auth/login').send({
      email: 'admin7778@gmail.com',
      password: '12345678',
    })

    token = res.body.accessToken
    userId = res.body.data.user_id
  })
  it('get all courses', async () => {
    const response = await supertest(web).get('/api/courses').set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Get all courses success')
  })

  it('create new course', async () => {
    const response = await supertest(web)
      .post('/api/courses')
      .send({
        title: 'Test Course 2',
        description: 'Belajar pemrograman',
        level: 1,
        types: [1],
      })
      .set('authorization', `Bearer ${token}`)

    courseId = response.body.data.course_id

    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('Create new course success')
  })

  it('get course detail', async () => {
    const response = await supertest(web)
      .get('/api/courses/' + courseId)
      .set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Get course detail success')
  })

  it('update course', async () => {
    const response = await supertest(web)
      .put('/api/courses/' + courseId)
      .send({
        title: 'Test Course 2 Updated',
        description: 'Belajar pemrograman',
        level: 1,
        types: [1],
      })
      .set('authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Update course success')
  })

  afterAll(async () => {
    await supertest(web).get('/api/auth/logout').set('authorization', `Bearer ${token}`)
    await prisma.user.delete({
      where: {
        user_id: userId,
      },
    })
  })
})

describe('course - student role', () => {
  beforeAll(async () => {
    await supertest(web).post('/api/auth/register').send({
      email: 'student123@gmail.com',
      nama: 'student123',
      angkatan: 2020,
      level: 1,
      password: '12345678',
      role: 'student',
    })
    const res = await supertest(web).post('/api/auth/login').send({
      email: 'student123@gmail.com',
      password: '12345678',
    })

    token2 = res.body.accessToken

    userId2 = res.body.data.user_id
  })

  it('join course', async () => {
    const response = await supertest(web).post(`/api/courses/${courseId}/join`).set('authorization', `Bearer ${token2}`)

    const user = await supertest(web).get('/api/users/session').set('authorization', `Bearer ${token2}`)

    console.log(user)

    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Join course success')
  })

  afterAll(async () => {
    await prisma.$transaction([
      prisma.courseTypePivot.deleteMany({
        where: {
          course_id: courseId,
        },
      }),
      prisma.course.delete({ where: { course_id: courseId } }),
      prisma.courseProgress.deleteMany({
        where: {
          AND: [
            {
              course_id: courseId,
            },
            {
              user_id: userId2,
            },
          ],
        },
      }),
      prisma.user.delete({
        where: {
          user_id: userId2,
        },
      }),
    ])
  })
})
