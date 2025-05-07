
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import logo from './assets/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const data = await response.json();
        console.error('Login failed:', data);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="form-container">
      <img src={logo} alt="Logo" className="form-logo" />
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <span className="form-toggle" onClick={() => navigate('/signup')}>Sign up</span></p>
    </div>
  );
}

export default Login;
