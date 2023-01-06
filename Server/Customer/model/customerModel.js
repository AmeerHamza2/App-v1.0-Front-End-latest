const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const customerSchema = mongoose.Schema({
  firstname: {
    type: String,
    min: 4,
    max: 20,
  },
  lastname: {
    type: String,
    min: 4,
    max: 20,
  },
  email: {
    type: String,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String },
  role: {
    type: String,
    default: "CUSTOMER",
  },
  resetLink:{
    data:String,
    default:''
  },
});

customerSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

module.exports = mongoose.model("customers", customerSchema);
