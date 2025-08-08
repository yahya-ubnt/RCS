// backend/routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { protect, admin } = require('../middlewares/protect');

// Define staff routes
router.route('/').get(staffController.getAllStaff).post(protect, admin, staffController.createStaff);
router.route('/:id').get(staffController.getStaffById).put(protect, admin, staffController.updateStaff).delete(protect, admin, staffController.deleteStaff);

module.exports = router;