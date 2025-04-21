import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import itemRouter from './routes/items.route.js'
import userRouter from './routes/user.route.js'
import tradeofferRouter from './routes/tradeoffer.route.js'
import livetradeRouter from  './routes/livetrade.route.js'
import tradeRouter from './routes/trade.route.js'
import {createServer} from 'http'
import { Server } from "socket.io";

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) // allows to accept json data in the body

app.get("/", (req,res)=>{
    res.send("server is ready")
})
app.use(cors())
app.use("/api/items",itemRouter)
app.use("/api/users",userRouter)
app.use("/api/trade",tradeofferRouter)
app.use("/api/tradedone",tradeRouter)
app.use("/api/livetrade", livetradeRouter)

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin:"http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"]
    }
});
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chat message', (msg) => {
      })
    socket.on('join room',(room)=>{
        socket.join(room)
    })
    socket.on('broadcast user',(data) =>{
        socket.to(data.room).emit('fetch user',data.userId)
        
    })
    socket.on('broadcast user2',(data) =>{
        socket.to(data.room).emit('fetch user2',data.userId)
        
    })
    socket.on('selected items',(data)=>{
        socket.to(data.room).emit('sending items',data.selected)
    })
    socket.on('user submited',(data) =>{
        socket.to(data.room).emit('other user submit',data.submit)
    })
    socket.on('both submited',(data)=>{
        io.to(data.room).emit('trade done')
        io.in(data.room).socketsLeave(data.room)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });


httpServer.listen(PORT, () =>{
    connectDB()
    
    console.log("Server running at port 5000")
})
