const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

const bcrypt = require('bcryptjs');
const Building = require('./models/Building');
const Unit = require('./models/Unit');
const Lead = require('./models/Lead');
const connectDB = require('./config/db');

dotenv.config({ path: './backend/.env' });
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const users = await Promise.all([
      {
        fullName: 'Admin User',
        email: 'admin@example.com',
        phone: '+254700000000',
        password: await bcrypt.hash('Abuhureira12', 10),
        isAdmin: true,
      },
    ]);
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0];

    await Building.deleteMany();
    await Unit.deleteMany();
    await Lead.deleteMany();

    

    const buildingData = [
      {
        name: 'Sunrise Apartments',
        address: '123 Ngong Road, Nairobi',
        gps: { lat: -1.2921, lng: 36.8219 },
        owner: 'Sunrise Holdings Ltd.',
        staffId: adminUser._id,
        notes: 'Main gate is green. Intercom at the entrance.',
        images: ['/images/sunrise_apartments_1.jpg'],
        providers: ['Safaricom', 'Zuku'],
        totalUnits: 2,
        active: true,
      },
      {
        name: 'Westview Towers',
        address: '456 Waiyaki Way, Nairobi',
        gps: { lat: -1.2833, lng: 36.8167 },
        owner: 'Westview Properties',
        staffId: adminUser._id,
        notes: 'Parking available at the back.',
        images: [],
        providers: ['Mediatek', 'JTL'],
        totalUnits: 1,
        active: true,
      },
    ];
    const createdBuildings = await Building.insertMany(buildingData);
    const bld101 = createdBuildings[0];
    const bld102 = createdBuildings[1];

    const unitData = [
      {
        buildingId: bld101._id,
        label: 'A1',
        visitStatus: 'Visited',
        provider: 'Safaricom',
        comments: 'Tenant is happy with the service.',
        active: true,
      },
      {
        buildingId: bld101._id,
        label: 'A2',
        visitStatus: 'Not Visited',
        provider: null,
        comments: 'No answer at the door.',
        active: true,
      },
      {
        buildingId: bld102._id,
        label: 'B1',
        visitStatus: 'Visited',
        provider: 'Mediatek',
        comments: 'Interested in upgrading their package.',
        active: true,
      },
    ];
    const createdUnits = await Unit.insertMany(unitData);
    const unitA1_101 = createdUnits[0];
    const unitA2_101 = createdUnits[1];
    const unitB1_102 = createdUnits[2];

    const leadData = [
      {
        fullName: 'Alice Wonder',
        phoneNumber: '+254711111111',
        propertyId: bld101._id,
        unitId: unitA2_101._id,
        source: 'whatsapp',
        status: 'new',
        assignedTo: adminUser._id,
        notes: 'Reached out via WhatsApp after seeing a poster.',
        createdAt: new Date('2025-08-10T10:00:00Z'),
      },
      {
        fullName: 'Bob Builder',
        phoneNumber: '+254733333333',
        propertyId: bld102._id,
        unitId: unitB1_102._id,
        source: 'manual',
        status: 'in_progress',
        assignedTo: adminUser._id,
        notes: 'Met during a door-to-door visit. Wants a call back next week.',
        createdAt: new Date('2025-08-09T14:30:00Z'),
      },
      {
        fullName: 'Charlie Chaplin',
        phoneNumber: '+254744444444',
        propertyId: bld101._id,
        unitId: null,
        source: 'sms',
        status: 'converted',
        assignedTo: adminUser._id,
        notes: 'Converted to a paying customer.',
        createdAt: new Date('2025-08-08T12:00:00Z'),
      },
    ];
    await Lead.insertMany(leadData);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Building.deleteMany();
    await Unit.deleteMany();
    await Lead.deleteMany();

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