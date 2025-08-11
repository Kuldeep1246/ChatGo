import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/auth.routes.js'
import connectDb from './config/db.js'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import cookieParser from "cookie-parser";
import messageRouter from './routes/message.routes.js'
import { app, server } from './socket/socket.js'



dotenv.config()

const port  = process.env.PORT || 5000
app.use(cookieParser());
app.use(express.json())
app.use(
  cors({
    origin: "https://chat-go-cmlc.vercel.app",
    credentials:true
  })
);

app.get('/',(req,res)=>{
    res.json({message:'Hello'})
})
app.use('/api/auth',authRouter)
app.use("/api/user", userRouter);
app.use('/api/message',messageRouter)

server.listen(port,()=>{
    connectDb()
    console.log('Server started')
})
