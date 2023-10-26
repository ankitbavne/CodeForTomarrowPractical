let mongoose = require("mongoose")

let Category = new mongoose.Schema({
  categoryName: String,
  adminId: { type: mongoose.Schema.ObjectId, ref: "User" }
})
module.exports = mongoose.model("Category", Category)