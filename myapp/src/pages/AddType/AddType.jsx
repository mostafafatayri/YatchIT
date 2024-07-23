import React from 'react';
import { FaCopy, FaPlusCircle } from 'react-icons/fa';
import './AddType.scss';
import { Link } from 'react-router-dom'; // Use react-router-dom instead of @material-ui/core

const AddType = () => {
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
            <FaCopy className="icon" />
            <span>Creat booking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddType;
