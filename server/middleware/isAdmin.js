let isAdmin = (request, response, next) => {
  if (request.user.role === 0) {
    return response.send("Access denied");
  } else {
    next();
  }
};

module.exports = { isAdmin };
