const { throwError } = require("../errors/custom-error");
const User = require("../models/user");

// signup user
const signUpUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  // await saving to the db
  const token = await user.generateAuthToken();
  res.status(201).send({
    user,
    token,
  });
};

// login user
const loginUser = async (req, res) => {
  let user = await User.loginUser(req.body.email, req.body.password);
  const token = await user.generateAuthToken();
  res.status(200).send({
    user,
    token,
  });
};

module.exports = {
  signUpUser,
  loginUser,
};
