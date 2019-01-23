const mongoose = require("mongoose");

// Author Schema
let Schema = mongoose.Schema;

const authorSchema = new Schema({
  fullName: {
    type: String,
    unique: 1,
    required: true,
    maxlength: 40
  }
});

const Author = mongoose.model("Author", authorSchema);
module.exports = { Author };
