import React, { useEffect, useState } from 'react';
import './Toprent.scss';
import newRequest from '../../utils/newRequest';
import { Link, useNavigate } from 'react-router-dom';

const TopBoatRentals = () => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await newRequest.get('/yatch/getAll');
        setBoats(response.data);
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
  }, []);

  return (
    <div className="top-boat-rentals">
      <h2>Top Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>

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
                <p className="location">Location: {boat.MarinaID}</p>
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



/**import React, { useEffect } from 'react';
import './Toprent.scss';
import newRequest from '../../utils/newRequest';
const boats = [
    {
        name: 'Perfect set up for Lake Union cruising.',
        location: 'Santa Maria, Milazzo',
        duration: '3 - 8 hours • No Captain',
        price: '$260 avg/day',
        rating: 4.5,
        reviews: 12,
        imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
      },
    {
        name: 'Perfect set up for Lake Union cruising.',
        location: 'Santa Maria, Milazzo',
        duration: '3 - 8 hours • No Captain',
        price: '$260 avg/day',
        rating: 4.5,
        reviews: 12,
        imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
      },
    {
        name: 'Perfect set up for Lake Union cruising.',
        location: 'Santa Maria, Milazzo',
        duration: '3 - 8 hours • No Captain',
        price: '$260 avg/day',
        rating: 4.5,
        reviews: 12,
        imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
      },
    {
        name: 'Perfect set up for Lake Union cruising.',
        location: 'Santa Maria, Milazzo',
        duration: '3 - 8 hours • No Captain',
        price: '$260 avg/day',
        rating: 4.5,
        reviews: 12,
        imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
      },
    {
        name: 'Perfect set up for Lake Union cruising.',
        location: 'Santa Maria, Milazzo',
        duration: '3 - 8 hours • No Captain',
        price: '$260 avg/day',
        rating: 4.5,
        reviews: 12,
        imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
      },
  {
    name: 'Perfect set up for Lake Union cruising.',
    location: 'Santa Maria, Milazzo',
    duration: '3 - 8 hours • No Captain',
    price: '$260 avg/day',
    rating: 4.5,
    reviews: 12,
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
  },
  {
    name: 'Smooth Sailing for Lake Union cruising.',
    location: 'Kraig Pike',
    duration: '4 - 7 hours • No Captain',
    price: '$230 avg/day',
    rating: 4.5,
    reviews: 11,
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
  },
  {
    name: 'Adventurer\'s Cove Lake Union cruising.',
    location: 'Sydnee Unions',
    duration: '3 - 8 hours • Captain',
    price: '$290 avg/day',
    rating: 4.5,
    reviews: 11,
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
  },
  {
    name: 'Seaside Serenity Lake Union cruising.',
    location: 'Ko Chang, Thailand',
    duration: '2 - 6 hours • Captain',
    price: '$200 avg/day',
    rating: 4.5,
    reviews: 23,
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-twelve.png&w=1920&q=75', // Replace with actual image URL
  },
  // Add more boat data as needed
];

const TopBoatRentals = () => {

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await newRequest.get('/yatch/getAll' );
        alert(JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch privileges', error);

        // Handle JWT expiration error
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');

          //navigate('/login'); // Navigate to login page
        } else {
          alert('Failed to fetch privileges. Please try again.');
        }
      }
    };

    fetchRole();
  }, []);
  return (
    <div className="top-boat-rentals">
      <h2>Top Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>
      <div className="boats-grid">
        {boats.map((boat, index) => (
          <div key={index} className="boat-card">
            <div className="image-container">
              <img src={boat.imageUrl} alt={boat.name} />
              <div className="favorite-icon">❤️</div>
            </div>
            <div className="boat-info">
              <h3>{boat.duration}</h3>
              <p>{boat.name}</p>
              <p className="location">{boat.location}</p>
              <p className="price">{boat.price}</p>
              <div className="rating">
                {Array.from({ length: Math.floor(boat.rating) }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
                <span>({boat.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBoatRentals;
 */