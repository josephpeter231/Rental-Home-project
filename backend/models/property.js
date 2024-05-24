const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  price: Number,
  nearbyHospitals: [String],
  nearbyColleges: [String],
  description: String,
  image:String,
  sellerid:String,
});

module.exports = mongoose.model('Property', propertySchema);
