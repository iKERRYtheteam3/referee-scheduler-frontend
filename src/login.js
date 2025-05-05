
import React, { useState } from 'react';

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      onLogin(data.token);
    } else {
      alert(data.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" name="email" autoComplete="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" name="password" autoComplete="current-password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <p>Don't have an account? <button type="button" onClick={switchToSignup}>Sign up here</button></p>
    </form>
  );
}

export default Login;
