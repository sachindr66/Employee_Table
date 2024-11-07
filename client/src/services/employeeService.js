import axios from 'axios';

const apiUrl = 'http://localhost:5006/api/employees';

// Fetch all employees
const getAllEmployees = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Fetch a single employee by ID
const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    throw error;
  }
};

const createEmployee = async (employee) => {
  try {
    const response = await axios.post(apiUrl, employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error; 
  }
};

const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
