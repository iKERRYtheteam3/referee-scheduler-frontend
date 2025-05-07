
import React, { useState } from 'react';
import './Form.css';
import logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://referee-scheduler-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        navigate('/');
      } else {
        const error = await res.text();
        console.error('Signup failed:', error);
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="form-container">
      <img src={logo} alt="Logo" className="form-logo" />
      <form className="form-box" onSubmit={onSubmit}>
        <h2>Create Account</h2>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={onChange}
          required
        />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={onChange}
          /> Request Admin Access
        </label>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/">Log in</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
