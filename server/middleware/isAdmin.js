const { User } = require("../models/User");

// Check if user is admin
let isAdmin = (request, response, next) => {
  let user;
  let token = request.cookies.authorized;

  User.findOne({ token: token }, (error, foundUser) => {
    if (!foundUser) {
      return response.status(400).json({
        completed: false,
        message: "No such token"
      });
    } else {
      user = foundUser;
      if (user.role === 0) {
        return response.send("Access denied");
      } else {
        next();
      }
    }
  });
};

module.exports = { isAdmin };
