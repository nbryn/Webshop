const mongoose = require("mongoose");
let Schema = mongoose.Schema;

// Creates user schema
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

const User = mongoose.model("User", userSchema);

module.exports = { User };
