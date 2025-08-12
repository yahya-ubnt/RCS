const mongoose = require('mongoose');

const CaretakerAgentSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add a full name'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      unique: true,
      match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Please add a valid phone number'],
    },
    role: {
      type: String,
      enum: ['Caretaker', 'Agent'],
      required: [true, 'Please select a role'],
    },
    assignedBuildings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
      },
    ],
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CaretakerAgent', CaretakerAgentSchema);