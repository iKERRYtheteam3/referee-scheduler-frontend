
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="app-container">
      <img src="/logo.png" alt="Diamond Basketball Officials" className="logo" />
      {token ? (
        <Dashboard token={token} onLogout={handleLogout} />
      ) : isSignupMode ? (
        <Signup onLogin={handleLogin} switchToLogin={() => setIsSignupMode(false)} />
      ) : (
        <Login onLogin={handleLogin} switchToSignup={() => setIsSignupMode(true)} />
      )}
    </div>
  );
}

export default App;
