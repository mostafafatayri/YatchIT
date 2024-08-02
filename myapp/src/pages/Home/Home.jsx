import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Feature/Feature';

import './Home.scss';
import TopDestinations from '../../components/TopDestinations/top.jsx';
import ReasonsToRent from '../../components/Reasons/ReasonsToRent.jsx';
import CareValue from '../../components/Care/Care.jsx';
import TopBoatRentals from '../../components/TopRent/Toprent.jsx';
//import { Email } from '@material-ui/icons';
import EmailCollector from '../../components/Email/Email.jsx';
import Ending from '../../components/Ending/End.jsx';


const Home = () => {
  const [filters, setFilters] = useState('');
  return (
    <div>
    
      <Hero />
      <TopDestinations/>
      <TopBoatRentals  />
      <ReasonsToRent/>
      
      <Ending/>
      
      <div>
   
      </div>


    </div>
   






 );
};

export default Home;
