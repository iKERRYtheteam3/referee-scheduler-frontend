
import React, { useState } from 'react';
import './Form.css';
import logo from './assets/logo.png';

const Signup = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Signup failed');
      alert('Account created! You can now login.');
      onSwitchToLogin();
    } catch (err) {
      console.error('Signup error:', err);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <img src={logo} alt="Logo" className="form-logo" />
      <form onSubmit={onSubmit} className="form-box">
        <h2>Create Account</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          name="password"
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{' '}
          <span className="toggle-link" onClick={onSwitchToLogin}>
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
