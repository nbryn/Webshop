const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT = 12;

// Creates user schema
let Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: Number,
    default: 0
  },

  token: {
    type: String
  },

  name: {
    type: String,
    required: true,
    maxLength: 40
  },

  lastName: {
    type: String,
    required: true,
    maxLength: 40
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },

  password: {
    type: String,
    required: true,
    minLength: 4
  },

  history: {
    type: Array,
    default: []
  },

  basket: {
    type: Array,
    default: []
  }
});

// Password hashing before user persistence
userSchema.pre("save", function(next) {
  let user = this;
  // New user/existing user updating password
  if (user.isModified("password")) {
    bcrypt.genSalt(SALT, function(error, salt) {
      if (error) {
        return next(error);
      } else {
        bcrypt.hash(user.password, salt, function(error, hash) {
          if (error) {
            return next(error);
          } else {
            user.password = hash;
            // User persistence
            next();
          }
        });
      }
    });
  } else {
    next();
  }
});

// New token
userSchema.methods.createToken = function(callback) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), process.env.KeyToGenerateJWTs);

  // Store token @ user in Database
  user.token = token;
  user.save((error, user) => {
    if (error) {
      return callback(error);
    } else {
      // User with token
      callback(null, user);
    }
  });
};

// Check if password match
userSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, (error, match) => {
    if (error) {
      return callback(error);
    } else {
      callback(null, match);
    }
  });
};

// Verify user token
userSchema.statics.verifyToken = function(token, callback) {
  let user = this;

  // If token is valid return userID
  jwt.verify(token, process.env.KeyToGenerateJWTs, (error, decodedToken) => {
    user.findOne(
      {
        _id: decodedToken,
        token: token
      },
      (error, user) => {
        if (error) {
          return callback(error);
        } else {
          callback(null, user);
        }
      }
    );
  });
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
