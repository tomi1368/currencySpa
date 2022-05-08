const {Schema,model} = require("mongoose")

const referrerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      referralLink: {
        type: String,
        unique: true
      }
})

const Referrer = model("Referrer",referrerSchema)


module.exports = {Referrer}