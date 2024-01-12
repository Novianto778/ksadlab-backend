import { Router } from 'express'
import rateLimiting from '../../middleware/rateLimiting'
import { login, logout, refreshToken, register } from './auth.handler'

const router = Router()

router.post('/register', register)
router.post('/login', rateLimiting, login)
router.post('/refresh', refreshToken)
router.get('/logout', logout)

export default router
