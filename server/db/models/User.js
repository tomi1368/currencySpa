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
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
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
