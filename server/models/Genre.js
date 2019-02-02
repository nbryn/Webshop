const mongoose = require("mongoose");

// Genre Schema
let Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 40
  }
});

const Genre = mongoose.model("Genre", genreSchema);
module.exports = { Genre };
