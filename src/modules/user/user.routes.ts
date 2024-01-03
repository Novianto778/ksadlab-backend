import { Router } from 'express'
import { getUserSession, getUsers } from './user.handler'

const router = Router()

router.get('/', getUsers)
router.get('/session', getUserSession)

export default router
