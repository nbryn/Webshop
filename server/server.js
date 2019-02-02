// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Models
const { User } = require("./models/User");
const { Author } = require("./models/Author");
const { Book } = require("./models/Book");
const { Genre } = require("./models/Genre");

// Middleware
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { isAdmin } = require("./middleware/isAdmin");

// Database connection
mongoose.connect(process.env.DATABASE);
// Extract body of incoming request stream and expose it on request.body
app.use(bodyParser.urlencoded({ extended: true }));
// Only JSON format
app.use(bodyParser.json());
// Parse cookie header
app.use(cookieParser());
// Allow cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

// ------------------------------- USERS ------------------------------ //

// Authentication => true/false => next => request, response
app.post("/webshop/users/auth", (request, response) => {
  User.findOne({ token: request.body.token }, (error, user) => {
    if (!user) {
      return response.status(400).json({
        completed: false,
        message: "No such token"
      });
    } else {
      return response.status(200).json({
        admin: user.role === 0 ? false : true,
        authenticated: true,
        _id: user.id,
        role: user.role,
        email: user.email,
        fullName: user.fullName,
        token: user.token,
        history: user.history,
        basket: user.basket
      });
    }
  });
});

// SignUp
app.post("/webshop/users/signup", (request, response) => {
  let user = new User(request.body);
  // Persist User => Error handling
  try {
    user.save((error, document) => {
      return response.status(200).json({
        completed: true
      });
    });
  } catch (error) {
    response.status(400).json({
      completed: false,
      error
    });
  }
});

// Sign In
app.post("/webshop/users/signin", (request, response) => {
  // Locate email in Database
  User.findOne({ email: request.body.email }, (error, user) => {
    if (!user) {
      return response.status(400).json({
        completed: false,
        message: "No such email"
      });
    } else {
      // Compare user input with password in Database
      user.verifyPassword(request.body.password, (error, match) => {
        if (!match) {
          return response.status(400).json({
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
                  user,
                  token: user.token
                });
            }
          });
        }
      });
    }
  });
});

// ------------------------------- AUTHORS ------------------------------ //

// Persist Author
app.post("/webshop/book/author", isAdmin, (request, response) => {
  let author = new Author(request.body);

  try {
    author.save((error, author) => {
      return response.status(200).json({
        completed: true,
        author: author
      });
    });
  } catch (error) {
    return response.sendStatus(404).json({
      completed: false
    });
  }
});

// Find all Authors
app.get("/webshop/book/authors", (request, response) => {
  try {
    Author.find({}, (error, authors) => {
      response.status(200).send(authors);
    });
  } catch (error) {
    return response.status(404).json({
      completed: false
    });
  }
});

// ------------------------------- BOOKS ------------------------------ //

// Persist Book
app.post("/webshop/book", isAdmin, (request, response) => {
  let book = new Book(request.body);

  try {
    book.save((error, book) => {
      return response.status(200).json({
        completed: true,
        book: book
      });
    });
  } catch (error) {
    return response.status(404).json({
      completed: false
    });
  }
});

// Get Book(s) by id - e.g. /webshop/book_by_id?id=xxx&type=array
app.get("/webshop/book_by_id", (request, response) => {
  let items, ids;
  let type = request.query.type;
  // Convert String to Array of Books
  if (type === "array") {
    ids = request.query.id.split(",");
    items = ids.map(id => {
      return mongoose.Types.ObjectId(id);
    });
  }
  // Get Book(s) with specified id from Database and populate author & genre
  try {
    Book.find({ _id: { $in: items } })
      .populate("author")
      .populate("genre")
      .exec((error, books) => {
        return response.status(200).send(books);
      });
  } catch (error) {
    return response.status(404).json({
      completed: false
    });
  }
});

// Get Book(s) by genre - e.g. /webshop/book_by_genre?genre=xxx&type=array
app.get("/webshop/book_by_genre", isAdmin, (request, response) => {
  let items, ids;
  let type = request.query.type;
  // Convert String to Array of Books
  if (type === "array") {
    ids = request.query.id.split(",");
    items = ids.map(id => {
      return mongoose.Types.ObjectId(id);
    });
  }
  // Get Book(s) with specified genre from Database and populate author & genre
  try {
    Book.find({ genre: { $in: items } })
      .populate("author")
      .populate("genre")
      .exec((error, books) => {
        return response.status(200).send(books);
      });
  } catch (error) {
    return response.status(404).json({
      completed: false
    });
  }
});

// Get most purchased book(s) - e.g. "/webshop/book_by_sold?sortBy=purchased&order=desc&limit=4"
app.get("/webshop/book_by_sold", (request, response) => {
  // Default values if not present in query
  let order = request.query.order ? request.query.order : "asc";
  let sortBy = request.query.sortBy ? request.query.sortBy : "_id";
  let limit = request.query.limit ? parseInt(request.query.limit) : 80;

  try {
    Book.find()
      .populate("author")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec((error, books) => {
        return response.status(200).send(books);
      });
  } catch (error) {
    return response.status(404).json({
      completed: false
    });
  }
});

// ------------------------------- Genre ------------------------------ //

// Persist Genre
app.post("/webshop/book/genre", isAdmin, (request, response) => {
  let genre = new Genre(request.body);

  try {
    genre.save((error, genre) => {
      return response.status(200).json({
        completed: true,
        genre: genre
      });
    });
  } catch (error) {
    return response.status(400).json({
      completed: false
    });
  }
});

// Get all Genres
app.get("/webshop/book/genres", (request, response) => {
  try {
    Genre.find({}, (error, genres) => {
      return response.status(200).send(genres);
    });
  } catch (error) {
    return response.status(404).json({
      completed: false
    });
  }
});

// Localhost Port
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server @ ${port}`);
});
