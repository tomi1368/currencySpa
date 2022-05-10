const {Referrer} = require("../db/models/Referrer")
const { User } = require("../db/models/User");
const {nanoid} = require("nanoid")  
//Generar Link
const generateReferrer = async (req,res,next)=>{
    const {email} = req.body
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({error:true,message:"User not found"})
        const referral = new Referrer({userId:user._id,referralLink:nanoid(10)})
        const newReferral = await referral.save()
        const inviteLink = `${req.protocol}://localhost:3000/register/invite/${newReferral.referralLink}`
        return res.status(200).json({error:false,link:inviteLink})    
    }catch(err){
        return res.status(404).json({error:true,message:err.message})
    }
  }


module.exports = {generateReferrer}