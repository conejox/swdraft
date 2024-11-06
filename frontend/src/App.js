import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [gameFull, setGameFull] = useState(false);

  useEffect(() => {
    socket.on('updatePlayers', (players) => {
      setPlayers(players);
    });

    socket.on('gameFull', () => {
      setGameFull(true);
    });

    return () => {
      socket.off('updatePlayers');
      socket.off('gameFull');
    };
  }, []);

  const joinGame = () => {
    if (name) {
      socket.emit('joinGame', name);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multiplayer Card  alberto</h1>
        {gameFull ? (
          <p>The game is full. Please try again later.</p>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Enter your name madafaca"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={joinGame}>Join Game</button>
          </div>
        )}
        <h2>Players:</h2>
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
