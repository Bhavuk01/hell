import React, { useState, useEffect } from 'react';
import keys from './keys'; // Import the keys.js file
import './Beta';

const Login = () => {
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    if (isLoggedIn) {
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    let usedPasswords = JSON.parse(sessionStorage.getItem('usedPasswords')) || {};
    const userId = sessionStorage.getItem('userId') || 'defaultUserId'; // Assuming user ID for tracking purposes
  
    // Check if the password has been used before for this user
    if (usedPasswords[userId] && usedPasswords[userId].includes("demotesting")) {
      window.location.href = '/'; // Redirect to root page if "demotesting" is used before
      return;
    }
  
    // Check if the password matches "demotesting" and mark it as used for this user
    if (password === 'demotesting') {
      // Initialize the user key if not already present
      if (!usedPasswords[userId]) {
        usedPasswords[userId] = [];
      }
  
      usedPasswords[userId].push("demotesting"); // Store the password used
  
      sessionStorage.setItem('usedPasswords', JSON.stringify(usedPasswords));
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'Demo'; // Redirect to Demo page
      return;
    }
  
    // Check if the password matches any key in the keys.js file
    if (keys.includes(password)) {
      sessionStorage.setItem('loggedIn', 'true');
  
      // Initialize the user key if not already present
      if (!usedPasswords[userId]) {
        usedPasswords[userId] = [];
      }
  
      usedPasswords[userId].push(password); // Store the password used
      sessionStorage.setItem('usedPasswords', JSON.stringify(usedPasswords));
      window.location.href = 'Beta'; // Redirect to Beta page
      return;
    }
  
    // Handle case when the entered key is not valid
    alertWithLink('Invalid Key. Please try again.');
  };

  // Helper function to handle alerts with redirect link
  const alertWithLink = (message) => {
    alert(`${message} Invalid, please buy from Instagram.`);
    setTimeout(() => {
      window.location.href = 'https://www.instagram.com/';
    }, 5000);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleProceed = () => {
    if (agree) {
      window.location.href = 'index.html';
    } else {
      alert('Please agree to the terms and conditions to proceed.');
    }
  };

  // Function to start the timer
  const startTimer = (duration) => {
    let timeLeft = duration;
    const interval = setInterval(() => {
      timeLeft--;
      setRemainingTime(timeLeft);
      if (timeLeft === 0) {
        clearInterval(interval);
        window.location.href = '/';
      }
    }, 1000);
  };

  // Format the remaining time into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  };

  return (
    <div className="main">
      <div className="info-text">
        <p>Please wait 1-2 minutes as it may take some time to validate your key due to a high volume of user logins right now.</p>
      </div>
      {remainingTime !== null && (
        <div className="timer">
          Timer: {formatTime(remainingTime)}
        </div>
      )}
      <form className="form" id="loginForm" onSubmit={handleSubmit}>
        <div className="form-title"><span>Login in to your</span></div>
        <div className="title-2"><span>Account</span></div>
        <div className="input-container"></div>
        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>
        <div className="input-container">
          <input className="input-pwd" type="password" id="password" placeholder="Enter Key" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submit">
          <span className="sign-text">Sign in</span>
        </button>
        <p className="signup-link">
          No Key? <a href="https://www.instagram.com/stake.hacks/" className="up">buy Now!</a>
        </p>
      </form>
      {modalVisible && (
        <div id="noticeModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Disclaimer Notice</h2>
            <p>By using this service, you acknowledge and agree that:</p>
            <ul>
              <li>Our service provides a random prediction tool for entertainment and educational purposes only. We do not guarantee any accuracy or outcomes from the use of this tool.</li>
              <li>You understand and accept that gambling involves risk, and you may face both losses and wins based on luck. Our tool does not provide any guarantees of profits.</li>
              <li>We strongly advise users to use caution and discretion while using the tool. It is your responsibility to manage your betting activities and funds wisely.</li>
              <li>It is recommended to read and understand our provided strategy guide before using the tool. Click <a href="https://minehack.onrender.com/FAQ.html">here</a> to access the strategy guide.</li>
              <li>We recommend limiting your bets to a maximum of 10 Rs to minimize potential losses. We specifically advise against high-stakes betting as it may result in significant financial loss.</li>
              <li>We advise users to bet conservatively, preferably 1 Rs with 1 or 2 mines. Betting beyond this recommendation is at your own risk.</li>
              <li>We are not responsible for any financial losses incurred while using our service. The use of our tool is entirely at your own risk, and we disclaim any liability for losses or damages.</li>
              <li>We reserve the right to modify or terminate the service at any time without prior notice. We also reserve the right to restrict or terminate access to users who violate these terms and conditions.</li>
              <li>By using our service, you agree to indemnify and hold harmless the service provider from any claims, losses, or damages arising out of or related to your use of the service.</li>
              <li>We do not endorse or encourage irresponsible gambling habits. Users are encouraged to gamble responsibly and seek help if they experience any gambling-related issues.</li>
            </ul>
            <label>
              <input type="checkbox" id="agreeCheckbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> I agree to the terms and conditions above.
            </label>
            <button id="proceedButton" onClick={handleProceed}>Proceed</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;



