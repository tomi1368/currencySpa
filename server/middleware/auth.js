const {User} = require("../db/models/User")
const jwt = require("jsonwebtoken")
const authUser = async(req,res,next)=>{
    let token;
    let auth = req.get("Authorization")
    if(auth && auth.startsWith("Bearer")) token= auth.split(" ")[1]
    if(!token || token=="") return res.status(404).json({error:true,message:"Not authorized to access"})
    try{
        let decodifed = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decodifed.id)
        if(!user) return errorResponse("Not authorizated to access",404,res)
        req.user = user
        next()
    }catch(err){
        return res.status(404).json({error:true,message:err.message})
    }
}


module.exports = {authUser}