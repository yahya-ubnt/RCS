// backend/models/Commission.js
const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  referral: { type: mongoose.Schema.Types.ObjectId, ref: 'Referral', required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' },
  // Add other commission-specific fields here
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Commission', commissionSchema);
