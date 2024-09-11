import React, { useState } from 'react';
import './Card.css';

function Card({ onClose, onSelect }) {
  return (
    <div className="card-backdrop" onClick={onClose}>
      <div className="card-container">
        <h3 className="card-title">Choose Your Role</h3>
        <div className="button-group">
          <button className="btn rounded-button" onClick={() => onSelect('Event Organizers')}>
            Event Organizers
          </button>
          <button className="btn rounded-button" onClick={() => onSelect('Event Finders')}>
            Event Finders
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
