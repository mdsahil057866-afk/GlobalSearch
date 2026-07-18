const mongoose = require('mongoose');

const surplusFoodSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  items: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  isClaimed: {
    type: Boolean,
    default: false,
  },
  claimedByNGO: {
    type: String,
    default: null,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('SurplusFood', surplusFoodSchema);
