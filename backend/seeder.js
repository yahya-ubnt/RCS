const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Agent = require('./models/Agent');
const Referral = require('./models/Referral');
const Building = require('./models/Building');
const Unit = require('./models/Unit');
const Commission = require('./models/Commission');
const Payout = require('./models/Payout');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Agent.deleteMany();
    await Referral.deleteMany();
    await Building.deleteMany();
    await Unit.deleteMany();
    await Commission.deleteMany();
    await Payout.deleteMany();

    const adminAgent = await Agent.create({
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '1234567890',
      password: 'password123', // This will be hashed by the pre-save hook
      isAdmin: true,
    });

    const agents = [];
    for (let i = 1; i <= 5; i++) {
      agents.push(await Agent.create({
        name: `Agent ${i}`,
        email: `agent${i}@example.com`,
        phone: `071234567${i}`,
        password: 'password123',
        isAdmin: false,
      }));
    }

    const buildings = [];
    for (let i = 1; i <= 3; i++) {
      buildings.push(await Building.create({
        name: `Building ${i}`,
        address: `123 Main St, Building ${i}`,
        location: { latitude: 1.2921 + i * 0.01, longitude: 36.8219 + i * 0.01 },
      }));
    }

    const units = [];
    for (const building of buildings) {
      for (let i = 1; i <= 2; i++) {
        units.push(await Unit.create({
          building: building._id,
          unitNumber: `A${i}`,
          status: 'available',
        }));
      }
    }

    const referrals = [];
    for (let i = 0; i < 5; i++) {
      referrals.push(await Referral.create({
        agent: agents[i % agents.length]._id,
        referredName: `Referred Client ${i + 1}`,
        referredContact: `072233445${i}`,
        status: i % 2 === 0 ? 'approved' : 'pending',
      }));
    }

    const commissions = [];
    for (const referral of referrals) {
      if (referral.status === 'approved') {
        commissions.push(await Commission.create({
          referral: referral._id,
          agent: referral.agent,
          amount: Math.floor(Math.random() * 1000) + 500, // Random amount between 500 and 1500
          status: 'pending',
        }));
      }
    }

    const payouts = [];
    for (const agent of agents) {
      payouts.push(await Payout.create({
        agent: agent._id,
        amount: Math.floor(Math.random() * 5000) + 1000, // Random amount between 1000 and 6000
        status: 'pending',
      }));
    }

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Agent.deleteMany();
    await Referral.deleteMany();
    await Building.deleteMany();
    await Unit.deleteMany();
    await Commission.deleteMany();
    await Payout.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
