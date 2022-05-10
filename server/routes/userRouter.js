const {login,register,getUsers} = require("../controllers/userController")
const userRouter = require("express").Router()

userRouter.post("/login",login)

userRouter.post("/register",register)

userRouter.get("/",getUsers)

module.exports = userRouter