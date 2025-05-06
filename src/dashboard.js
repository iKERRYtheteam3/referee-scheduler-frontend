
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ userEmail }) {
  const [availability, setAvailability] = useState(false);
  const [games, setGames] = useState([]);
  const [profile, setProfile] = useState({ name: '', email: userEmail, password: '' });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchAdminMessages();
  }, []);

  const fetchAdminMessages = async () => {
    try {
      const res = await fetch('https://referee-scheduler-backend.onrender.com/api/admin-messages');
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const toggleAvailability = () => {
    setAvailability(prev => !prev);
  };

  const signupForGame = (gameId) => {
    setGames(prev => [...prev, gameId]);
  };

  const saveProfile = async () => {
    try {
      const res = await fetch('https://referee-scheduler-backend.onrender.com/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      alert(data.success ? 'Profile saved!' : 'Error saving profile');
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userEmail}</h1>
      <button className="logout-btn" onClick={() => window.location.href = '/'}>Logout</button>

      <section>
        <h2>Admin Messages</h2>
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg.text} <small>({new Date(msg.date).toLocaleDateString()})</small></li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Referee Availability</h2>
        <button onClick={toggleAvailability}>
          {availability ? 'Mark as Unavailable' : 'Mark as Available'}
        </button>
      </section>

      <section>
        <h2>Profile Info</h2>
        <label>Name
          <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
        </label>
        <label>Email
          <input type="email" value={profile.email} disabled />
        </label>
        <label>Password
          <input type="password" value={profile.password} onChange={e => setProfile({ ...profile, password: e.target.value })} />
        </label>
        <button onClick={saveProfile}>Save Profile</button>
      </section>
    </div>
  );
}

export default Dashboard;
