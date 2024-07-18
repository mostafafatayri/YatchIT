import React from 'react';
import './Ending.scss';

const Ending = () => {
  return (
    <div className="ending">
      <div className="section">
        <div className="content">
          <h2>Your Adventure, Our Commitment</h2>
          <p>Discover and book the perfect boat for your dream voyage. Yacht Charter Fleet: Your gateway to the worlds finest luxury boat experiences.</p>
          <button className="explore-button">Explore Our Fleet</button>
        </div>
      </div>
      <div className="section">
        <div className="content">
          <h2>Subscribe and get exclusive deals & offers</h2>
          <p>Find and book your dream boat. The worlds leading luxury boat comparison site.</p>
          <form>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ending;
