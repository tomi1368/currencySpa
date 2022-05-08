const { User } = require("../db/models/User");
const { checkReferrer } = require("../services/referal.service");
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: true, message: "User not exist" });
    const match = await user.matchPassword(password);
    if (!match) return errorResponse("Password dont match", 404, res);
    const token = user.signToken();
    return res.status(200).json({ error: false, user: { ...user, token } });
  } catch (err) {
    return res.status(404).json({ error: true, message: err.message });
  }
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const { reflink } = req.query;
  try {
    const user = new User({ email, password });
    if (reflink) {
      const referral = await checkReferrer({
        referralId: reflink,
      });
      user.refId = referral;
    }
    const savedUser = await user.save();
    if(reflink){
      await User.findByIdAndUpdate(referral.userId._id,
        {$push: {"refUsers": savedUser._id}}
      )
    }
    const customUserResponse = { user: savedUser, refCode: savedReferrer._id };
    return res.status(200).json({ error: false, data: customUserResponse });
  } catch (err) {
    return res.status(404).json({ error: true, message: err.message });
  }
};

const getUsers = async (req,res,next)=>{
  try{
    const users = await User.find({}).populate({
      path:"refUsers",
      model:"User"
    })
    return res.status(200).json({error:false,users})
  }catch(err){
    return res.status(404).json({error:true,message:err.message})
  }
}
module.exports = { login, register, getUsers };
