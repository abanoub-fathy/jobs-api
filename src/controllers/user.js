const { throwError } = require("../errors/custom-error");

// signup user
const signUpUser = async (req, res) => {
  res.send("Signup user");
};

// login user
const loginUser = async (req, res) => {
  res.send("login user");
};

module.exports = {
  signUpUser,
  loginUser,
};
