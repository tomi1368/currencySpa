require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 6002
const {connectDB} = require("./db/db")
const referrerRouter = require("./routes/referrerRouter")
const userRouter =require("./routes/userRouter")
connectDB()
app.use(cors())
app.use(express.json())

app.use("/user",userRouter)
app.use("/referrer",referrerRouter)

app.listen(PORT,(req,res)=>{
    console.log(`Listening PORT ${PORT}`)
})

process.on("unhandledRejection",(err,promise)=>{
    console.log(`Connection error ${err}`)
    server.close(()=> process.exit(1))
})