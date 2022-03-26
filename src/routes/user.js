const { Router } = require("express");
const userController = require("../controllers/user");
const router = Router();

// register user
router.post("/register", userController.signUpUser);

// login user
router.post("/login", userController.loginUser);

module.exports = router;
