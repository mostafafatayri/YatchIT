import React from 'react';
import './ReasonsToRent.scss';
//import "../../../public/img/three.jpg"

const reasons = [
  {
    icon: '/img/one.jpg', // Replace with actual icon path
    title: 'Experience Luxury',
    description: 'Enjoy a luxurious experience on the water with our top-of-the-line boats.',
  },
  {
    icon: '/img/two.jpg', // Replace with actual icon path
    title: 'Unmatched Freedom',
    description: 'Explore and navigate the open waters with unmatched freedom and flexibility.',
  },
  {
    icon: '/img/three.jpg', // Replace with actual icon path
    title: 'Perfect for Events',
    description: 'Our boats are perfect for any event, whether it’s a party, wedding, or corporate outing.',
  },
  {
    icon: '/img/four.jpg', // Replace with actual icon path
    title: 'Safe and Secure',
    description: 'All our boats are equipped with the latest safety features to ensure a secure journey.',
  },
];

const ReasonsToRent = () => {
  return (
    <div className="reasons-to-rent">
      <h2>Reasons to Rent a Boat</h2>
      <p>Discover why renting a boat with us is the best choice for your next adventure.</p>
      <div className="reasons-grid">
        {reasons.map((reason, index) => (
          <div key={index} className="reason-card">
            <img src={reason.icon} alt={reason.title} />
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsToRent;
