import React, { useState } from 'react';
import './Profile.scss';
import {
  FaUser, FaLock, FaMoneyCheckAlt, FaBell, FaEnvelope, FaPhone,
  FaCalendar, FaCity, FaMapMarkerAlt, FaGlobe, FaInfoCircle, FaTrashAlt
} from 'react-icons/fa';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personalInfo');

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };

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
                  <input type="text" placeholder="First name" />
                </div>
                <div className="input-group">
                  <label><FaUser className="input-icon" /> Last name</label>
                  <input type="text" placeholder="Last name" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaEnvelope className="input-icon" /> Email</label>
                  <input type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                  <label><FaPhone className="input-icon" /> Phone Number</label>
                  <input type="text" placeholder="Phone Number" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaCalendar className="input-icon" /> Date of Birth</label>
                  <input type="text" placeholder="dd/mm/yyyy" />
                </div>
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> Zip Code</label>
                  <input type="text" placeholder="Zip Code" />
                </div>
              </div>
              <div className="form-row">
              
                <div className="input-group">
                  <label><FaInfoCircle className="input-icon" /> Bio</label>
                  <textarea placeholder="Bio"></textarea>
                </div>
              </div>
              <div className="form-row gender-options">
                <label>Gender</label>
                <label>
                  <input type="radio" name="gender" /> Male
                </label>
                <label>
                  <input type="radio" name="gender" /> Female
                </label>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaGlobe className="input-icon" /> Country/region</label>
                  <input type="text" placeholder="Country/region" />
                </div>
                <div className="input-group">
                  <label><FaCity className="input-icon" /> City</label>
                  <input type="text" placeholder="City" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> Street Address</label>
                  <input type="text" placeholder="Street Address" />
                </div>
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> State</label>
                  <input type="text" placeholder="State" />
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
            <h2>Social Account</h2>
            <div className="social-account">
              <div className="social-item">
                <label>Google</label>
                <span>Connected</span>
                <button>Disconnect</button>
              </div>
              <div className="social-item">
                <label>Twitter</label>
                <span>Not Connected</span>
                <button>Connect</button>
              </div>
              <div className="social-item">
                <label>Facebook</label>
                <span>Not Connected</span>
                <button>Connect</button>
              </div>
              <div className="social-item">
                <label>Github</label>
                <span>Not Connected</span>
                <button>Connect</button>
              </div>
            </div>
            <h2>Device History</h2>
            <div className="device-history">
              <div className="device-item">
                <label>Windows 10.0. Chrome</label>
                <span>Santa Maria Maggiore, Milazzo. November 22, 2022 At 12:15</span>
                <button>Log Out</button>
              </div>
              <div className="device-item">
                <label>Windows 11.0. Firefox</label>
                <span>Santa Maria Maggiore, Milazzo. November 22, 2022 At 12:15</span>
                <button>Log Out</button>
              </div>
              <div className="device-item">
                <label>Mac OS. Safari</label>
                <span>Santa Maria Maggiore, Milazzo. November 22, 2022 At 12:15</span>
                <button>Log Out</button>
              </div>
              <div className="device-item">
                <label>Windows 10.0. Chrome</label>
                <span>Santa Maria Maggiore, Milazzo. November 22, 2022 At 12:15</span>
                <button>Log Out</button>
              </div>
            </div>
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
              <span>Get notified when someones posts a comment on a posting.</span>
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


/***
 import React, { useState } from 'react';
import './Profile.scss';
import {
  FaUser, FaLock, FaMoneyCheckAlt, FaBell, FaEnvelope, FaPhone,
  FaCalendar, FaCity, FaMapMarkerAlt, FaGlobe, FaInfoCircle, FaTrashAlt
} from 'react-icons/fa';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personalInfo');

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
        </ul>
      </div>
      <div className="content">
        {activeTab === 'personalInfo' && (
          <div className="personal-info">
            <h2>Personal Information</h2>
            <form>
              <div className="form-row">
                <div className="input-group">
                  <label><FaUser className="input-icon" /> First name</label>
                  <input type="text" placeholder="First name" />
                </div>
                <div className="input-group">
                  <label><FaUser className="input-icon" /> Last name</label>
                  <input type="text" placeholder="Last name" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaEnvelope className="input-icon" /> Email</label>
                  <input type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                  <label><FaPhone className="input-icon" /> Phone Number</label>
                  <input type="text" placeholder="Phone Number" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaCalendar className="input-icon" /> Date of Birth</label>
                  <input type="text" placeholder="dd/mm/yyyy" />
                </div>
                <div className="input-group">
                  <label><FaCity className="input-icon" /> Town/City</label>
                  <input type="text" placeholder="Town/City" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> Zip Code</label>
                  <input type="text" placeholder="Zip Code" />
                </div>
                <div className="input-group">
                  <label><FaInfoCircle className="input-icon" /> Bio</label>
                  <textarea placeholder="Bio"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Gender</label>
                  <div className="gender-options">
                    <label>
                      <input type="radio" name="gender" /> Male
                    </label>
                    <label>
                      <input type="radio" name="gender" /> Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaGlobe className="input-icon" /> Country/region</label>
                  <input type="text" placeholder="Country/region" />
                </div>
                <div className="input-group">
                  <label><FaCity className="input-icon" /> City</label>
                  <input type="text" placeholder="City" />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> Street Address</label>
                  <input type="text" placeholder="Street Address" />
                </div>
                <div className="input-group">
                  <label><FaMapMarkerAlt className="input-icon" /> State</label>
                  <input type="text" placeholder="State" />
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
            <h2>Social Account</h2>
            <div className="social-account">
              <div className="social-item">
                <label>Google</label>
                <span>Connected</span>
                <button>Disconnect</button>
              </div>
              <div className="social-item">
                <label>Twitter</label>
                <span>Not Connected</span>
                <button>Connect</button>
              </div>
              <div className="social-item">
                <label>Facebook</label>
                <span>Not Connected</span>
                <button>Connect</button>
              </div>
              <div className="social-item">
                <label>Github</label>
                <span>Not Connected</span>
                <button>Connect</button>
              </div>
            </div>
            <h2>Device History</h2>
            <div className="device-history">
              <div className="device-item">
                <label>Windows 10.0. Chrome</label>
                <span>Santa Maria Maggiore, Milazzo. November 22, 2022 At 12:15</span>
                <button>Log Out</button>
              </div>
              <div className="device-item">
                <label>Windows 11.0. Firefox</label>
                <span>Santa Maria Maggiore, Milazzo. November 22, 2022 At 12:15</span>
                <button>Log Out</button>
              </div>
              <div className="device-item">
                <label>Mac OS. Safari</label>
                <span>Santa Maria Maggiore, Milazzo. November 22, 2022 At 12:15</span>
                <button>Log Out</button>
              </div>
              <div className="device-item">
                <label>Windows 10.0. Chrome</label>
                <span>Santa Maria Maggiore, Milazzo. November 22, 2022 At 12:15</span>
                <button>Log Out</button>
              </div>
            </div>
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
              <span>Get notified when someones posts a comment on a posting.</span>
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


 */