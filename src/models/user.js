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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
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

// generate and save Auth token
userSchema.methods.generateAuthToken = async function () {
  // Generate the token
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1 day",
  });

  // save the token to the DB
  user.tokens.push({ token });
  await user.save();

  // Send the token back
  return token;
};

// delete user sensitive data before sending it back
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;

  return user;
};

// Login user
userSchema.statics.loginUser = async function (email, password) {
  // check that email and password are provided
  if (!email || !email.trim() || !password) {
    return throwError("You should provide an email and password", 400);
  }

  // find the user by email
  const user = await User.findOne({ email: email.trim() });
  if (!user) {
    return throwError("Email  not found", 400);
  }

  // check the correctnece of the password
  const isPassCorrect = await bcrypt.compare(password, user.password);
  if (!isPassCorrect) {
    return throwError("Password is not correct", 400);
  }

  // return the user
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
