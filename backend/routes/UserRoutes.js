const express = require("express");
const { resetPassword } = require('../controllers/userController');
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails
} = require("../controllers/userController");
const { isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();

router.route("/sign-up").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/logout").get(logout);

module.exports = router;