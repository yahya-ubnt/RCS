// backend/models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  source: { type: String, enum: ['manual', 'whatsapp', 'sms', 'api'], default: 'manual' },
  status: { type: String, enum: ['new', 'in_progress', 'converted', 'rejected'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

leadSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lead', leadSchema);
