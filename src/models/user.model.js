import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
)
userSchema.methods.generateVerifyToken = function (otp) {
  return jwt.sign({ id: this._id, otp }, process.env.JWT_SECRETVERIFY, {
    expiresIn: process.env.JWT_EXPIREVERIFY,
  })
}
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}
const User = mongoose.model('User', userSchema)
export { User }
