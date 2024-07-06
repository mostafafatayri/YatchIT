import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Feature/Feature';


import './Home.scss';
import TopDestinations from '../../components/TopDestinations/top.jsx';
import ReasonsToRent from '../../components/Reasons/ReasonsToRent.jsx';
import CareValue from '../../components/Care/Care.jsx';
import TopBoatRentals from '../../components/TopRent/Toprent.jsx';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <TopDestinations/>
      <TopBoatRentals/>
      <ReasonsToRent/>
      <CareValue/>
      
      <div>
   
      </div>


    </div>
   






 );
};

export default Home;
