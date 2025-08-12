// backend/models/Unit.js
const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  
  buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  label: { type: String, required: true },
  visitStatus: { type: String, enum: ['Visited', 'Not Visited'], default: 'Not Visited' },
  provider: { type: String },
  comments: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}, {});

module.exports = mongoose.model('Unit', unitSchema);
