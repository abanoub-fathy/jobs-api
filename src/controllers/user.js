const { throwError } = require("../errors/custom-error");
const User = require("../models/user");

// signup user
const signUpUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
};

// login user
const loginUser = async (req, res) => {
  res.send("login user");
};

module.exports = {
  signUpUser,
  loginUser,
};
