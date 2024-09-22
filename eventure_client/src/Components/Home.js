import React from 'react';
import { useParams } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  const { name } = useParams();  // Extract name from URL parameters

  return (
    <div className="home-container">
      <h1>Hello {name}! Welcome to Home Page.</h1>
    </div>
  );
}

export default Home;
