// backend/models/Payout.js
const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  transactionId: { type: String },
  // Add other payout-specific fields here
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payout', payoutSchema);
