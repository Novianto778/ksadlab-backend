import 'module-alias/register'
import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/db'

describe('user', () => {
  it('user login data valid', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'alui123@gmail.com',
      password: '12345678',
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Login sukses')
  })

  it('user login email tidak valid', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'pojokxx@gmail.com',
      password: '123457890',
    })
    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Login gagal')
  })
  it('user login password tidak valid', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'alui123@gmail.com',
      password: '1234523452345',
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Login gagal')
  })

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: 'pojok123@gmail.com',
      },
    })
  })

  it('register user data valid', async () => {
    const response = await supertest(web).post('/api/auth/register').send({
      email: 'pojok123@gmail.com',
      nama: 'Pojok Code',
      password: '12345678',
      confirmPassword: '12345678',
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('User created successfully')
  })

  it('register user data tidak valid', async () => {
    const response = await supertest(web).post('/api/auth/register').send({
      name: 'Pojok Code',
      email: 'pojok2@gmail.com',
      password: '123456789',
      confirmPassword: '1234567890',
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('confirmPassword Passwords do not match')
  })

  // it('Refresh token valid', async () => {
  //   const response = await supertest(web).get('/api/auth/refresh').set('Authorization', `Bearer ${getRefreshToken()}`)
  //   expect(response.status).toBe(200)
  //   expect(response.body.message).toEqual('Refresh token berhasil')
  // })

  // it('Refresh token tidak valid', async () => {
  //   const response = await supertest(web).get('/api/auth/refresh').set('Authorization', 'Bearer 1231312312313')
  //   expect(response.status).toBe(401)
  //   expect(response.body.message).toEqual('Refresh token gagal')
  // })
})
