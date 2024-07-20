import React from 'react';
import { FaCopy, FaPlusCircle } from 'react-icons/fa';
import './AddType.scss';
import { Link } from '@material-ui/core';

const AddType = () => {
  return (
    <div className="add-type-page">
      <div className="content">
        <h2>Welcome back Helene</h2>
        <p>Start a new listing</p>
        <div className="options">
            
       
          <div className="option">
            <FaPlusCircle className="icon" />
            
            <span>Create a new listing</span>
           
          </div>
         
          <div className="option">
            <FaCopy className="icon" />
            <span>Creat booking </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddType;
