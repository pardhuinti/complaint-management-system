const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Department = require('../models/Department');
const Complaint = require('../models/Complaint');
const Notification = require('../models/Notification');
const connectDB = require('../config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing database collections...');
    await User.deleteMany();
    await Department.deleteMany();
    await Complaint.deleteMany();
    await Notification.deleteMany();

    console.log('Seeding initial Departments...');

    await Department.insertMany([
      {
        name: 'Computer Science & Engineering',
        code: 'CSE',
        headName: 'Dr. Alan Turing',
        headEmail: 'cse_head@campus.edu',
      },
      {
        name: 'Electrical Engineering',
        code: 'ECE',
        headName: 'Dr. Nikola Tesla',
        headEmail: 'ece_head@campus.edu',
      },
      {
        name: 'Mechanical Engineering',
        code: 'MECH',
        headName: 'Dr. James Watt',
        headEmail: 'mech_head@campus.edu',
      },
      {
        name: 'Hostel Management',
        code: 'HOSTEL',
        headName: 'Chief Warden',
        headEmail: 'hostel@campus.edu',
      },
      {
        name: 'IT Infrastructure & Wi-Fi',
        code: 'IT',
        headName: 'SysAdmin Team',
        headEmail: 'it_support@campus.edu',
      },
      {
        name: 'Campus Facilities & Cleanliness',
        code: 'ADMIN',
        headName: 'Estate Officer',
        headEmail: 'estate@campus.edu',
      },
    ]);

    console.log('Creating Default Admin Account...');

    await User.create({
      name: 'Campus System Administrator',
      email: 'admin@campus.edu',
      password: 'adminPassword123',
      role: 'admin',
      department: 'Administration',
      phone: '+1 800 555 0199',
    });

    console.log('------------------------------------');
    console.log('Database Seeded Successfully!');
    console.log('------------------------------------');
    console.log('Default Admin Account');
    console.log('Email: admin@campus.edu');
    console.log('Password: adminPassword123');
    console.log('------------------------------------');
    console.log('Students must register using their own email and password.');
    console.log('------------------------------------');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();