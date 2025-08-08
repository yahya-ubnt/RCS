// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const Staff = require('../models/Staff'); // Assuming Staff model can also be an admin

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });

  // Check for user email
  const staff = await Staff.findOne({ email });
  console.log('Staff found:', staff ? staff.email : 'None');

  if (staff && (await staff.matchPassword(password))) {
    console.log('Password matched!');
    res.json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      token: jwt.sign({ id: staff._id }, JWT_SECRET, { expiresIn: '1h' }),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
