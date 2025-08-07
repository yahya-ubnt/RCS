const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added password field
  isAdmin: { type: Boolean, required: true, default: false }, // Added isAdmin field
  // Add other agent-specific fields here
  createdAt: { type: Date, default: Date.now },
});

// Encrypt password before saving
agentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Agent', agentSchema);