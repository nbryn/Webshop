const { User } = require("../models/user");

// Authentication
let isAuth = (request, response, next) => {
  let token = request.cookies.authorized;

  User.verifyToken(token, (error, user) => {
    if (error) {
      throw error;
    } else if (!user) {
      return response.json({
        authenticated: false,
        error: true
      });
    } else {
      // Push valid token and user data to request
      request.token = token;
      request.user = user;
      next();
    }
  });
};

module.exports = { isAuth };
