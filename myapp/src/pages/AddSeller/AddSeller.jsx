import React, { useReducer, useState, useEffect } from 'react';
import './AddSeller.scss';
import { sellerReducer, INITIAL_SELLER_STATE } from '../../reducers/SellerReducer';
import newRequest from '../../utils/newRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import uploadToCloudinary from '../../utils/upload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';


const AddSeller = () => {
  const [state, dispatch] = useReducer(sellerReducer, INITIAL_SELLER_STATE);
  const [boats, setBoats] = useState([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_INPUT', payload: { name, value } });
  };

  const handleBoatSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch({ type: 'ADD_BOAT_ID', payload: value });
    } else {
      dispatch({ type: 'REMOVE_BOAT_ID', payload: value });
    }
  };

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    dispatch({ type: 'SET_PROFILE_PHOTO', payload: file });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  const handleDateChange = (date) => {
    dispatch({ type: 'SET_YEARS_OF_EXPERIENCE', payload: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const profilePhotoUrl = state.profilePhoto ? await uploadToCloudinary(state.profilePhoto) : null;
      const sellerData = { ...state, profilePhoto: profilePhotoUrl };
      mutation.mutate(sellerData);
    } catch (error) {
      console.error('Failed to upload profile photo', error);
    } finally {
      setUploading(false);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (sellerData) => {
      const headers = {
        'Content-Type': 'application/json',
      };
  
      console.log('Sending sellerData:', sellerData);
  
      return newRequest.post('/adminActions/create_seller', sellerData, { headers });
    },
    onSuccess: () => {
      alert('Seller was added successfully');
      queryClient.invalidateQueries(['sellers']);
      navigate('/add');
    },
    onError: (error) => {
      alert(`Failed to add seller: ${error.message}`);
    },
  });

  return (
    <div className="add-seller-page">
      <div className="form-container">
        <h2>Add New Seller</h2>
        <form onSubmit={handleSubmit}>
          <div className="profile-photo-upload" {...getRootProps()}>
            <input {...getInputProps()} />
            {state.profilePhoto ? (
              <img src={URL.createObjectURL(state.profilePhoto)} alt="Profile Preview" />
            ) : (
              <p>Drag and drop a profile photo here, or click to select one</p>
            )}
          </div>
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={state.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={state.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={state.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={state.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Years of Experience</label>
            <DatePicker
              selected={state.yearsOfExperience}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={15}
            />
          </div>
          <div className="input-group">
            <label>Boats</label>
            <div className="boats-selection">
              {boats.map(boat => (
                <div key={boat._id}>
                  <input
                    type="checkbox"
                    value={boat._id}
                    onChange={handleBoatSelection}
                  />
                  <span>{boat.title}</span>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add Seller'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSeller;
