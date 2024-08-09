import express from 'express'
import { Login, myProfile, VerifyUser } from '../controllers/user.controller.js'
import {
  isAuthenticated,
  verifyUserOTP,
} from '../middleware/isAuthenticated.js'

const router = express.Router()

router.route('/login').post(Login)
router.route('/verify').post(verifyUserOTP, VerifyUser)
router.route('/me').get(isAuthenticated, myProfile)

export default router
