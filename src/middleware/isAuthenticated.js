import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import ErrorHandler from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return next(new ErrorHandler('User is not authenticated', 400))
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decode.id)
    next()
  } catch (error) {
    next(error)
  }
})

export const verifyUserOTP = asyncHandler(async (req, res, next) => {
  try {
    const { verifytoken } = req.cookies
    // console.log(verifytoken)
    if (!verifytoken) {
      return next(new ErrorHandler('User is not authenticated', 400))
    }
    const decode = await jwt.verify(verifytoken, process.env.JWT_SECRETVERIFY)

    if (!decode) {
      return next(new ErrorHandler('OTP Expired', 400))
    }

    const { otp } = req.body

    if (String(decode.otp) !== String(otp)) {
      return next(new ErrorHandler('Incorrect Otp', 400))
    }

    req.user = await User.findById(decode.id)

    next()
  } catch (error) {
    next(error)
  }
})
