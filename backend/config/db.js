import mongoose from 'mongoose'
import dotenv from "dotenv";


dotenv.config()

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}` +
                  `@mern-udemy.dxdsr.mongodb.net/` +
                  `${DATABASE}?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB