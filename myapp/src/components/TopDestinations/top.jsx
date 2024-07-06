import React from 'react';
import Slider from 'react-slick';
import { SampleNextArrow, SamplePrevArrow } from './arrow.jsx'; // Adjust the import path as needed
import './top.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const destinations = [
    {
        name: 'Miami',
        location: 'Long Island city',
        imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Fdestinations%2Fmiami.png&w=3840&q=75', // Replace with actual image URL
      },
  {
    name: 'Miami',
    location: 'Long Island city',
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Fdestinations%2Fmiami.png&w=3840&q=75', // Replace with actual image URL
  },
  {
    name: 'Seattle Beach',
    location: 'Long Island city',
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Fdestinations%2Fmiami.png&w=3840&q=75', // Replace with actual image URL
  },
  {
    name: 'Atlantis Dubai',
    location: 'Long Island city',
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Fdestinations%2Fmiami.png&w=3840&q=75', // Replace with actual image URL
  },
  {
    name: 'Australian Beach',
    location: 'Long Island city',
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Fdestinations%2Fmiami.png&w=3840&q=75', // Replace with actual image URL
  },
  {
    name: 'Miami',
    location: 'Long Island city',
    imageUrl: 'https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Fdestinations%2Fmiami.png&w=3840&q=75', // Replace with actual image URL
  },
];

const TopDestinations = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="top-destinations">
      <h2>Top Destinations For Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>
      <div className="slider-container">
        <Slider {...settings}>
          {destinations.map((destination, index) => (
            <div key={index} className="destination-card">
              <img src={destination.imageUrl} alt={destination.name} />
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.location}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopDestinations;
