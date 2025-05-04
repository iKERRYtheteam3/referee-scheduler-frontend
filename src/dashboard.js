import React, { useEffect, useState } from 'react';

function Dashboard({ token, onLogout }) {
  const [games, setGames] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [newGame, setNewGame] = useState({
    date: '', time: '', location: '', teams: '', level: '', refsNeeded: 1
  });

  useEffect(() => {
    fetch('https://referee-scheduler-backend.onrender.com/api/games', {
      headers: { 'x-auth-token': token },
    })
      .then(res => res.json())
      .then(data => setGames(data));

    fetch('https://referee-scheduler-backend.onrender.com/api/auth/me', {
      headers: { 'x-auth-token': token }
    })
      .then(res => res.json())
      .then(data => setUserRole(data.role));
  }, [token]);

  const handleSignup = async (id) => {
    const res = await fetch(`https://referee-scheduler-backend.onrender.com/api/games/${id}/signup`, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    if (res.ok) {
      alert('Signed up successfully!');
      setGames(games.map(g => g._id === id ? data : g));
    } else {
      alert(data.msg || 'Error signing up');
    }
  };

  const handleGameChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  const handleGameSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://referee-scheduler-backend.onrender.com/api/games', {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGame)
    });
    const data = await res.json();
    if (res.ok) {
      alert('Game created!');
      setGames([...games, data]);
      setNewGame({ date: '', time: '', location: '', teams: '', level: '', refsNeeded: 1 });
    } else {
      alert(data.msg || 'Error creating game');
    }
  };

  return (
    <div className="dashboard">
      <button onClick={onLogout}>Logout</button>
      <h2>Available Games</h2>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            {game.date} {game.time} - {game.teams} @ {game.location} [{game.assignedRefs.length}/{game.refsNeeded}]
            {userRole === 'referee' && <button onClick={() => handleSignup(game._id)}>Sign Up</button>}
          </li>
        ))}
      </ul>

      {userRole === 'admin' && (
        <>
          <h3>Create New Game</h3>
          <form onSubmit={handleGameSubmit}>
            <input name="date" placeholder="Date" value={newGame.date} onChange={handleGameChange} required />
            <input name="time" placeholder="Time" value={newGame.time} onChange={handleGameChange} required />
            <input name="location" placeholder="Location" value={newGame.location} onChange={handleGameChange} required />
            <input name="teams" placeholder="Teams" value={newGame.teams} onChange={handleGameChange} required />
            <input name="level" placeholder="Level" value={newGame.level} onChange={handleGameChange} required />
            <input name="refsNeeded" type="number" placeholder="Refs Needed" value={newGame.refsNeeded} onChange={handleGameChange} required />
            <button type="submit">Post Game</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Dashboard;
