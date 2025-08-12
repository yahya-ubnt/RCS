// backend/models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String }, // Optional as per spec
  phoneNumber: { type: String, required: true, unique: true },
  leadSource: { type: String, enum: ['Manual', 'WhatsApp', 'SMS', 'Referral', 'Website'], default: 'Manual' },
  buildingName: { type: String },
  buildingLocation: { type: String },
  status: { type: String, enum: ['new', 'in_progress', 'converted', 'rejected'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User ID
  notes: { type: String },
  nextPaymentDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

leadSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lead', leadSchema);
