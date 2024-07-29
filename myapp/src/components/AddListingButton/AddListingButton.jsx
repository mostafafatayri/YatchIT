import React from 'react';
import { Link } from 'react-router-dom';
import './AddListingButton.scss';

const AddListingButton = () => {
  return (
    <div className="add-listing-button">
      <Link to="/add/listing" className="link">
        + Add Listing
      </Link>
    </div>
  );
};

export default AddListingButton;
