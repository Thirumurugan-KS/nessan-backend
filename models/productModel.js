const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name:  String,
  description: String,
  price :   String,
  url : String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);