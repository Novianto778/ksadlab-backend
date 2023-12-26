import { Router } from 'express'
import verifyJWT from '../middleware/verifyJWT'
import { authRouter, uploadRouter } from '../modules'
import { errorHandling, notFound } from '../utils/errors'

const app = Router()
app.use('/api/auth', authRouter)
app.use('/api/upload', uploadRouter)

// verify token
app.use(verifyJWT)

// app.get('/', verifyRoles('student'), (req, res) => {
//   res.json({
//     message: 'Hello World!',
//   })
// })
app.use('*', errorHandling)
app.use('*', notFound)

export default app
