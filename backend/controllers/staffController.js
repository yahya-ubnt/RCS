// backend/controllers/staffController.js
const Staff = require('../models/Staff');

// @desc    Get all staff
// @route   GET /api/staff
// @access  Public
exports.getAllStaff = async (req, res) => {
  try {
    const { role, status } = req.query;
    const query = {};

    if (role) {
      query.role = role;
    }

    if (status) {
      query.status = status;
    }

    const staff = await Staff.find(query);
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single staff by ID
// @route   GET /api/staff/:id
// @access  Public
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (staff) {
      res.status(200).json(staff);
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new staff
// @route   POST /api/staff
// @access  Private/Admin
exports.createStaff = async (req, res) => {
  const { fullName, phone, role, assignedBuildings, status } = req.body;

  try {
    const staffExists = await Staff.findOne({ phone });
    if (staffExists) {
      return res.status(400).json({ message: 'Staff with that phone number already exists' });
    }

    const staff = await Staff.create({
      fullName,
      phone,
      role,
      assignedBuildings,
      status,
    });

    if (staff) {
      res.status(201).json(staff);
    } else {
      res.status(400).json({ message: 'Invalid staff data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update staff
// @route   PUT /api/staff/:id
// @access  Private/Admin
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (staff) {
      staff.fullName = req.body.fullName || staff.fullName;
      staff.phone = req.body.phone || staff.phone;
      staff.role = req.body.role || staff.role;
      staff.assignedBuildings = req.body.assignedBuildings || staff.assignedBuildings;
      staff.status = req.body.status || staff.status;

      const updatedStaff = await staff.save();
      res.status(200).json(updatedStaff);
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete staff (soft delete)
// @route   DELETE /api/staff/:id
// @access  Private/Admin
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (staff) {
      staff.status = 'Inactive';
      await staff.save();
      res.status(200).json({ message: 'Staff deactivated' });
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
