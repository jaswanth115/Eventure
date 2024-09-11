import React, { useState } from 'react';
import './Home.css'; // Import the CSS file

function Home() {
  const [showCard, setShowCard] = useState(true);

  const handleButtonClick = (role) => {
    // Logic for role selection
    console.log(`${role} selected`);

    // Hide the card and navigate to the home page or perform other actions
    setShowCard(false);
    // You can add navigation logic here if needed
    // e.g., navigate('/home');
  };

  return (
    <div className="home-container">
      {showCard && (
        <div className="popup-card">
          <div className="popup-content">
            <h2>Welcome!</h2>
            <p>Select your role:</p>
            <button className="btn btn-primary" onClick={() => handleButtonClick('Event Organizers')}>
              Event Organizers
            </button>
            <button className="btn btn-secondary" onClick={() => handleButtonClick('Event Finders')}>
              Event Finders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
