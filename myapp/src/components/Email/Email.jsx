import React from 'react';
import './Email.scss';

const EmailCollector = () => {
  return (
    <div className="email-collector">
      <div className="content">
        <h2>Subscribe and get exclusive deals & offers</h2>
        <p>Find and book your dream boat. The worlds leading luxury boat comparison site.</p>
        <form>
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default EmailCollector;
