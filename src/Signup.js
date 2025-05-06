
import React, { useState } from 'react';
import './Dashboard.css';
import logo from './logo.png';

function Signup({ onSignup, toggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onSignup(email);
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed.');
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={handleSignup} className="form">
        <h2>Create an Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          name="new-password"
          autoComplete="new-password"
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{' '}
          <button type="button" onClick={toggleForm} className="toggle-button">Login</button>
        </p>
      </form>
    </div>
  );
}

export default Signup;
