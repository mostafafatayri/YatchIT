import React from 'react';
import './Toprent.scss';

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
