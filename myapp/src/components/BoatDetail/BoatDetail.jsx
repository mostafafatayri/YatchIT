import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS
import './BoatDetail.scss';
import Reviews from '../../components/Reviews/Review.jsx';
import newRequest from '../../utils/newRequest.js';
import { useParams } from 'react-router-dom';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import BookingDetails from '../../components/BookingDetails/BookingDetails';

const BoatDetails = (boatDetails) => {
 
  const { id } = useParams();
  const [boat, setBoat] = useState(null);
  const [date, setDate] = useState(new Date());
  


  useEffect(() => {
    const fetchBoat = async () => {
      try {
        const data= boatDetails.boatDetails;
       // alert("from inside the component "+JSON.stringify(data));
        setBoat(data);
      } catch (error) {
        setBoat("error fetching the data");
      }
    };

    fetchBoat();
  }, [id]);



  if (!boat) {
    return <div>Loading...</div>;
  }
  const Ratings = boat.ratings

  const onboardEquipmentImages = {
    'Outboard Motor': '/img/motor.png',
    'Hot Water': '/img/water.png',
    'Automatic Pilot': '/img/yacht.png',
    'Deck Shower': '/img/shower.png',
    'GPS': '/img/gps.png',
    'Cockpit Table': '/img/table.png',
    'Wi Fi': '/img/wifi.png',
    'TV': '/img/tv.png',
    'Fire Detector': '/img/detector.png',
    'Speakers': '/img/speakers.png',
    'Boarding Ladder': '/img/ladder.png',
    'First Aid Kit': '/img/aid.png',
  };

  const specifications = [
    { label: 'Engine Torque', value: boat.Torque },
    { label: 'Engine', value: boat.Engine },
    { label: 'Fuel System', value: boat.FuelSystem },
    { label: 'Bore x Stroke', value: boat.boreStroke },
    { label: 'Fuel Capacity', value: boat.FuelCap },
    { label: 'Weight', value: boat.Weight },
    
    { label: 'Capacity', value: `${boat.Capacity} cu ft` },
  ];

  return (
    <div className="boat-details">
      <ImageGallery images={boat.Images} />
      <h2>{boat.vehicleName}</h2>
      <p>Santa Maria Maggiore, Milazzo</p>
      <p>{boat.Guests} guests · {boat.bedrooms} Cabins · {boat.bathrooms} bathrooms</p>
      <p>{boat.description}</p>
      
      <h3>On Board Equipment</h3>
      <div className="equipment-options">
        {boat.Equipment.map((item, index) => (
          <div key={index} className="equipment-option">
            <img src={onboardEquipmentImages[item]} alt={item} />
            <label>{item}</label>
          </div>
        ))}
      </div>

      <h3>Specifications</h3>
      <div className="specifications">
        {specifications.map((item, index) => (
          <div key={index} className="specification">
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </div>

      <h3>Availability</h3>
      <Calendar
        onChange={setDate}
        value={date}
        selectRange={true}
      />

      <Reviews yachtId={boat._id} ratings={Ratings} />

   
    </div>
  );
};

export default BoatDetails;


/*import React, { useState ,useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS
import './BoatDetail.scss';
import Reviews from '../../components/Reviews/Review.jsx';
import newRequest from '../../utils/newRequest.js';
import { useParams } from 'react-router-dom';
const BoatDetails = () => {

  const {id} = useParams();
  alert(id);
  useEffect(() => {
    const fetchBoat = async () => {
      try {
        const response = await newRequest.get(`/yatch/getYacht/${id}`);
        alert(JSON.stringify(response));
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
  }, []);

  const [date, setDate] = useState(new Date());

  const onboardEquipment = [
    { img: '/img/motor.png', label: 'Outboard Motor' },
    { img: '/img/water.png', label: 'Hot Water' },
    { img: '/img/yacht.png', label: 'Automatic Pilot' },
    { img: '/img/shower.png', label: 'Deck Shower' },
    { img: '/img/gps.png', label: 'GPS' },
    { img: '/img/table.png', label: 'Cockpit Table' },
    { img: '/img/wifi.png', label: 'Wi Fi' },
    { img: '/img/tv.png', label: 'TV' },
    { img: '/img/detector.png', label: 'Fire Detector' },
    { img: '/img/speakers.png', label: 'Speakers' },
    { img: '/img/ladder.png', label: 'Boarding Ladder' },
    { img: '/img/aid.png', label: 'First Aid Kit' },
  ];

  const specifications = [
    { label: 'Engine Torque', value: '111 ft-lb' },
    { label: 'Engine', value: 'Milwaukee-Eight 107' },
    { label: 'Fuel System', value: 'Electronic Sequential Port Fuel Injection (ESPFI)' },
    { label: 'Bore x Stroke', value: '3.937 in. x 4.375 in.' },
    { label: 'Infotainment System (2018 model or newer)', value: 'Boom Box 4.3' },
    { label: 'Displacement', value: '1,746 cc (107 cu in)' },
    { label: 'Fuel Capacity', value: '6.00 gal (22.71 L)' },
    { label: 'Length', value: '102.4 in.' },
    { label: 'Compression Ratio', value: '10.0:1' },
    { label: 'Luggage Capacity - Volume', value: '4.7 cu ft' },
    { label: 'Fuel Economy', value: '43 mpg' },
    { label: 'Weight', value: 'As Shipped: 877.00 lb.; Running Order: 904 lb.' },
  ];

  return (
    <div className="boat-details">
      <h2>Sport Cruiser — Oceanis 35 (2017)</h2>
      <p>Santa Maria Maggiore, Milazzo</p>
      <p>12 guests · 3 Cabins · 2 bathrooms</p>
      <p>
        Do not miss the opportunity to board this magnificent oceanis 35. Finot-Conqs sharp-edged boat hull and the slightly displaced mast will offer you great balance and comfort on the one hand, and on the other excellent performance and great stability in navigation. The large space inside, consisting of a fitted kitchen, three double cabins and a bathroom with shower will ensure you maximum comfort while the two helm stations and the wide stern platform from which you can dive into the crystal clear waters of sardinia will simplify the conduct of the boat and facilitate the descent into the sea. Come and discover capo san marco, a promontory in the southern part of the sinis peninsula that can be reached in just 40 minutes by boat or take this opportunity to visit an ancient settlement such as a phoenician city founded in the 8th century BC. Furthermore, about 14 nautical miles from the tourist port of oristano, there is also mal di Ventre, in Sardinian Malu Etna, a small island facing the coast.
      </p>
      <h3>On Board Equipment</h3>
      <div className="equipment-options">
        {onboardEquipment.map((item, index) => (
          <div key={index} className="equipment-option">
            <img src={item.img} alt={item.label} />
            <label>{item.label}</label>
          </div>
        ))}
      </div>
      <h3>Specifications</h3>
      <div className="specifications">
        {specifications.map((item, index) => (
          <div key={index} className="specification">
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </div>
      <h3>Availability</h3>
      <Calendar
        onChange={setDate}
        value={date}
        selectRange={true}
      />

      <Reviews/>
    </div>
  );
};

export default BoatDetails; */