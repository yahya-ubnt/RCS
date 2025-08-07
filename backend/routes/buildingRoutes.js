// backend/routes/buildingRoutes.js
const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/buildingController');
const { protect, admin } = require('../middlewares/protect');

// Define building routes
router.route('/').get(protect, buildingController.getAllBuildings).post(protect, admin, buildingController.createBuilding);
router.route('/:id').get(protect, buildingController.getBuildingById).put(protect, admin, buildingController.updateBuilding).delete(protect, admin, buildingController.deleteBuilding);

module.exports = router;