const mongoose = require("mongoose");

// Author Schema
const authorSchema = mongoose.Schema({
  fullName: {
    type: String,
    unique: 1,
    required: true,
    maxlength: 40
  }
});

const Author = mongoose.model("Author", authorSchema);

module.exports = { Author };
