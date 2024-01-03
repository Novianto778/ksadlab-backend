import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/db'
let token = ''
let courseId = ''
describe('course', () => {
  beforeAll(async () => {
    const res = await supertest(web).post('/api/auth/login').send({
      email: 'admin123@gmail.com',
      password: '12345678',
    })

    token = res.body.accessToken
  })
  it('get all courses', async () => {
    const response = await supertest(web).get('/api/courses').set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Get all courses success')
  })

  // it('get course detail', async () => {
  //   const response = await supertest(web).get('/api/courses/1')
  //   expect(response.status).toBe(200)
  //   expect(response.body.message).toEqual('Get course detail success')
  // })

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

  // it('update course', async () => {
  //   const response = await supertest(web)
  //     .put('/api/courses/1')
  //     .send({
  //       title: 'Test Course 2 Updated',
  //       description: 'Belajar pemrograman',
  //       level: 1,
  //       types: [1],
  //     })
  //   expect(response.status).toBe(200)
  //   expect(response.body.message).toEqual('Update course success')
  // })

  afterAll(async () => {
    await prisma.$transaction([
      prisma.courseTypePivot.deleteMany({
        where: {
          course_id: courseId,
        },
      }),
      prisma.course.delete({ where: { course_id: courseId } }),
    ])
  })
})
