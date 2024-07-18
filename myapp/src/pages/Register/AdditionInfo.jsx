import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import './Signup.scss';
import Ending from '../../components/Ending/End';
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useLocation } from "react-router-dom";

const Additional = () => {

    const location = useLocation();
    const userId = location.state?.userId;

    console.log("the user id from state : "+userId);
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const response = await newRequest.post('/auth/registration/moreInfo', { userId, phone, dob, city, zip, gender });
      if (response.status === 200) {
        navigate("/verifyEmail",{ state: { userId } }); // Redirect to the login page after successful registration
      } else {
        setError('Failed to register');
      }
    } catch (error) {
      setError('Failed to register');
    }
  };

  return (
    <div>
      <div className="signup-page">
        <div className="signup-container">
          <h2>CONTINUE SIGN UP</h2>
          <p>Welcome! Please enter your details</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                country={'us'}
                value={phone}
                onChange={phone => setPhone(phone)}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true
                }}
                containerClass="phone-input-container"
                inputClass="phone-input"
                buttonStyle={{ marginRight: '10px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input 
                type="date" 
                id="dob" 
                placeholder="Enter your date of birth" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Town/City</label>
              <input 
                type="text" 
                id="city" 
                placeholder="Enter your town or city" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip Code</label>
              <input 
                type="text" 
                id="zip" 
                placeholder="Enter your zip code" 
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div>
                <input 
                  type="radio" 
                  id="male" 
                  name="gender" 
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  required 
                />
                <label htmlFor="male">Male</label>
                <input 
                  type="radio" 
                  id="female" 
                  name="gender" 
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  required 
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="signup-btn">Continue</button>
          </form>
        </div>
      </div>
      <Ending />
    </div>
  );
};

export default Additional;
