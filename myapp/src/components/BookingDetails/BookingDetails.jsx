import React, { useState } from 'react';
import './BookingDetails.scss';

const BookingDetails = () => {
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(false);

  const handleGuestOptionsToggle = () => {
    setShowGuestOptions(!showGuestOptions);
  };

  return (
    <div className="booking-details">
      <h2>$215 / night</h2>
      <p>4.5 (35 reviews)</p>
      <form>
        <div className="date-inputs">
          <div>
            <label>Trip Start</label>
            <input type="date" />
          </div>
          <div>
            <label>Trip End</label>
            <input type="date" />
          </div>
        </div>
        <div className="guest-dropdown">
          <label>Guests</label>
          <button type="button" className="guest-button" onClick={handleGuestOptionsToggle}>
            {adults} Adults, {children} Children, Pets: {pets ? "Yes" : "No"}
          </button>
          {showGuestOptions && (
            <div className="guest-options">
              <div className="guest-option">
                <label>Adults</label>
                <button type="button" onClick={() => setAdults(adults - 1)} disabled={adults <= 1}>-</button>
                <span>{adults}</span>
                <button type="button" onClick={() => setAdults(adults + 1)}>+</button>
              </div>
              <div className="guest-option">
                <label>Children</label>
                <button type="button" onClick={() => setChildren(children - 1)} disabled={children <= 0}>-</button>
                <span>{children}</span>
                <button type="button" onClick={() => setChildren(children + 1)}>+</button>
              </div>
              <div className="guest-option">
                <label>Pets</label>
                <button type="button" onClick={() => setPets(!pets)}>{pets ? "No" : "Yes"}</button>
              </div>
              <button type="button" className="apply-button" onClick={handleGuestOptionsToggle}>Apply</button>
            </div>
          )}
        </div>
        <button type="submit" className="reserve-button">Reserve</button>
      </form>
      <div className="price-details">
        <p>$215 * 3 Nights</p>
        <p className="discount">Weekly Discount: -$117</p>
        <p>Cleaning Fee: $52</p>
        <p>Service Fee: $65</p>
        <hr />
        <p className="total-fee">Total Fee: $645</p>
      </div>
      <a href="#" className="report-link">Report this listing</a>
    </div>
  );
};

export default BookingDetails;
