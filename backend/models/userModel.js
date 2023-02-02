const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static singup method
userSchema.statics.signup = async function (email, password) {
  // validation

  // check if email and password exist
  if (!email || !password) {
    throw Error("Email and Password is required");
  }

  // check if email is valid
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // check if password is strong
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  // check email if exist
  if (exists) {
    throw Error("Email already in use");
  }

  // use salt for additional encrypt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.signin = async function (email, password) {
  // check if email and password exist
  if (!email || !password) {
    throw Error("Email and Password is required");
  }

  const user = await this.findOne({ email });

  // check user if exist
  if (!user) {
    throw Error("Incorrect email address");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
