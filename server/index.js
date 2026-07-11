import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/connectDb.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/generate.rout.js"
import pdfRouter from "./routes/pdf.route.js"
import cors from "cors"
dotenv.config()
const PORT=process.env.PORT ||5000

const app=express()
app.use(express.json())
app.use(cookieParser());
//conectivity between frontend and backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.get("/",(req,res)=>{
    res.send("Hello World my new server running")
})
app.use("/api/auth", authRouter)
app.use("/api/user",userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
    connectDb()
})