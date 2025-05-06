
import React from 'react';
import './Dashboard.css';
import logo from './assets/logo.png';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <img src={logo} alt="Logo" className="dashboard-logo" />
      <h2>Welcome, user@example.com</h2>
      <button className="logout-btn">Logout</button>

      <section>
        <h3>Upcoming Games</h3>
        <ul>
          <li>May 10, 2025 - Soccer Match @ 2:00 PM</li>
        </ul>
      </section>

      <section>
        <h3>Availability</h3>
        <label>
          <input type="checkbox" />
          Available for Games
        </label>
      </section>

      <section>
        <h3>Profile Information</h3>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Update Profile</button>
      </section>
    </div>
  );
};

export default Dashboard;
