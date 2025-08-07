// backend/controllers/unitController.js
const Unit = require('../models/Unit');

// @desc    Get all units
// @route   GET /api/units
// @access  Public
exports.getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find({}).populate('building');
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single unit by ID
// @route   GET /api/units/:id
// @access  Public
exports.getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id).populate('building');
    if (unit) {
      res.status(200).json(unit);
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new unit
// @route   POST /api/units
// @access  Private/Admin
exports.createUnit = async (req, res) => {
  const { building, unitNumber, status } = req.body;

  try {
    const unit = await Unit.create({
      building,
      unitNumber,
      status,
    });

    if (unit) {
      res.status(201).json(unit);
    } else {
      res.status(400).json({ message: 'Invalid unit data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a unit
// @route   PUT /api/units/:id
// @access  Private/Admin
exports.updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (unit) {
      unit.building = req.body.building || unit.building;
      unit.unitNumber = req.body.unitNumber || unit.unitNumber;
      unit.status = req.body.status || unit.status;

      const updatedUnit = await unit.save();
      res.status(200).json(updatedUnit);
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a unit
// @route   DELETE /api/units/:id
// @access  Private/Admin
exports.deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (unit) {
      await unit.deleteOne();
      res.status(200).json({ message: 'Unit removed' });
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
