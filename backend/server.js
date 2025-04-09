import express from 'express'
import { connectDB } from './config/db.js'
import itemRouter from './routes/items.route.js'
import userRouter from './routes/user.route.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) // allows to accept json data in the body

app.get("/", (req,res)=>{
    res.send("server is ready")
})

app.use("/api/items",itemRouter)
app.use("/api/users",userRouter)

app.listen(PORT, () =>{
    connectDB()
    
    console.log("Server running at port 5000")
})
