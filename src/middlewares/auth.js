const jwt = require("jsonwebtoken");
const { throwError } = require("../errors/custom-error");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) throw new Error();
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    if (!decodedToken) throw new Error();

    // find the user
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    // return back the user info and the token
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    throwError("You need to sign in", 401);
  }
};

module.exports = auth;
