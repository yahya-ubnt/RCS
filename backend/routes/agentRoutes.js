// backend/routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { protect, admin } = require('../middlewares/protect');

// Define agent routes
router.route('/').get(protect, admin, agentController.getAllAgents).post(protect, admin, agentController.createAgent);
router.route('/:id').get(protect, agentController.getAgentById).put(protect, admin, agentController.updateAgent).delete(protect, admin, agentController.deleteAgent);

module.exports = router;