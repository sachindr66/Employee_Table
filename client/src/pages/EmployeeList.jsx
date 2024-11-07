import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getAllEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await employeeService.deleteEmployee(id);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(order);
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortColumn) {
      const aVal = a[sortColumn] || '';
      const bVal = b[sortColumn] || '';
      const compareVal = sortOrder === 'asc' ? 1 : -1;

      if (sortColumn === 'createdDate') {
        return compareVal * (new Date(aVal) - new Date(bVal));
      } else if (typeof aVal === 'string') {
        return compareVal * aVal.localeCompare(bVal);
      } else {
        return compareVal * (aVal > bVal ? 1 : -1);
      }
    }
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.designation.toLowerCase().includes(query) ||
      employee._id.toString().toLowerCase().includes(query) ||
      employee.mobile.toLowerCase().includes(query) ||
      new Date(employee.createdDate).toLocaleDateString().toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Employee List</h1>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
        <Link to="/employees/create" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mb-4 md:mb-0">
          Create Employee
        </Link>
        <input
          type="text"
          placeholder="Search by Name, Email, ID, Phone, Date, Designation"
          className="border rounded px-3 py-2 w-full md:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('_id')}>
                Unique Id {sortColumn === '_id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>
                Name {sortColumn === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('email')}>
                Email {sortColumn === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-6 text-left">Mobile No</th>
              <th className="py-3 px-6 text-left">Designation</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-left">Course</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('createdDate')}>
                Create Date {sortColumn === 'createdDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{employee._id}</td>
                <td className="py-3 px-6 text-left">
                  <img
                    src={employee.image || 'https://via.placeholder.com/50'}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-6 text-left">{employee.name}</td>
                <td className="py-3 px-6 text-left text-blue-500 hover:underline">
                  <a href={`mailto:${employee.email}`}>{employee.email}</a>
                </td>
                <td className="py-3 px-6 text-left">{employee.mobile}</td>
                <td className="py-3 px-6 text-left">{employee.designation}</td>
                <td className="py-3 px-6 text-left">{employee.gender}</td>
                <td className="py-3 px-6 text-left">{employee.course}</td>
                <td className="py-3 px-6 text-left">{new Date(employee.createdDate).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-left">
                  <Link to={`/employees/edit/${employee._id}`} className="text-blue-500 hover:underline mr-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(employee._id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredEmployees.length === 0 && (
        <div className="text-center mt-4 text-gray-500">No employees match your search</div>
      )}
    </div>
  );
}

export default EmployeeList;
