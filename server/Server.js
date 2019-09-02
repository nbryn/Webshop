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

// Database connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/WEBSHOP",
  function(err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  }
);
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

// ------------------------------- USER ------------------------------ //

// Authentication => true/false => next => request, response
app.post("/webshop/users/auth", (request, response) => {
  User.findOne({ token: request.body.token }, (error, user) => {
    if (!user) {
      return response.status(200).json({
        completed: false,
        message: "No such token",
        authenticated: false
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
        cart: user.cart
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

// Add book to cart
app.post("/webshop/users/addToCart", (request, response) => {
  // Find user by Id
  User.findById(request.query.userId, (error, doc) => {
    // Is the book already added to cart?
    let alreadyInCart = false;

    // Loop through cart to check if book is in cart
    doc.cart.forEach(book => {
      if (book.id == request.query.bookId) {
        alreadyInCart = true;
      }
    });
    if (alreadyInCart) {
      User.findOneAndUpdate(
        {
          _id: request.query.userId,
          // If already in cart -> Find the duplicated book by ID
          "cart.id": mongoose.Types.ObjectId(request.query.bookId)
        },
        // Increment amount of book already in cart by 1
        { $inc: { "cart.$.quantity": 1 } },
        // Return all elements of user's cart
        { new: true },
        () => {
          if (error) return res.json({ success: false, error });
          response.status(200).json(doc.cart);
        }
      );
    } else {
      // Add book to cart if book is not present in cart
      User.findOneAndUpdate(
        { _id: request.query.userId },
        {
          $push: {
            cart: {
              // ID in cart is = book's Object ID
              id: mongoose.Types.ObjectId(request.query.bookId),
              // Return all elements of user's cart
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (error, doc) => {
          if (error) return response.json({ success: false, error });
          response.status(200).json(doc.cart);
        }
      );
    }
  });
});

// Remove book from cart
app.get("/webshop/users/removeBookFromCart", (request, response) => {
  // Find user by userID in request
  User.findOneAndUpdate(
    { _id: request.query.userId },

    // Remove book from cart that matches bookID in request
    { $pull: { cart: { id: mongoose.Types.ObjectId(request.query._id) } } },

    // Get new state of users cart after book is removed
    { new: true },
    (error, doc) => {
      const cart = doc.cart;
      const array = cart.map(book => {
        return mongoose.Types.ObjectId(book.id);
      });

      // Return all books left in cart after removal
      Book.find({ _id: { $in: array } })
        .populate("author")
        .populate("genre")
        .exec((error, booksInCart) => {
          return response.status(200).json({
            booksInCart,
            cart
          });
        });
    }
  );
});

// ------------------------------- AUTHOR ------------------------------ //

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

// ------------------------------- BOOK ------------------------------ //

// Get books to show in shop
app.post("/webshop/book/shop", (request, response) => {
  const req = request.body;

  let order = req.order ? req.order : "desc";
  let sortBy = req.sortBy ? req.sortBy : "_id";
  let max = req.max ? parseInt(req.max) : 25;
  let skip = parseInt(req.skip);
  let appliedFilters = {};

  // Check if category is part of request sent from client
  for (let key in req.filters) {
    if (req.filters[key].length > 0) {
      appliedFilters[key] = req.filters[key];
    }
  }

  try {
    Book.find(appliedFilters)
      .populate("author")
      .populate("genre")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(max)
      .exec((error, books) => {
        return response.status(200).json({
          size: books.length,
          books: books
        });
      });
  } catch (error) {
    return response.status(400).json({
      completed: false
    });
  }
});

// Get Book(s) by id - e.g. /webshop/book_by_id?id=xxx&type=array
app.get("/webshop/book_by_id", (request, response) => {
  let items, ids;
  const type = request.query.type;
  // Convert String to Array of Books
  if (type === "array") {
    ids = request.query.id.split(",");
    items = ids.map(id => {
      return mongoose.Types.ObjectId(id);
    });
  }
  // Get Book(s) with the specified id from Database and populate author & genre
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
app.get("/webshop/book_by_genre", (request, response) => {
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
