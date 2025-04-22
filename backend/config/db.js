import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

//connects to the database
export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo Connected: ${conn.connection.host}`)
    }catch(err){
        console.error(`Error: ${err.message}`)
        process.exit(1)
    }
}