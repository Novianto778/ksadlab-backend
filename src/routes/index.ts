import { Router } from 'express'
import verifyJWT from '../middleware/verifyJWT'
import { authRouter, courseRouter, uploadRouter } from '../modules'
import { errorHandling, notFound } from '../utils/errors'

const app = Router()
app.use('/api/auth', authRouter)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to KSADLAB API',
  })
})

app.use('/api/courses', courseRouter)

// verify token middleware
app.use(verifyJWT)
app.use('/api/upload', uploadRouter)

app.use('*', errorHandling)
app.use('*', notFound)

export default app
