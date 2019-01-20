const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");

// Database connection
mongoose.connect(process.env.DATABASE);
// Handles HTTP POST requests
app.use(bodyParser.urlencoded({ extended: true }));
// Only JSON format
app.use(bodyParser.json());
//Parses cookie header
app.use(cookieParser());

// Entities
const { User } = require("./entities/user");

// SignUp
app.post("/webshop/users/signup", (request, response) => {
  let user = new User(request.body);
  // Add user to Database => Error handling
  user.save((error, document) => {
    if (error) {
      return res.json({
        success: false,
        error
      });
    } else {
      response.status(200).json({
        success: true,
        userData: document
      });
    }
  });
});

// Localhost port
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server @ ${port}`);
});
