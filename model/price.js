let mongoose = require("mongoose")

let price = new mongoose.Schema({
  duration: String,
  price: String,
  adminId: { type: mongoose.Schema.ObjectId, ref: "User" },
  serviceId: { type: mongoose.Schema.ObjectId, ref: "Service" },

  type: { type: String, enum: ["HOURLY", "MONTHLY", "WEEKLY"] }

})
module.exports = mongoose.model("price", price)