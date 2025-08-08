const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Staff = require('./models/Staff');
const bcrypt = require('bcryptjs');
const Building = require('./models/Building');
const Unit = require('./models/Unit');
const Lead = require('./models/Lead');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // await Staff.deleteMany();
    // await Building.deleteMany();
    // await Unit.deleteMany();
    // await Lead.deleteMany();

    const staffData = await Promise.all([
      {
        _id: 'staff_001',
        fullName: 'Admin User',
        email: 'admin@example.com',
        phone: '+254700000000',
        password: await bcrypt.hash('password123', 10),
        role: 'Agent',
        status: 'Active',
      },
      {
        _id: 'staff_002',
        fullName: 'John Mwangi',
        email: 'john.mwangi@example.com',
        phone: '+254712345678',
        password: await bcrypt.hash('password123', 10),
        role: 'Caretaker',
        status: 'Active',
      },
      {
        _id: 'staff_003',
        fullName: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+254787654321',
        password: await bcrypt.hash('password123', 10),
        role: 'Agent',
        status: 'Active',
      },
      {
        _id: 'staff_004',
        fullName: 'Peter Jones',
        email: 'peter.jones@example.com',
        phone: '+254722222222',
        password: await bcrypt.hash('password123', 10),
        role: 'Agent',
        status: 'Inactive',
      },
    ]);
    await Staff.insertMany(staffData);

    const buildingData = [
      {
        _id: 'bld_101',
        name: 'Sunrise Apartments',
        address: '123 Ngong Road, Nairobi',
        gps: { lat: -1.2921, lng: 36.8219 },
        owner: 'Sunrise Holdings Ltd.',
        staffId: 'staff_001',
        staffName: 'John Mwangi',
        staffPhone: '+254712345678',
        notes: 'Main gate is green. Intercom at the entrance.',
        images: ['/images/sunrise_apartments_1.jpg'],
        providers: ['Safaricom', 'Zuku'],
        totalUnits: 2,
        active: true,
      },
      {
        _id: 'bld_102',
        name: 'Westview Towers',
        address: '456 Waiyaki Way, Nairobi',
        gps: { lat: -1.2833, lng: 36.8167 },
        owner: 'Westview Properties',
        staffId: 'staff_002',
        staffName: 'Jane Doe',
        staffPhone: '+254787654321',
        notes: 'Parking available at the back.',
        images: [],
        providers: ['Mediatek', 'JTL'],
        totalUnits: 1,
        active: true,
      },
    ];
    await Building.insertMany(buildingData);

    const unitData = [
      {
        _id: 'unit_A1_101',
        buildingId: 'bld_101',
        label: 'A1',
        visitStatus: 'Visited',
        provider: 'Safaricom',
        comments: 'Tenant is happy with the service.',
        active: true,
      },
      {
        _id: 'unit_A2_101',
        buildingId: 'bld_101',
        label: 'A2',
        visitStatus: 'Not Visited',
        provider: null,
        comments: 'No answer at the door.',
        active: true,
      },
      {
        _id: 'unit_B1_102',
        buildingId: 'bld_102',
        label: 'B1',
        visitStatus: 'Visited',
        provider: 'Mediatek',
        comments: 'Interested in upgrading their package.',
        active: true,
      },
    ];
    await Unit.insertMany(unitData);

    const leadData = [
      {
        _id: 'lead_001',
        fullName: 'Alice Wonder',
        phone: '+254711111111',
        propertyId: 'bld_101',
        unitId: 'unit_A2_101',
        source: 'whatsapp',
        status: 'new',
        assignedTo: 'staff_002',
        notes: 'Reached out via WhatsApp after seeing a poster.',
        createdAt: new Date('2025-08-10T10:00:00Z'),
      },
      {
        _id: 'lead_002',
        fullName: 'Bob Builder',
        phone: '+254733333333',
        propertyId: 'bld_102',
        unitId: 'unit_B1_102',
        source: 'manual',
        status: 'in_progress',
        assignedTo: 'staff_002',
        notes: 'Met during a door-to-door visit. Wants a call back next week.',
        createdAt: new Date('2025-08-09T14:30:00Z'),
      },
      {
        _id: 'lead_003',
        fullName: 'Charlie Chaplin',
        phone: '+254744444444',
        propertyId: 'bld_101',
        unitId: null,
        source: 'sms',
        status: 'converted',
        assignedTo: 'staff_003',
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
    // await Staff.deleteMany();
    // await Building.deleteMany();
    // await Unit.deleteMany();
    // await Lead.deleteMany();

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