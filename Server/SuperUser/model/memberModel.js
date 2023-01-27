const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  serviceProviderId: { type: String},
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  mobile: { type: String },
  role: {
    type: String,
    default: 'ADMIN',
  },
  status: { type: String, default: "AVAILABLE" },
  image: { type: String, required: true },
  verify:{
    type:String,
    default:'false'
      },
});

module.exports = mongoose.model("members", userSchema);
