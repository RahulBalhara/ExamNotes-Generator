import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/connectDb.js"
dotenv.config()
const PORT=process.env.PORT ||5000
const app=express()

app.get("/",(req,res)=>{
    res.send("Hello World my new server running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
    connectDb()
})