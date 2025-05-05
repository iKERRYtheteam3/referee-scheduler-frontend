
import React, { useState } from 'react';

function Signup({ onLogin, switchToLogin }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'referee',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.token) {
      onLogin(data.token);
    } else {
      alert(data.msg || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input name="name" type="text" autoComplete="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" autoComplete="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" autoComplete="new-password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange} required>
        <option value="referee">Referee</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Create Account</button>
      <p>Already have an account? <button type="button" onClick={switchToLogin}>Login</button></p>
    </form>
  );
}

export default Signup;
