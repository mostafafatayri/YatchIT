import React from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import BoatDetails from '../../components/BoatDetail/BoatDetail';
import BookingDetails from '../../components/BookingDetails/BookingDetails';
import Ending from '../../components/Ending/End.jsx';
import './BoatPage.scss';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest.js';

const BoatPage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const { isLoading, error, data:boat } = useQuery({
    queryKey: ['boat', id],
    queryFn: () =>
      newRequest.get(`/yatch/getYacht/${id}`).then((res) => {
        return res.data;
      }),
  });
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch boat details. Please try again.</div>;
  }

  return (
    <div className="boat-page">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {isLoading?("Loading"):error?("something went wrong"):(
      <div className="content-container">
        <div className="left-container">
          <BoatDetails boatDetails={boat} />
        </div>
        <BookingDetails boatDetails={boat} />
      </div>
      )}
      <Ending />
    </div>
  );
};

export default BoatPage;


/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import BoatDetails from '../../components/BoatDetail/BoatDetail';
import BookingDetails from '../../components/BookingDetails/BookingDetails';
import Ending from '../../components/Ending/End.jsx';
import './BoatPage.scss';
import newRequest from '../../utils/newRequest.js';
const BoatPage = () => {
  const { id } = useParams();
  const [boat, setBoat] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchBoat = async () => {
      try {
        const response = await newRequest.get(`/yatch/getYacht/${id}`);
        alert("from the boatpage before the compoenents "+response);
        setBoat(response.data);
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

    fetchBoat();
  }, [id]);

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

        
          <BoatDetails  boatDetails={boat} />
        </div>
       
        <BookingDetails boatDetails={boat} />
       
      </div>
      <Ending/>
    </div>
  );
};

export default BoatPage;
*/