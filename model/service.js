let mongoose = require("mongoose")

let Service = new mongoose.Schema({
  ServiceName: String,
  adminId: { type: mongoose.Schema.ObjectId, ref: "User" },
  categoryId: { type: mongoose.Schema.ObjectId, ref: "Category" },

  type: { type: String, enum: ["Normal", "VIP"] }

})
module.exports = mongoose.model("Service", Service)