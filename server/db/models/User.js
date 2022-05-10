const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
  },
  role:{
    type:Number,
    required:true,
    default:2000
  },
  address:{
    type:String
  },
  gender:{
    type:String
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  email:{
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email address.',
    ],
    required: [true, 'Please enter Email Address'],
    unique: true,
    lowercase: true,
  },
  refUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  refId:{
    type:Schema.Types.ObjectId,
    ref:"Referrer"
  }
});

userSchema.pre("save", async function (next) {
  const user = this;
  const SALT = 10;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    let crypt = await bcrypt.hash(user.password, SALT);
    user.password = crypt;
    return next();
  } catch (err) {
    return next(err);
  }
});
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.signToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES,
  });
};

const User = model("User", userSchema);

module.exports = { User };
