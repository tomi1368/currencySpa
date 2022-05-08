const {login,register} = require("../controllers/userController")
const userRouter = require("express").Router()

userRouter.post("/login",login)

userRouter.post("/register",register)



module.exports = userRouter