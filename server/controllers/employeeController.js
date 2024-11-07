const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  try {
    const existingEmail = await Employee.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const existingMobile = await Employee.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }

    const employee = new Employee({ name, email, mobile, designation, gender, course });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getEmployees = async (req, res) => {
  try {
      const employees = await Employee.find();
      res.json(employees);
  } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      res.json(employee);
  } catch (error) {
      console.error('Error fetching employee by ID:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(employee);
  } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ message: 'Employee deleted' });
  } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
