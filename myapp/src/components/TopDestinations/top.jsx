import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { SampleNextArrow, SamplePrevArrow } from './arrow.jsx'; // Adjust the import path as needed
import './top.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';

const TopDestinations = () => {
  const navigate = useNavigate();

  const handleCardClick = (destination) => {
    navigate('/explore', { state: { filter: destination } });
  };

  const queryClient = useQueryClient();
  const { isLoading, error, data: marinas } = useQuery({
    queryKey: ['marinas'],
    queryFn: () =>
      newRequest.get(`/marina/getAllMarinas/`).then((res) => {
        return res.data;
      }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="top-destinations">
      <h2>Top Destinations For Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>
      <div className="slider-container">
        <Slider {...settings}>
          {marinas.map((marina, index) => (
            <div
              key={index}
              className="destination-card"
              onClick={() => handleCardClick(marina)}
            >
              <img src={marina.Image} alt={marina.marinaName} />
              <div className="destination-info">
                <h3>{marina.marinaName}</h3>
                <p>{marina.location}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

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

export default TopDestinations;

/**import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { SampleNextArrow, SamplePrevArrow } from './arrow.jsx'; // Adjust the import path as needed
import './top.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest.js';
const destinations = [
  {
    name: 'Zaitunay Bay',
    location: 'Beirut',
    imageUrl:'/img/zb.jpg', // Replace with actual image URL
  },
  {
    name: 'ATCL',
    location: 'Jounieh',
    imageUrl: '/img/atcl.HEIC', // Replace with actual image URL
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
  const navigate = useNavigate();

  const handleCardClick = (destination) => {
    navigate('/explore', { state: { filter: destination } });
  };

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


  const queryClient = useQueryClient();
  const { isLoading, error, data:marinas } = useQuery({
    queryKey: ['marinas', ],
    queryFn: () =>
      newRequest.get(`/marina/getAllMarinas/`).then((res) => {
        return res.data;
      }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
console.log("the data odf the marinas : "+JSON.stringify(marinas));
  return (
    <div className="top-destinations">
      <h2>Top Destinations For Boat Rentals</h2>
      <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>
      <div className="slider-container">
        <Slider {...settings}>
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="destination-card"
              onClick={() => handleCardClick(destination)}
            >
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

**/