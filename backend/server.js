require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Import routes
const leadRoutes = require('./routes/leadRoutes');
const staffRoutes = require('./routes/staffRoutes');
const referralRoutes = require('./routes/referralRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const unitRoutes = require('./routes/unitRoutes');

// Mount unit routes under building routes
buildingRoutes.use('/:buildingId/units', unitRoutes);

const payoutRoutes = require('./routes/payoutRoutes');
const commissionRoutes = require('./routes/commissionRoutes');
const adminRoutes = require('./routes/adminRoutes'); // For authentication

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

// Basic route
app.get('/', (req, res) => {
  res.send('Referral and Commission System Backend API');
});

// Mount routes
app.use('/api/leads', leadRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/payouts', payoutRoutes);
app.use('/api/commissions', commissionRoutes);
app.use('/api/admin', adminRoutes); // Admin routes for authentication

// Simple GET routes for testing wiring
app.get('/api/test/agents', (req, res) => res.json({ message: 'GET /api/agents endpoint is wired.' }));
app.get('/api/test/referrals', (req, res) => res.json({ message: 'GET /api/referrals endpoint is wired.' }));
app.get('/api/test/buildings', (req, res) => res.json({ message: 'GET /api/buildings endpoint is wired.' }));
app.get('/api/test/units', (req, res) => res.json({ message: 'GET /api/units endpoint is wired.' }));
app.get('/api/test/payouts', (req, res) => res.json({ message: 'GET /api/payouts endpoint is wired.' }));
app.get('/api/test/commissions', (req, res) => res.json({ message: 'GET /api/commissions endpoint is wired.' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});