import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Employee Management Dashboard</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link to="/employees" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Employee List
        </Link>
        <Link to="/employees/create" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add New Employee
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
