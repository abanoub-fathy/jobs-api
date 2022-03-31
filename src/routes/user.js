const { Router } = require("express");
const auth = require("../middlewares/auth");
const userController = require("../controllers/user");
const router = Router();

// register user
router.post("/register", userController.signUpUser);

// login user
router.post("/login", userController.loginUser);

// logout user from exitsing device
router.post("/logout", auth, userController.logoutUser);

// logout user from all devices
router.post("/logout/all", auth, userController.logoutUserFromAllDevices);

module.exports = router;
