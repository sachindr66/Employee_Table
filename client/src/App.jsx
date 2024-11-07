import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeList from './pages/EmployeeList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const setAuth = (authStatus) => {
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      localStorage.removeItem('token');
    }
  };

  return (
    <Router>
      {isAuthenticated && <Navbar setAuth={setAuth} />}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login setAuth={setAuth} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/employees" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/" />} />
          <Route path="/employees/create" element={isAuthenticated ? <CreateEmployee /> : <Navigate to="/" />} />
          <Route path="/employees/edit/:id" element={isAuthenticated ? <EditEmployee /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
