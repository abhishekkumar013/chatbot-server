import { app } from './app.js'
import dotenv from 'dotenv'
import ConnectDb from './config/db.js'
import { errorMiddleware } from './utils/errorHandler.js'

dotenv.config({
  path: './.env',
})

ConnectDb()
  .then(() => {
    const PORT = process.env.PORT || 8080
    app.listen(PORT, () => {
      console.log('Server Start at ', PORT)
    })
  })
  .catch((error) => {
    console.log('MONGO ERROR', error)
    process.exit(1)
  })
app.use(errorMiddleware)
