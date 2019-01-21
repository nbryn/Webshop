const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT = 10;

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
userSchema.pre("save", next => {
  // If user is updating password
  if (this.isModified("password")) {
    bcrypt.genSalt(SALT, (error, salt) => {
      if (error) {
        return next(error);
      } else {
        bcrypt.hash(this.password, salt, (error, hash) => {
          if (error) {
            return next(error);
          } else {
            this.password = hash;
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

const User = mongoose.model("User", userSchema);

module.exports = { User };
