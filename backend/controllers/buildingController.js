// backend/controllers/buildingController.js
const Building = require('../models/Building');

// @desc    Get all buildings
// @route   GET /api/buildings
// @access  Public
exports.getAllBuildings = async (req, res) => {
  try {
    const buildings = await Building.find({});
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single building by ID
// @route   GET /api/buildings/:id
// @access  Public
exports.getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (building) {
      res.status(200).json(building);
    } else {
      res.status(404).json({ message: 'Building not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new building
// @route   POST /api/buildings
// @access  Private/Admin
exports.createBuilding = async (req, res) => {
  const { name, address, location } = req.body;

  try {
    const building = await Building.create({
      name,
      address,
      location,
    });

    if (building) {
      res.status(201).json(building);
    } else {
      res.status(400).json({ message: 'Invalid building data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a building
// @route   PUT /api/buildings/:id
// @access  Private/Admin
exports.updateBuilding = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);

    if (building) {
      building.name = req.body.name || building.name;
      building.address = req.body.address || building.address;
      building.location = req.body.location || building.location;

      const updatedBuilding = await building.save();
      res.status(200).json(updatedBuilding);
    } else {
      res.status(404).json({ message: 'Building not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a building
// @route   DELETE /api/buildings/:id
// @access  Private/Admin
exports.deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);

    if (building) {
      await building.deleteOne();
      res.status(200).json({ message: 'Building removed' });
    } else {
      res.status(404).json({ message: 'Building not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
