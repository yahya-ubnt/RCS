const express = require('express');
const router = express.Router();
const {
  getCaretakerAgents,
  getCaretakerAgentById,
  createCaretakerAgent,
  updateCaretakerAgent,
  deleteCaretakerAgent,
} = require('../controllers/caretakerAgentController');


router.route('/').get(getCaretakerAgents).post(createCaretakerAgent);
router
  .route('/:id')
  .get(getCaretakerAgentById)
  .put(updateCaretakerAgent)
  .delete(deleteCaretakerAgent);

module.exports = router;