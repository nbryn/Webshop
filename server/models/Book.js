const mongoose = require("mongoose");

// Book Schema
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true
    },

    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true
    },

    title: {
      type: String,
      unique: 1,
      required: true,
      maxlength: 40
    },

    pages: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true,
      maxlength: 255
    },

    description: {
      type: String,
      required: true,
      maxlength: 5000
    },

    publisher: {
      type: String,
      required: true,
      maxlength: 80
    },

    images: {
      type: Array,
      default: []
    },

    purchased: {
      type: Number,
      maxlength: 80,
      default: 0
    },

    inStock: {
      type: Boolean,
      required: true
    },

    shipping: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = { Book };
