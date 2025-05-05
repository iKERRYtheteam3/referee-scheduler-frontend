import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'; // Ensure this logo is in the src/ folder

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      onLogin(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
      backgroundColor: '#f0f4f8',
      padding: '1rem'
    }}>
      <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '1.5rem' }} />
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{
          padding: '12px',
          backgroundColor: '#004aad',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}>
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;