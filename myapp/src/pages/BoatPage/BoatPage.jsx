import React from 'react';

import ImageGallery from '../../components/ImageGallery/ImageGallery';
import BoatDetails from '../../components/BoatDetail/BoatDetail';
import BookingDetails from '../../components/BookingDetails/BookingDetails';
import Ending from '../../components/Ending/End.jsx';
import './BoatPage.scss';

const BoatPage = () => {
  return (
    <div className="boat-page">
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
      <div className="content-container">
        <div className="left-container">

          <ImageGallery />
          <BoatDetails />
        </div>
        <BookingDetails />
      </div>
      <Ending/>
    </div>
  );
};

export default BoatPage;
