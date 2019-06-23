const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/webshop", { target: "https://localhost:3001/" }));
};
