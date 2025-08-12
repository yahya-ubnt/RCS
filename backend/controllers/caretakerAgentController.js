const asyncHandler = require('express-async-handler');
const CaretakerAgent = require('../models/CaretakerAgent');

// @desc    Get all Caretaker/Agents
// @route   GET /api/staff
// @access  Private/Admin
const getCaretakerAgents = asyncHandler(async (req, res) => {
  const caretakerAgents = await CaretakerAgent.find({});
  res.json(caretakerAgents);
});

// @desc    Get single Caretaker/Agent by ID
// @route   GET /api/staff/:id
// @access  Private/Admin
const getCaretakerAgentById = asyncHandler(async (req, res) => {
  const caretakerAgent = await CaretakerAgent.findById(req.params.id);

  if (caretakerAgent) {
    res.json(caretakerAgent);
  } else {
    res.status(404);
    throw new Error('Caretaker/Agent not found');
  }
});

// @desc    Create new Caretaker/Agent
// @route   POST /api/staff
// @access  Private/Admin
const createCaretakerAgent = asyncHandler(async (req, res) => {
  const { fullName, phone, role, assignedBuildings, status } = req.body;

  if (!fullName || !phone || !role) {
    res.status(400);
    throw new Error('Please enter full name, phone, and role');
  }

  const caretakerAgentExists = await CaretakerAgent.findOne({ phone });

  if (caretakerAgentExists) {
    res.status(400);
    throw new Error('Caretaker/Agent with this phone number already exists');
  }

  const caretakerAgent = await CaretakerAgent.create({
    fullName,
    phone,
    role,
    assignedBuildings,
    status,
  });

  if (caretakerAgent) {
    res.status(201).json({
      _id: caretakerAgent._id,
      fullName: caretakerAgent.fullName,
      phone: caretakerAgent.phone,
      role: caretakerAgent.role,
      assignedBuildings: caretakerAgent.assignedBuildings,
      status: caretakerAgent.status,
    });
  } else {
    res.status(400);
    throw new Error('Invalid caretaker/agent data');
  }
});

// @desc    Update Caretaker/Agent
// @route   PUT /api/staff/:id
// @access  Private/Admin
const updateCaretakerAgent = asyncHandler(async (req, res) => {
  const { fullName, phone, role, assignedBuildings, status } = req.body;

  const caretakerAgent = await CaretakerAgent.findById(req.params.id);

  if (caretakerAgent) {
    caretakerAgent.fullName = fullName || caretakerAgent.fullName;
    caretakerAgent.phone = phone || caretakerAgent.phone;
    caretakerAgent.role = role || caretakerAgent.role;
    caretakerAgent.assignedBuildings = assignedBuildings || caretakerAgent.assignedBuildings;
    caretakerAgent.status = status || caretakerAgent.status;

    const updatedCaretakerAgent = await caretakerAgent.save();
    res.json({
      _id: updatedCaretakerAgent._id,
      fullName: updatedCaretakerAgent.fullName,
      phone: updatedCaretakerAgent.phone,
      role: updatedCaretakerAgent.role,
      assignedBuildings: updatedCaretakerAgent.assignedBuildings,
      status: updatedCaretakerAgent.status,
    });
  } else {
    res.status(404);
    throw new Error('Caretaker/Agent not found');
  }
});

// @desc    Delete Caretaker/Agent
// @route   DELETE /api/staff/:id
// @access  Private/Admin
const deleteCaretakerAgent = asyncHandler(async (req, res) => {
  const caretakerAgent = await CaretakerAgent.findById(req.params.id);

  if (caretakerAgent) {
    // Soft delete as per spec
    caretakerAgent.status = 'Inactive';
    await caretakerAgent.save();
    res.json({ message: 'Caretaker/Agent set to Inactive' });
  } else {
    res.status(404);
    throw new Error('Caretaker/Agent not found');
  }
});

module.exports = {
  getCaretakerAgents,
  getCaretakerAgentById,
  createCaretakerAgent,
  updateCaretakerAgent,
  deleteCaretakerAgent,
};