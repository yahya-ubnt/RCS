// backend/models/Building.js
const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  // Add other building-specific fields here
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Building', buildingSchema);
