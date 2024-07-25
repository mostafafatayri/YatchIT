import React, { useEffect } from 'react';
import { FaCopy, FaPlusCircle } from 'react-icons/fa';
import './AddType.scss';
import { Link, useNavigate } from 'react-router-dom'; // Use react-router-dom instead of @material-ui/core
import newRequest from '../../utils/newRequest';

const AddType = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await newRequest.get('/auth/user_roles', { withCredentials: true });
        alert(JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch privileges', error);

        // Handle JWT expiration error
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');

          navigate('/login'); // Navigate to login page
        } else {
          alert('Failed to fetch privileges. Please try again.');
        }
      }
    };

    fetchRole();
  }, []);

  return (
    <div className="add-type-page">
      <div className="content">
        <h2>Welcome back Helene</h2>
        <p>Start a new listing</p>
        <div className="options">
          <div className="option">
            <Link to="/add/boat" className="link">
              <FaPlusCircle className="icon" />
              <span>Create a new listing</span>
            </Link>
          </div>
          <div className="option">
            <Link to="/add/marina" className="link">
              <FaPlusCircle className="icon" />
              <span>Add new marina</span>
            </Link>
          </div>
          <div className="option">
            <Link to="/add/seller" className="link">
              <FaPlusCircle className="icon" />
              <span>Add Seller</span>
            </Link>
          </div>
          <div className="option">
            <Link to="/add/Admin" className="link">
              <FaPlusCircle className="icon" />
              <span>Add Admin</span>
            </Link>
          </div>
          <div className="option">
            <FaCopy className="icon" />
            <span>Create booking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddType;
