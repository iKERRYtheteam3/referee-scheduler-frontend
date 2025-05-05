import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

function Signup({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Signup failed');
      const data = await response.json();
      onLogin(data.token);
    } catch (error) {
      alert('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <img src="./logo.png" alt="Logo" className="logo" />
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Signup;