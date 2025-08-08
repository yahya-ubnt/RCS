// backend/models/Building.js
const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  gps: {
    lat: { type: Number },
    lng: { type: Number },
  },
  owner: { type: String },
  staffId: { type: String },
  staffName: { type: String },
  staffPhone: { type: String },
  notes: { type: String },
  images: [{ type: String }],
  providers: [{ type: String }],
  totalUnits: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Building', buildingSchema);
