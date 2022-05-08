const {Referrer} = require("../db/models/Referrer")
const { v4: uuidv4 } = require("uuid");
//Generar Link
const generateReferrer = async (req,res,next)=>{
    const {email} = req.body
    try{
        const user = await Referrer.findOne({email})
        if(!user) return res.status(404).json({error:true,message:"User not found"})
        const referral = new Referrer({userId:user._id,referralLink:uuidv4()})
        const newReferral = await referral.save()
        const inviteLink = `${req.protocol}://${req.headers.host}/register/invite/${newReferral.referralLink}`
        return res.status(200).json({error:false,link:inviteLink})    
    }catch(err){
        return res.status(404).json({error:true,message:err.message})
    }
  }


module.exports = {generateReferrer}