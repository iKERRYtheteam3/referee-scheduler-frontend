
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import logo from './assets/logo.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const data = await response.json();
        console.error('Signup failed:', data);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="form-container">
      <img src={logo} alt="Logo" className="form-logo" />
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <span className="form-toggle" onClick={() => navigate('/login')}>Log in</span></p>
    </div>
  );
}

export default Signup;
