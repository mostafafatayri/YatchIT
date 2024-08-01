import React, { useState, useEffect } from 'react';
import './Profile.scss';
import {
  FaUser, FaLock, FaMoneyCheckAlt, FaBell, FaEnvelope, FaPhone,
  FaCalendar, FaCity, FaMapMarkerAlt, FaGlobe, FaInfoCircle, FaTrashAlt, FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personalInfo');

  // State variables for user data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [state, setState] = useState('');

  const navigate = useNavigate();

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };
  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout', {}, { withCredentials: true });
      sessionStorage.removeItem('userInfo');
      navigate("/");
    } catch (error) {
      console.error('Failed to logout', error);
    } 
  };
  

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = sessionStorage.getItem("userInfo");
        if (userInfo) {
          
          const userData = JSON.parse(userInfo);
          setFirstName(userData.firstname);
          setLastName(userData.lastname);
          setEmail(userData.email);
          setPhone(userData.phone);
          setDob(new Date(userData.DateOFBirth).toISOString().split('T')[0]);
          setZipCode(userData.ZipCode);
          setBio(userData.bio);
          setGender(userData.gender);
          setCountry(userData.Country);
          setCity(userData.City);
          setStreetAddress(userData.streetAddress);
          setState(userData.state);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-page">
      <div className="sidebar">
        <ul>
          <li
            className={activeTab === 'personalInfo' ? 'active' : ''}
            onClick={() => setActiveTab('personalInfo')}
          >
            <FaUser className="icon" />
            Personal Information
          </li>
          <li
            className={activeTab === 'loginSecurity' ? 'active' : ''}
            onClick={() => setActiveTab('loginSecurity')}
          >
            <FaLock className="icon" />
            Login & Security
          </li>
          <li
            className={activeTab === 'paymentsPayouts' ? 'active' : ''}
            onClick={() => setActiveTab('paymentsPayouts')}
          >
            <FaMoneyCheckAlt className="icon" />
            Payments & Payouts
          </li>
          <li
            className={activeTab === 'notifications' ? 'active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell className="icon" />
            Notifications
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            Logout
          </li>
        </ul>
      </div>
      <div className="dropdown-menu">
        <select value={activeTab} onChange={handleTabChange}>
          <option value="personalInfo">Personal Information</option>
          <option value="loginSecurity">Login & Security</option>
          <option value="paymentsPayouts">Payments & Payouts</option>
          <option value="notifications">Notifications</option>
        </select>
      </div>
      <div className="content">
        {activeTab === 'personalInfo' && (
          <div className="personal-info">
            <h2>Personal Information</h2>
            <form>
              <div className="form-row">
                <div className="input-group">
                  <label><FaUser className="input-icon" /> First name</label>
                  <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="input-group">
                  <label><FaUser className="input-icon" /> Last name</label>
                  <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaEnvelope className="input-icon" /> Email</label>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                  <label><FaPhone className="input-icon" /> Phone Number</label>
                  <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaCalendar className="input-icon" /> Date of Birth</label>
                  <input type="date" placeholder="dd/mm/yyyy" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> Zip Code</label>
                  <input type="text" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaInfoCircle className="input-icon" /> Bio</label>
                  <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                </div>
              </div>
              <div className="form-row gender-options">
                <label>Gender</label>
                <label>
                  <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} /> Female
                </label>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaGlobe className="input-icon" /> Country/region</label>
                  <input type="text" placeholder="Country/region" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="input-group">
                  <label><FaCity className="input-icon" /> City</label>
                  <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> Street Address</label>
                  <input type="text" placeholder="Street Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                </div>
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> State</label>
                  <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
              </div>
            </form>
          </div>
        )}
        {activeTab === 'loginSecurity' && (
          <div className="login-security">
            <h2>Change Password</h2>
            <form>
              <div className="form-row">
                <div className="input-group">
                  <label>Current password</label>
                  <input type="password" placeholder="Current password" />
                </div>
                <div className="input-group">
                  <label>New password</label>
                  <input type="password" placeholder="New password" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Confirm password</label>
                  <input type="password" placeholder="Confirm password" />
                </div>
              </div>
              <button type="submit" className="btn-update-password">Update password</button>
            </form>
          
           
            <h2>Account</h2>
            <div className="account">
              <button className="delete-account">
                <FaTrashAlt /> Delete Account
              </button>
            </div>
          </div>
        )}
        {activeTab === 'paymentsPayouts' && (
          <div className="payments-payouts">
            <h2>Payment Methods</h2>
            <div className="payment-methods">
              <div className="payment-item">
                <label>Visa ending in 1234</label>
                <span>16/11/25</span>
                <span>Default card</span>
              </div>
              <div className="payment-item">
                <label>Mastercard ending in 1234</label>
                <span>16/11/25</span>
              </div>
              <div className="payment-item">
                <label>PayPal ending in 1234</label>
                <span>16/11/25</span>
              </div>
            </div>
            <h2>Add New Payment Method</h2>
            <form className="add-payment-method">
              <div className="form-row">
                <div className="input-group">
                  <label>Full name</label>
                  <input type="text" placeholder="Full name" />
                </div>
                <div className="input-group">
                  <label>Card number</label>
                  <input type="text" placeholder="1111 2222 3333 4444" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Expiry date</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="input-group">
                  <label>CCV</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>
              <button type="submit" className="btn-save-payment">Save</button>
            </form>
          </div>
        )}
        {activeTab === 'notifications' && (
          <div className="notifications">
            <h2>Notifications</h2>
            <h3>By Email</h3>
            <div className="notification-item">
              <label>Comments</label>
              <span>Get notified when someone posts a comment on a posting.</span>
              <input type="checkbox" />
            </div>
            <div className="notification-item">
              <label>Candidates</label>
              <span>Get notified when a candidate applies for a job.</span>
              <input type="checkbox" />
            </div>
            <div className="notification-item">
              <label>Offers</label>
              <span>Get notified when a candidate accepts or rejects an offer.</span>
              <input type="checkbox" />
            </div>
            <h3>Push Notifications</h3>
            <div className="notification-item">
              <label>Everything</label>
              <span>Send Every change as a push notification.</span>
              <input type="checkbox" />
            </div>
            <div className="notification-item">
              <label>Same As Email</label>
              <span>Send Every change as a push notification.</span>
              <input type="checkbox" />
            </div>
            <div className="notification-item">
              <label>No Push Notifications</label>
              <span>Send Every change as a push notification.</span>
              <input type="checkbox" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
