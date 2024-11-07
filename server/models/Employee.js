const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, match: /^[0-9]{10}$/ },
  designation: { type: String, required: true },
  gender: { type: String, required: true, enum: ['M', 'F'] },
  course: { type: String, required: true },
  image: { type: String },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
