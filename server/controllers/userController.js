const { User } = require("../db/models/User");
const { checkReferrer } = require("../services/referal.service");
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({ error: true, message: "User not exist" });
    const match = await user.matchPassword(password);
    if (!match) return errorResponse("Password dont match", 404, res);
    const token = user.signToken();
    return res.status(200).json({ error: false, user: { ...user._doc, token } });
  } catch (err) {
    return res.status(404).json({ error: true, message: err.message });
  }
};

const register = async (req, res, next) => {
  const { referr } = req.query;
  console.log(referr)
  try {
    const user = new User({ ...req.body });
    if (referr) {
      const referral = await checkReferrer({
        referralId: referr,
      });
      user.refId = referral;
    }
    const savedUser = await user.save();
    if(referr){
      await User.findByIdAndUpdate(user.refId.userId,
        {$push: {"refUsers": savedUser._id}}
      )
    }
    return res.status(200).json({ error: false, data:savedUser });
  } catch (err) {
    return res.status(404).json({ error: true, message: err.message });
  }
};

const getUsers = async (req,res,next)=>{
  try{
    const users = await User.aggregate([
      {
        $project:{
          username:1,
          countRef:{$size:"$refUsers"},
          refUsers:1
        }
      },
      {
        $sort:{countRef:1}
      }
    ])
    console.log(users)
    return res.status(200).json({error:false,users})
  }catch(err){
    return res.status(404).json({error:true,message:err.message})
  }
}
module.exports = { login, register, getUsers };
