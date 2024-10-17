
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/User");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, "alfa");
  req.user = await usersModel.findById(decodedData.id);
  next();
};