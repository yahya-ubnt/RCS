// backend/routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { protect, admin } = require('../middlewares/protect');

// Define lead routes
router.route('/').get(leadController.getAllLeads).post(protect, admin, leadController.createLead);
router.route('/:id').get(leadController.getLeadById).put(protect, admin, leadController.updateLead).delete(protect, admin, leadController.deleteLead);

module.exports = router;
