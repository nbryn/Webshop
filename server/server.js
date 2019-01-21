const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { User } = require("./models/user");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// Database connection
mongoose.connect(process.env.DATABASE);
// Handl HTTP POST requests
app.use(bodyParser.urlencoded({ extended: true }));
// Only JSON format
app.use(bodyParser.json());
// Parse cookie header
app.use(cookieParser());

// SignUp
app.post("/webshop/users/signup", (request, response) => {
  const user = new User(request.body);

  // Add user to Database => Error handling
  user.save((error, document) => {
    if (error) {
      return response.json({
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

// SignIn
app.post("/webshop/users/signin", (request, response) => {
  // Locate email in Database
  User.findOne({ email: request.body.email }, (error, user) => {
    if (!user) {
      return response.json({
        signedIn: false,
        message: "No such email"
      });
    } else {
      // Compare user input with password in Database
      user.checkPassword(request.body.password, match => {
        if (!match) {
          return response.json({
            signedIn: false,
            message: "Email and password does not match"
          });
        } else {
          user.createToken((error, user) => {
            if (error) {
              return response.status(400).send(error);
            } else {
              // Set cookie value = token & confirm login
              response
                .cookie("authorized", user.token)
                .status(200)
                .json({
                  signedIn: true
                });
            }
          });
        }
      });
    }
  });
});

// Localhost port
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server @ ${port}`);
});
