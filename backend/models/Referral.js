// backend/models/Referral.js
const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  referredName: { type: String, required: true },
  referredContact: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'converted'], default: 'pending' },
  // Add other referral-specific fields here
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Referral', referralSchema);
