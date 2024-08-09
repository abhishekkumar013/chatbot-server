import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

import UserRoutes from './routes/user.routes.js'
import ChatRoues from './routes/chat.routes.js'

app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/chat', ChatRoues)

export { app }
