// backend/controllers/leadController.js
const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Public
exports.getAllLeads = async (req, res) => {
  try {
    const { status, source, assignedTo, startDate, endDate, search } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }
    if (source) {
      query.source = source;
    }
    if (assignedTo) {
      query.assignedTo = assignedTo;
    }
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(query).populate('propertyId').populate('unitId').populate('assignedTo');
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
    const lead = await Lead.findById(req.params.id).populate('propertyId').populate('unitId').populate('assignedTo');
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
  const { fullName, phone, propertyId, unitId, source, status, assignedTo, notes } = req.body;

  try {
    const lead = await Lead.create({
      fullName,
      phone,
      propertyId,
      unitId,
      source,
      status,
      assignedTo,
      notes,
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
      lead.fullName = req.body.fullName || lead.fullName;
      lead.phone = req.body.phone || lead.phone;
      lead.propertyId = req.body.propertyId || lead.propertyId;
      lead.unitId = req.body.unitId || lead.unitId;
      lead.source = req.body.source || lead.source;
      lead.status = req.body.status || lead.status;
      lead.assignedTo = req.body.assignedTo || lead.assignedTo;
      lead.notes = req.body.notes || lead.notes;

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
