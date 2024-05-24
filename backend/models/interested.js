const mongoose = require('mongoose');

const interestedSchema = new mongoose.Schema({
  propertyId: {
    type: ObjectId,
    ref: 'Property',
    required: true,
  },
  sellerId: {
    type: Object,
    ref: 'User',
    required: true,
  },
  buyerId: {
    type: String,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Interested', interestedSchema);
