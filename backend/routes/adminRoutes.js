// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const Agent = require('../models/Agent'); // Assuming Agent model can also be an admin

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const agent = await Agent.findOne({ email });

  if (agent && (await bcrypt.compare(password, agent.password))) {
    res.json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      token: jwt.sign({ id: agent._id }, JWT_SECRET, { expiresIn: '1h' }),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
