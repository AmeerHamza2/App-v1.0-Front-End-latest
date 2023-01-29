const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customerId: { type: String },
  firstName: { type: String },
  email:{type:String},
  carName: { type: String },
  carNumber: { type: String },
  custAddress: { type: String, max: 40 },
  serviceName: { type: String },
  servicePrice: { type: Number },
  serviceProviderId: { type: String},
  mechanicId: { type: String },
  requestedOn: { type: Date, default: Date.now() },
  deliveredOn: { type: Date },
  status: {
    type: String,
    default: "PLACED",
  },
  paymentMethod: {type: String},
});

module.exports = mongoose.model("order", orderSchema);
