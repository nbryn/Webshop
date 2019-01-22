// Dependencies
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// Models
const { User } = require("./models/user");
const { Author } = require("./models/author");

// Middleware
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { isAuth } = require("./middleware/isAuth");
const { isAdmin } = require("./middleware/isAdmin");

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
app.get("/webshop/users/auth", isAuth, (request, response) => {
  response.status(200).json({
    admin: request.user.role === 0 ? false : true,
    authenticated: true,
    role: request.user.role,
    email: request.user.email,
    fullName: request.user.lastName,
    history: request.user.history,
    cart: request.user.cart
  });
});

// SignUp
app.post("/webshop/users/signup", (request, response) => {
  const user = new User(request.body);
  // Add user to Database => Error handling
  try {
    user.save((error, document) => {
      return response.status(404).json({
        completed: true
      });
    });
  } catch (error) {
    response.status(404).json({
      completed: false,
      error
    });
  }
});

// SignIn
app.post("/webshop/users/signin", (request, response) => {
  // Locate email in Database
  User.findOne({ email: request.body.email }, (error, user) => {
    if (!user) {
      return response.status(404).json({
        completed: false,
        message: "No such email"
      });
    } else {
      // Compare user input with password in Database
      user.verifyPassword(request.body.password, (error, match) => {
        if (!match) {
          return response.status(404).json({
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
app.get("/webshop/users/signout", isAuth, (request, response) => {
  // Check if user is signed in
  try {
    User.findOneAndUpdate({ _id: request.user._id }, { token: "" }, () => {
      return response.sendStatus(400).json({
        completed: true
      });
    });
  } catch (error) {
    return response.sendStatus(404).json({
      completed: false
    });
  }
});

// ------------------------------- AUTHOR ------------------------------ //

// Persist Author
app.post("/webshop/book/author", isAuth, isAdmin, (request, response) => {
  let author = new Author(request.body);

  try {
    author.save((error, document) => {
      return response.sendStatus(200).json({
        completed: true,
        author: document
      });
    });
  } catch (error) {
    return response.sendStatus(404).json({
      completed: false
    });
  }
});

app.get("/webshop/book/authors", isAuth, (request, response) => {
  try {
    Author.find({}, (error, authors) => {
      response.status(200).send(authors);
    });
  } catch (error) {
    return response.sendStatus(404).json({
      completed: false
    });
  }
});

// Localhost port
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server @ ${port}`);
});
