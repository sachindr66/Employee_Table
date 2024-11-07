// createUser.js
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB:', error));

const addUser = async () => {
  const password = 'password123'; // Replace with a secure password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ userName: 'admin', password: hashedPassword });
  await newUser.save();
  console.log('Admin user created with hashed password');
  mongoose.connection.close();
};

addUser();
