import sendMail from '../middleware/sendMail.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import ErrorHandler from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'

export const Login = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({ email })
    }

    const otp = Math.floor(Math.random() * 1000000)

    const verifytoken = await user.generateVerifyToken(otp)

    await sendMail(email, 'ChatBot', otp)

    const options = {
      httpOnly: true,
      secure: true,
    }
    return res
      .status(200)
      .cookie('verifytoken', verifytoken, options)
      .json(new ApiResponse(200, {}, 'OTP Send Successfully'))
  } catch (error) {
    next(error)
  }
})

export const VerifyUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await User.findById(id)
    res.clearCookie('verifytoken', {
      httpOnly: true,
      secure: true,
    })
    const token = user.generateToken()
    const options = {
      httpOnly: true,
      secure: true,
    }
    return res
      .status(200)
      .cookie('token', token, options)
      .json(new ApiResponse(200, user, 'User Login SuccessFully '))
  } catch (error) {
    next(error)
  }
})

export const myProfile = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await User.findById(id)
    return res
      .status(200)
      .json(new ApiResponse(200, user, 'User Fetched Successfully'))
  } catch (error) {
    next(error)
  }
})
