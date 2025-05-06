
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const handleLogin = (email) => {
    localStorage.setItem('userEmail', email);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={userEmail ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
        <Route path="/dashboard" element={userEmail ? <Dashboard userEmail={userEmail} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
