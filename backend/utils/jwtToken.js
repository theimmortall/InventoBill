const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + 60 * 60 * 1000 // 1 hour
    ),
    httpOnly: true,
    sameSite: "Lax", // or "None" with HTTPS + secure: true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken; 
