import React, { useEffect, useState } from 'react';
import hloSvg from './hlo.svg';
import './demo.css';  // Make sure to include your CSS file for styling
import './Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [clientSeed, setClientSeed] = useState('');
  const [revealedCells, setRevealedCells] = useState([]);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningShown, setWarningShown] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const demoUser = sessionStorage.getItem('demouser');

    if (!loggedIn) {
      window.location.href = '/';
    } else if (demoUser === 'false' && loggedIn === 'true') {
      window.location.href = 'Demo';
    } else {
      setIsLoggedIn(true);
    }

    const expirationTime = sessionStorage.getItem('expirationTime');
    if (expirationTime) {
      const interval = setInterval(() => {
        const timeLeft = calculateTimeLeft(expirationTime);
        if (timeLeft <= 0) {
          sessionStorage.removeItem('loggedIn');
          window.location.href = '/';
        } else {
          setTimeLeft(formatTimeLeft(timeLeft));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const calculateTimeLeft = (expirationTime) => {
    const currentTime = new Date().getTime();
    return expirationTime - currentTime;
  };

  const formatTimeLeft = (timeLeft) => {
    const minutes = Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(timeLeft % (1000 * 60) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn');
    window.location.href = '/';
  };

  const handleRevealMine = () => {
    const cellNum = parseInt(cellNumber);
    if (cellNum < 1 || cellNum > 25) {
      alert('Please enter a number between 1 and 25 for the Mine count.');
      return;
    }
    if (clientSeed.length < 10) {
      alert('Please enter a valid active client ID.');
      return;
    }
    if (cellNum > 2 && !warningShown) {
      setShowWarningModal(true);
      setWarningShown(true);
      return;
    }
    revealMine(cellNum);
  };

  const revealMine = (cellNum) => {
    if (revealedCells.length === 25 - cellNum) {
      setRevealedCells([]);
      setCellNumber('');
      setClientSeed('');
      alert('Congratulations! You have made a profit!');
      window.location.reload(); // Refresh the page
    } else {
      let randomCell;
      do {
        randomCell = Math.floor(Math.random() * 25);
      } while (revealedCells.includes(randomCell));

      setRevealedCells([...revealedCells, randomCell]);
    }
  };

  const closeModal = () => {
    setShowWarningModal(false);
    handleRevealMine();
  };

  const handleStop = () => {
    alert('You have stopped the game. Congratulations! You have made a profit! ');
    window.location.reload(); // Refresh the page
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container">
      <h1>Mine Game</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="timer">Session Expires In: <span>{timeLeft}</span></div>
      <div className="info-text">
        <marquee>Please read provided strategy. We recommend using only one mine and placing low bets. If you take risks and do not follow our strategy, you may lose your money, and we are not responsible for any losses incurred.</marquee>
      </div>
      <div className="main-container">
        <div className="input-container">
          <label htmlFor="mines">Number of mines:</label>
          <input
            type="number"
            id="cell"
            min="1"
            max="25"
            value={cellNumber}
            onChange={(e) => setCellNumber(e.target.value)}
            placeholder="Enter cell number (1-25)"
          />
          <label htmlFor="seed">Active Client Seed:</label>
          <input
            type="text"
            id="seed"
            value={clientSeed}
            onChange={(e) => setClientSeed(e.target.value)}
            placeholder="Enter active client seed"
            maxLength="20"
          />
          <button onClick={handleRevealMine} className="reveal-button">Reveal Mine</button>
          <button onClick={handleStop} className="reveal-button">Stop</button> {/* Attach the handleStop function */}
        </div>
        <div className="mine-container">
          {Array.from({ length: 25 }).map((_, index) => (
            <div key={index} className={`minecell ${revealedCells.includes(index) ? 'revealed' : ''}`}>
              {revealedCells.includes(index) && (
                <img src={hloSvg} alt="Mine" height="50px" className="reveal-animation" />
              )}
            </div>
          ))}
        </div>
      </div>
      {showWarningModal && (
        <div id="warningModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowWarningModal(false)}>&times;</span>
            <h2>Warning!</h2>
            <p>You are selecting a high number of mines. This strategy might not work!</p>
            <button id="proceedButton" onClick={closeModal}>Proceed Anyway</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;



