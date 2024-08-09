import express from 'express'
import {
  Login,
  logout,
  myProfile,
  VerifyUser,
} from '../controllers/user.controller.js'
import {
  isAuthenticated,
  verifyUserOTP,
} from '../middleware/isAuthenticated.js'

const router = express.Router()

router.route('/login').post(Login)
router.route('/verify').post(verifyUserOTP, VerifyUser)
router.route('/me').get(isAuthenticated, myProfile)
router.route('/logout').get(isAuthenticated, logout)

export default router
