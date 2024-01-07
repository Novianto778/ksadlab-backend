import { Router } from 'express'
import { login, logout, refreshToken, register } from './auth.handler'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/refresh', refreshToken)
router.get('/logout', logout)

export default router
