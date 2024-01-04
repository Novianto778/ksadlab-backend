import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/db'

describe('user', () => {
  // beforeAll(async () => {
  //   await createUser({
  //     email: 'alui778@gmail.com',
  //     nama: 'Alui',
  //     angkatan: 2020,
  //     level: 1,
  //     password: '12345678',
  //     role: 'admin',
  //   })
  // })

  it('create new user', async () => {
    const response = await supertest(web).post('/api/auth/register').send({
      email: 'alui778@gmail.com',
      nama: 'Alui',
      angkatan: 2020,
      level: 1,
      password: '12345678',
      role: 'admin',
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('User created successfully')
  })

  it('user login data valid', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'alui778@gmail.com',
      password: '12345678',
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Login sukses')
  })

  it('user tidak ditemukan', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'alui888@gmail.com',
      password: '12312312',
    })
    expect(response.status).toBe(404)
    expect(response.body.error).toEqual('User tidak ditemukan')
  })

  it('user login password tidak valid', async () => {
    const response = await supertest(web).post('/api/auth/login').send({
      email: 'alui778@gmail.com',
      password: '1234523452345',
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Login gagal')
  })

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: 'alui778@gmail.com',
      },
    })
  })

  // it('register user data valid', async () => {
  //   const response = await supertest(web).post('/api/auth/register').send({
  //     email: 'pojok123@gmail.com',
  //     nama: 'Pojok Code',
  //     password: '12345678',
  //     confirmPassword: '12345678',
  //   })
  //   expect(response.status).toBe(201)
  //   expect(response.body.message).toEqual('User created successfully')
  // })

  // it('register user data tidak valid', async () => {
  //   const response = await supertest(web).post('/api/auth/register').send({
  //     name: 'Pojok Code',
  //     email: 'pojok2@gmail.com',
  //     password: '123456789',
  //     confirmPassword: '1234567890',
  //   })
  //   expect(response.status).toBe(400)
  //   expect(response.body.message).toEqual('confirmPassword Passwords do not match')
  // })

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
