import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const RequireAuth = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;