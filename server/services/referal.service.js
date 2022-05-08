const {Referrer} = require("../db/models/Referrer")
//Cuando entra un usuario
const checkReferrer = async (query)=>{
    try {
        const referral = await Referrer.findOne(query).populate({
          path: "userId",
        })
        if (!referral) {
          throw new Error("Invalid Referral")
        }
        return referral
      } catch (err) {
        throw new Error(err)
      }
}


module.exports = {checkReferrer}