
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'referee',
  });

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setForm({ name: '', email: '', password: '', role: 'referee' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login';
    const payload = isSignup
      ? form
      : { email: form.email, password: form.password };

    const res = await fetch(`https://referee-scheduler-backend.onrender.com${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.token) {
      onLogin(data.token);
    } else {
      alert(data.msg || (isSignup ? 'Signup failed' : 'Login failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      {isSignup && (
        <>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </>
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {isSignup && (
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="referee">Referee</option>
          <option value="admin">Admin</option>
        </select>
      )}
      <button type="submit">{isSignup ? 'Create Account' : 'Login'}</button>
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button type="button" onClick={toggleMode}>
          {isSignup ? 'Login here' : 'Sign up here'}
        </button>
      </p>
    </form>
  );
}

export default Login;
