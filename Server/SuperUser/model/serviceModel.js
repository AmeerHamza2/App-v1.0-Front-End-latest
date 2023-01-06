const mongoose = require("mongoose");
const ratingSchema = require("./ratingModel")
const serviceSchema = mongoose.Schema({
  serviceType: {
    type: String,
    max: 15,
    required: true,
  },
  serviceProviderId: { type: String },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    max: 50000,
  },
  description: {
    type: String,
    required: true,
    max: 30,
  },
  timeRequired: {
    type: String,
    required: true,
  },
  where: {
    type: String,
    required: true,
    max: 20,
  },
  ratings: [ratingSchema],

});

module.exports = mongoose.model("services", serviceSchema);
