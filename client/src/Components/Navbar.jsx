import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center container mx-auto">
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/employees" className="hover:text-gray-300">Employee List</Link>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
