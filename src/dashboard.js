
import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [userEmail] = useState('referee@example.com'); // Placeholder for authenticated user
  const [available, setAvailable] = useState(true);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'referee@example.com',
    password: '********'
  });

  const [upcomingGames] = useState([
    { id: 1, date: '2025-05-10', time: '2:00 PM', location: 'Main Stadium' },
    { id: 2, date: '2025-05-12', time: '6:00 PM', location: 'East Field' },
    { id: 3, date: '2025-05-14', time: '4:00 PM', location: 'West Field' }
  ]);

  const [signedUpGames, setSignedUpGames] = useState([]);
  const [adminMessages] = useState([
    "All referees must confirm availability for Memorial Day weekend.",
    "Game rule updates have been posted in your email."
  ]);

  const [stats] = useState({
    totalGames: 4,
    hoursWorked: 8
  });

  const handleAvailabilityToggle = () => {
    setAvailable(prev => !prev);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleSignup = (game) => {
    if (!signedUpGames.find(g => g.id === game.id)) {
      setSignedUpGames(prev => [...prev, game]);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userEmail}</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <section>
        <h2>Availability</h2>
        <label>
          <input
            type="checkbox"
            checked={available}
            onChange={handleAvailabilityToggle}
          />
          {available ? 'Available for Games' : 'Not Available'}
        </label>
      </section>

      <section>
        <h2>Upcoming Games</h2>
        <ul>
          {upcomingGames.map((game) => (
            <li key={game.id}>
              {game.date} at {game.time} – {game.location}
              <button onClick={() => handleSignup(game)} style={{ marginLeft: '10px' }}>
                Sign Up
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Signed-Up Games</h2>
        <ul>
          {signedUpGames.map((game, index) => (
            <li key={index}>
              {game.date} at {game.time} – {game.location}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Admin Notes</h2>
        <ul>
          {adminMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Stats</h2>
        <p>Total Games Worked: {stats.totalGames}</p>
        <p>Total Hours: {stats.hoursWorked}</p>
      </section>

      <section>
        <h2>Profile Info</h2>
        <label>
          Name:
          <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={profile.password} onChange={handleProfileChange} />
        </label>
      </section>
    </div>
  );
};

export default Dashboard;
