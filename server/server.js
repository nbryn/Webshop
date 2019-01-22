const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// Models
const { User } = require("./models/user");

// Middleware
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { authorization } = require("./middleware/Authorization");

// Database connection
mongoose.connect(process.env.DATABASE);
// Handl HTTP POST requests
app.use(bodyParser.urlencoded({ extended: true }));
// Only JSON format
app.use(bodyParser.json());
// Parse cookie header
app.use(cookieParser());

// ------------------------------- USER ------------------------------ //

// Authentication => true/false => next => request, response
app.get("/webshop/users/auth", authorization, (request, response) => {
  response.status(200).json({
    admin: request.user.role === 0 ? false : true,
    authenticated: true,
    role: request.user.role,
    email: request.user.email,
    name: request.user.name,
    lastname: request.user.lastName,
    history: request.user.history,
    cart: request.user.cart
  });
});

// SignUp
app.post("/webshop/users/signup", (request, response) => {
  const user = new User(request.body);
  // Add user to Database => Error handling
  user.save((error, document) => {
    if (error) {
      return response.json({
        completed: false,
        error
      });
    } else {
      response.status(200).json({
        completed: true
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
        completed: false,
        message: "No such email"
      });
    } else {
      // Compare user input with password in Database
      user.verifyPassword(request.body.password, (error, match) => {
        if (!match) {
          return response.json({
            completed: false,
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
                  completed: true
                });
            }
          });
        }
      });
    }
  });
});

// SignOut
app.get("/webshop/users/signout", authorization, (request, response) => {
  // Check is user is signedIn
  User.findOneAndUpdate(
    { _id: request.user._id },
    { token: "" },
    (error, document) => {
      if (error) {
        return response.json({
          completed: false,
          error
        });
      } else {
        return response.status(200).send({
          completed: true
        });
      }
    }
  );
});

// Localhost port
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server @ ${port}`);
});
