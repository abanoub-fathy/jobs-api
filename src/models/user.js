const mongoose = require("mongoose");
const validator = require("validator");
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

const User = mongoose.model("User", userSchema);
module.exports = User;
