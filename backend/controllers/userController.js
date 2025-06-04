const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    contactNumber,
  });
  sendToken(user, 201, res);
};

// Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and Password Required"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
  console.log("Input password:", password);
  console.log("Stored password:", user.password);
  console.log("Match result:", isPasswordMatched);

};

// Logout User
exports.logout = async (res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// Get User Details
exports.getUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

