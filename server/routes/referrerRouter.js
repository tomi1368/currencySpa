const {generateReferrer} = require("../controllers/referrerController")
const {authUser} = require("../middleware/auth")
const referrerRouter = require("express").Router()


referrerRouter.post("/",authUser,generateReferrer)

module.exports = referrerRouter