
import React, { useState, useEffect } from 'react';
import './Toprent.scss';
import newRequest from '../../utils/newRequest';
import { Link } from 'react-router-dom';

const TopBoatRentals = ({ filters }) => {
  const [boats, setBoats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        let response;
        if (filters && Object.keys(filters).length > 0) {
          response = await newRequest.get('/yatch/getAll', {
            params: {
              marina: filters.marina,
              tripDate: filters.tripDate,
              boatType: filters.boatType,
              minPrice: filters.priceRange.min,
              maxPrice: filters.priceRange.max,
              numberOfPeople: filters.numberOfPeople,
              withCrew: filters.withCrew,
              freeCancellation: filters.freeCancellation,
              sailboat: filters.categories.sailboat,
              motorboat: filters.categories.motorboat,
              catamaran: filters.categories.catamaran,
              yacht: filters.categories.yacht,
              jetSki: filters.categories.jetSki,
              dinghy: filters.categories.dinghy,
            },
          });
        } else {
          response = await newRequest.get('/yatch/getAll');
        }

        if (response.data.length === 0) {
          setBoats([]);
          setMessage('No boats match your request');
        } else {
          setBoats(response.data);
          setMessage('');
        }
      } catch (error) {
        console.error('Failed to fetch boats', error);

        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
        } else if (error.response && error.response.data.message === 'No yachts found') {
          setBoats([]);
          setMessage('No boats match your request');
        } else {
          alert('Failed to fetch boats. Please try again.');
        }
      }
    };

    fetchBoats();
  }, [filters]);

  return (
    <div className="top-boat-rentals">
      <h2>Top Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>

      {message && <p className="message">{message}</p>}

      <div className="boats-grid">
        {boats.map((boat) => (
          <Link to={`/BoatDetail/${boat._id}`} key={boat._id}>
            <div className="boat-card">
              <div className="image-container">
                <img src={boat.Images[0]} alt={boat.vehicleName} />
                <div className="favorite-icon">❤️</div>
              </div>
              <div className="boat-info">
                <h3>{boat.vehicleType}</h3>
                <p>{boat.vehicleName}</p>
                <p className="location">Location: {boat.marinaName}</p>
                <p className="price">
                  ${boat.price} /{' '}
                  {boat.RentDuration === 'per day' ? boat.RentDuration : `${boat.RentDuration} hours`}
                </p>
                <div className="rating">
                  {Array.from({ length: Math.floor(boat.Ratings) }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span>({boat.Raters})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBoatRentals;

/*
//working
import React, { useEffect, useState } from 'react';
import './Toprent.scss';
import newRequest from '../../utils/newRequest';
import { Link } from 'react-router-dom';

const TopBoatRentals = ({ filters }) => {
  const [boats, setBoats] = useState([]);
  const [message, setMessage] = useState('');
  console.log("the filter "+JSON.stringify(filters));

  
  useEffect(() => {
    const fetchBoats = async () => {
      try {
        // Include filters in the request
        const response = await newRequest.get('/yatch/getAll')/*,filters? {
          params: {
            marina: filters.marina,
            tripDate: filters.tripDate,
            boatType: filters.boatType,
            minPrice: filters.priceRange.min,
            maxPrice: filters.priceRange.max,
            numberOfPeople: filters.numberOfPeople,
            withCrew: filters.withCrew,
            freeCancellation: filters.freeCancellation,
            sailboat: filters.categories.sailboat,
            motorboat: filters.categories.motorboat,
            catamaran: filters.categories.catamaran,
            yacht: filters.categories.yacht,
            jetSki: filters.categories.jetSki,
            dinghy: filters.categories.dinghy,
          } }:{}
        
        );*/
/*
        if (response.data.length === 0) {
          setBoats([]);
          setMessage('No boats match your request');
        } else {
          console.log(JSON.stringify(response.data));
          setBoats(response.data);
          setMessage('');
        }
      } catch (error) {
        console.error('Failed to fetch boats', error);

        // Handle JWT expiration error
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
        } else if (error.response && error.response.data.message === 'No yachts found') {
          setBoats([]);
          setMessage('No boats match your request');
        } else {
          alert('Failed to fetch boats. Please try again.');
        }
      }
    };

    fetchBoats();
  }, [filters]); // Add filters as a dependency
 

  return (
    <div className="top-boat-rentals">
      <h2>Top Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>

      {message && <p className="message">{message}</p>}

      <div className="boats-grid">
        {boats.map((boat) => (
          <Link to={`/BoatDetail/${boat._id}`} key={boat._id}>
            <div className="boat-card">
              <div className="image-container">
                <img src={boat.Images[0]} alt={boat.vehicleName} />
                <div className="favorite-icon">❤️</div>
              </div>
              <div className="boat-info">
                <h3>{boat.vehicleType}</h3>
                <p>{boat.vehicleName}</p>
                <p className="location">Location: {boat.marinaName}</p>
                <p className="price">
                  ${boat.price} /{' '}
                  {boat.RentDuration === 'per day' ? boat.RentDuration : `${boat.RentDuration} hours`}
                </p>
                <div className="rating">
                  {Array.from({ length: Math.floor(boat.Ratings) }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span>({boat.Raters})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBoatRentals;
 */
 
/*
dynamic approach 
import React, { useEffect, useState } from 'react';
import './Toprent.scss';
import newRequest from '../../utils/newRequest';
import { Link } from 'react-router-dom';

const TopBoatRentals = ({ filters }) => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        // Include filters in the request
        const response = await newRequest.get('/yatch/getAll', {
          params: {
            marina: filters.marina,
            tripDate: filters.tripDate,
            boatType: filters.boatType,
            minPrice: filters.priceRange.min,
            maxPrice: filters.priceRange.max,
            numberOfPeople: filters.numberOfPeople,
            withCrew: filters.withCrew,
            freeCancellation: filters.freeCancellation,
            sailboat: filters.categories.sailboat,
            motorboat: filters.categories.motorboat,
            catamaran: filters.categories.catamaran,
            quiet: filters.categories.quiet,
            jetSki: filters.categories.jetSki,
            houseboat: filters.categories.houseboat,
          },
        });
        setBoats(response.data);
        alert(response);
        console.log("the issue is "+JSON.stringify(response.data))
      } catch (error) {
        console.error('Failed to fetch boats', error);

        // Handle JWT expiration error
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
        } else {
          alert('Failed to fetch boats. Please try again.');
        }
      }
    };

    fetchBoats();
  }, [filters]); // Add filters as a dependency

  return (
    <div className="top-boat-rentals">
      <h2>Top Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>

      <div className="boats-grid">
        {boats.map((boat) => (
          <Link to={/BoatDetail/${boat._id}} key={boat._id}>
            <div className="boat-card">
              <div className="image-container">
                <img src={boat.Images[0]} alt={boat.vehicleName} />
                <div className="favorite-icon">❤️</div>
              </div>
              <div className="boat-info">
                <h3>{boat.vehicleType}</h3>
                <p>{boat.vehicleName}</p>
                <p className="location">Location: {boat.marinaName}</p>
                <p className="price">
                  ${boat.price} /{' '}
                  {boat.RentDuration === 'per day' ? boat.RentDuration : ${boat.RentDuration} hours}
                </p>
                <div className="rating">
                  {Array.from({ length: Math.floor(boat.Ratings) }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span>({boat.Raters})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBoatRentals;




/**
 working fine :
 
// best solution
import React, { useEffect, useState } from 'react';
import './Toprent.scss';
import newRequest from '../../utils/newRequest';
import { Link } from 'react-router-dom';

const TopBoatRentals = ({ filters }) => {
  const [boats, setBoats] = useState([]);
  const [message, setMessage] = useState('');
  console.log("the filter "+JSON.stringify(filters));

  
  useEffect(() => {
    const fetchBoats = async () => {
      try {
        // Include filters in the request
        const response = await newRequest.get('/yatch/getAll',filters? {
          params: {
            marina: filters.marina,
            tripDate: filters.tripDate,
            boatType: filters.boatType,
            minPrice: filters.priceRange.min,
            maxPrice: filters.priceRange.max,
            numberOfPeople: filters.numberOfPeople,
            withCrew: filters.withCrew,
            freeCancellation: filters.freeCancellation,
            sailboat: filters.categories.sailboat,
            motorboat: filters.categories.motorboat,
            catamaran: filters.categories.catamaran,
            yacht: filters.categories.yacht,
            jetSki: filters.categories.jetSki,
            dinghy: filters.categories.dinghy,
          } }:{}
        
        );

        if (response.data.length === 0) {
          setBoats([]);
          setMessage('No boats match your request');
        } else {
          console.log(JSON.stringify(response.data));
          setBoats(response.data);
          setMessage('');
        }
      } catch (error) {
        console.error('Failed to fetch boats', error);

        // Handle JWT expiration error
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
        } else if (error.response && error.response.data.message === 'No yachts found') {
          setBoats([]);
          setMessage('No boats match your request');
        } else {
          alert('Failed to fetch boats. Please try again.');
        }
      }
    };

    fetchBoats();
  }, [filters]); // Add filters as a dependency
 

  return (
    <div className="top-boat-rentals">
      <h2>Top Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>

      {message && <p className="message">{message}</p>}

      <div className="boats-grid">
        {boats.map((boat) => (
          <Link to={`/BoatDetail/${boat._id}`} key={boat._id}>
            <div className="boat-card">
              <div className="image-container">
                <img src={boat.Images[0]} alt={boat.vehicleName} />
                <div className="favorite-icon">❤️</div>
              </div>
              <div className="boat-info">
                <h3>{boat.vehicleType}</h3>
                <p>{boat.vehicleName}</p>
                <p className="location">Location: {boat.marinaName}</p>
                <p className="price">
                  ${boat.price} /{' '}
                  {boat.RentDuration === 'per day' ? boat.RentDuration : `${boat.RentDuration} hours`}
                </p>
                <div className="rating">
                  {Array.from({ length: Math.floor(boat.Ratings) }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span>({boat.Raters})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBoatRentals;
 
 */
/*
dynamic approach 
import React, { useEffect, useState } from 'react';
import './Toprent.scss';
import newRequest from '../../utils/newRequest';
import { Link } from 'react-router-dom';

const TopBoatRentals = ({ filters }) => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        // Include filters in the request
        const response = await newRequest.get('/yatch/getAll', {
          params: {
            marina: filters.marina,
            tripDate: filters.tripDate,
            boatType: filters.boatType,
            minPrice: filters.priceRange.min,
            maxPrice: filters.priceRange.max,
            numberOfPeople: filters.numberOfPeople,
            withCrew: filters.withCrew,
            freeCancellation: filters.freeCancellation,
            sailboat: filters.categories.sailboat,
            motorboat: filters.categories.motorboat,
            catamaran: filters.categories.catamaran,
            quiet: filters.categories.quiet,
            jetSki: filters.categories.jetSki,
            houseboat: filters.categories.houseboat,
          },
        });
        setBoats(response.data);
        alert(response);
        console.log("the issue is "+JSON.stringify(response.data))
      } catch (error) {
        console.error('Failed to fetch boats', error);

        // Handle JWT expiration error
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
        } else {
          alert('Failed to fetch boats. Please try again.');
        }
      }
    };

    fetchBoats();
  }, [filters]); // Add filters as a dependency

  return (
    <div className="top-boat-rentals">
      <h2>Top Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>

      <div className="boats-grid">
        {boats.map((boat) => (
          <Link to={/BoatDetail/${boat._id}} key={boat._id}>
            <div className="boat-card">
              <div className="image-container">
                <img src={boat.Images[0]} alt={boat.vehicleName} />
                <div className="favorite-icon">❤️</div>
              </div>
              <div className="boat-info">
                <h3>{boat.vehicleType}</h3>
                <p>{boat.vehicleName}</p>
                <p className="location">Location: {boat.marinaName}</p>
                <p className="price">
                  ${boat.price} /{' '}
                  {boat.RentDuration === 'per day' ? boat.RentDuration : ${boat.RentDuration} hours}
                </p>
                <div className="rating">
                  {Array.from({ length: Math.floor(boat.Ratings) }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span>({boat.Raters})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBoatRentals;


*/
