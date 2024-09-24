import { Router } from 'express'
import { loginController } from '../controllers/loginController'
import { usersController } from '../controllers/userController'
import { authenticateTokenMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/login', loginController)
router.use('/users', authenticateTokenMiddleware, usersController)

export default router