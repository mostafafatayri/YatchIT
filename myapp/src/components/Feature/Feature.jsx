import React from 'react';
import './Feature.scss';

const Hero = () => {
  return (
    <div className="hero">
      <div className="filter-form">
        <h2>Enjoy your trip</h2>
        <h1>DISCOVER THE NEW WORLD</h1>
        <p>Compare prices from 200+ booking sites to help you find the lowest price on the right hotel for you.</p>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Location" required />
          </div>
          <div className="input-group">
            <input type="date" placeholder="Departure" required />
          </div>
          <div className="input-group">
            <input type="date" placeholder="Return" required />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
