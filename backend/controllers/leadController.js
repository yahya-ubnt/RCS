// backend/controllers/leadController.js
const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Public
exports.getAllLeads = async (req, res) => {
  try {
    const { status, leadSource, assignedTo, startDate, endDate, search, buildingName, buildingLocation } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }
    if (leadSource) {
      query.leadSource = leadSource;
    }
    if (assignedTo) {
      query.assignedTo = assignedTo;
    }
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (buildingName) {
      query.buildingName = { $regex: buildingName, $options: 'i' };
    }
    if (buildingLocation) {
      query.buildingLocation = { $regex: buildingLocation, $options: 'i' };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(query).populate('assignedTo');
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
// @access  Public
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo');
    if (lead) {
      res.status(200).json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private/Admin
exports.createLead = async (req, res) => {
  const { name, phoneNumber, leadSource, buildingName, buildingLocation, status, assignedTo, notes, nextPaymentDate } = req.body;

  try {
    const lead = await Lead.create({
      name,
      phoneNumber,
      leadSource,
      buildingName,
      buildingLocation,
      status,
      assignedTo,
      notes,
      nextPaymentDate,
    });

    if (lead) {
      res.status(201).json(lead);
    } else {
      res.status(400).json({ message: 'Invalid lead data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private/Admin
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      lead.name = req.body.name || lead.name;
      lead.phoneNumber = req.body.phoneNumber || lead.phoneNumber;
      lead.leadSource = req.body.leadSource || lead.leadSource;
      lead.buildingName = req.body.buildingName || lead.buildingName;
      lead.buildingLocation = req.body.buildingLocation || lead.buildingLocation;
      lead.status = req.body.status || lead.status;
      lead.assignedTo = req.body.assignedTo || lead.assignedTo;
      lead.notes = req.body.notes || lead.notes;
      lead.nextPaymentDate = req.body.nextPaymentDate || lead.nextPaymentDate;

      const updatedLead = await lead.save();
      res.status(200).json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      await lead.deleteOne();
      res.status(200).json({ message: 'Lead removed' });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
