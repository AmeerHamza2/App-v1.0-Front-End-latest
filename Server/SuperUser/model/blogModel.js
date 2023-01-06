const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({

  title: { type: String, required: true, trim: true },
  body: { type: String, required: true, trim: true },
  author: {
      type: String,
      required: true
  },
  date: { type: Date, default: Date.now, required: true },
  image: { type: String, required: true },
  comments: [String]


});

module.exports = mongoose.model("post", blogSchema);
