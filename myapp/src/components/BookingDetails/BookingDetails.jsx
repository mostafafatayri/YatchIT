import React, { useState, useEffect } from 'react';
import './BookingDetails.scss';
import { useParams } from 'react-router-dom';
const BookingDetails = (boatDetails) => {

  const { id } = useParams();
  const [boat, setBoat] = useState(null);
  const [date, setDate] = useState(new Date());
  


  useEffect(() => {
    const fetchBoat = async () => {
      try {
        const data= boatDetails.boatDetails;
      //  alert("from inside the compm fo the card payment  "+JSON.stringify(data));
        setBoat(data);
      } catch (error) {
        setBoat("error fetching the data");
      }
    };

    fetchBoat();
  }, [id]);

  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(false);

  const handleGuestOptionsToggle = () => {
    setShowGuestOptions(!showGuestOptions);
  };
  if (!boat) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-details">
      <h2>${boat.price} / {boat.RentDuration} </h2>
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
                <button type="button"  className="apply-buttonChange" onClick={() => setAdults(adults - 1)} disabled={adults <= 1}>-</button>
                <span>{adults}</span>
                <button type="button" className="apply-buttonChange" onClick={() => setAdults(adults + 1)}>+</button>
              </div>
              <div className="guest-option">
                <label>Children</label>
                <button type="button"  className="apply-buttonChange" onClick={() => setChildren(children - 1)} disabled={children <= 0}>-</button>
                <span>{children}</span>
                <button type="button" className="apply-buttonChange" onClick={() => setChildren(children + 1)}>+</button>
              </div>
              <div className="guest-option">
                <label>Pets</label>
                <button type="button"  className="apply-buttonChange" onClick={() => setPets(!pets)}>{pets ? "No" : "Yes"}</button>
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




