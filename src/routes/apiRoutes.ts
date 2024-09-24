import { Router } from 'express'
import { loginController } from '../controllers/loginController'
import { usersController } from '../controllers/userController'
import { contactsController } from '../controllers/contactController'
import { authenticateTokenMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/login', loginController)
router.use('/users', authenticateTokenMiddleware, usersController)
router.use('/contacts', authenticateTokenMiddleware, contactsController)

export default router