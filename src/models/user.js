const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { throwError } = require("../errors/custom-error");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: [true, "This Email is already used before"],
    validate(input) {
      if (!validator.isEmail(input)) {
        return throwError("Email is not valid", 400);
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password Should be at least 6 chars"],
  },
});

// hash user password before saving to the db
userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    // hash user password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

// generate Auth token
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1 day",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
