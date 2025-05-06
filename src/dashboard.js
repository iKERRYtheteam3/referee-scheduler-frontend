
import React, { useState } from 'react';
import './Dashboard.css';
import logo from './assets/logo.png';

const Dashboard = ({ userEmail, onLogout }) => {
  const [available, setAvailable] = useState(true);
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard">
      <img src={logo} alt="Logo" className="dashboard-logo" />
      <h2>Welcome, {userEmail}</h2>
      <button className="logout-btn" onClick={onLogout}>Logout</button>

      <section>
        <h3>Upcoming Games</h3>
        <ul>
          <li>May 10, 2025 - Soccer Match @ 2:00 PM</li>
          <li>May 12, 2025 - Basketball Game @ 4:30 PM</li>
        </ul>
      </section>

      <section>
        <h3>Availability</h3>
        <label>
          <input type="checkbox" checked={available} onChange={() => setAvailable(!available)} />
          Available for Games
        </label>
      </section>

      <section>
        <h3>Profile Information</h3>
        <input type="text" name="name" placeholder="Name" value={profile.name} onChange={handleProfileChange} />
        <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleProfileChange} />
        <input type="password" name="password" placeholder="Password" value={profile.password} onChange={handleProfileChange} />
        <button>Update Profile</button>
      </section>
    </div>
  );
};

export default Dashboard;
