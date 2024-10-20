//creating token and saving it in cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    // option for cookie
  
    const options = {
      exp: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;