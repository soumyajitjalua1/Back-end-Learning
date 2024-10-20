import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

cookieParser

const app =express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())
app.use(express.static("Public"))

//routes
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users",userRouter)


export{ app }