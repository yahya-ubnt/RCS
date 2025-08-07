// backend/models/Unit.js
const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  unitNumber: { type: String, required: true },
  status: { type: String, enum: ['available', 'occupied', 'maintenance'], default: 'available' },
  // Add other unit-specific fields here
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Unit', unitSchema);
