const mongoose = require("mongoose");
const token = require("jsonwebtoken");
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
  var user = this;
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
userSchema.createToken = function(callback) {
  let user = this;
  let token = token.sign(user._id.toHexString(), process.env.KeyToGenerateJWTs);

  // Store token @ user in Database
  user.token = token;
  user.save((error, user) => {
    if (error) {
      return callback(error);
    } else {
      // User with token
      cb(null, user);
    }
  });
};

// Check if password match
userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.password, (error, match) => {
    if (error) {
      return callback(error);
    } else {
      callback(null, match);
    }
  });
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
