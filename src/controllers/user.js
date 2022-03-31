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

// logout user from existing device
const logoutUser = async (req, res) => {
  // delete the user token used to make the logout request
  req.user.tokens = req.user.tokens.filter(
    (tokenObj) => tokenObj.token !== req.token
  );
  await req.user.save();
  res.send();
};

// logout from all devices
const logoutUserFromAllDevices = async (req, res) => {
  // delete all tokens
  req.user.tokens = [];
  await req.user.save();
  res.send();
};

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  logoutUserFromAllDevices,
};
