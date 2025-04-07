import express from 'express'
import { connectDB } from './config/db.js'
import itemRouter from './routes/items.route.js'


const app = express()

app.use(express.json()) // allows to accept json data in the body

app.get("/", (req,res)=>{
    res.send("server is ready")
})

app.use("/api/items",itemRouter)

app.listen(5000, () =>{
    connectDB()
    
    console.log("Server running at port 5000")
})
