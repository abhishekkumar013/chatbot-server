import mongoose from 'mongoose'

const ConnectDb = async () => {
  try {
    const Instance = await mongoose.connect(process.env.DB_URL)
    console.log('DataBase Conncted ', Instance.connection.name)
  } catch (error) {
    console.log('Error in MongoDb Conn ', error)
    process.exit(1)
  }
}

export default ConnectDb
