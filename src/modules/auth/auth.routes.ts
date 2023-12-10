import { Router } from 'express'
import { login, refreshToken, register } from './auth.handler'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/refresh', refreshToken)

export default router
