import React, { useState } from 'react';
import './AddMarina.scss';
import newRequest from '../../utils/newRequest';

const AddMarina = () => {
  const [marinaName, setMarinaName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [facilities, setFacilities] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post('/marina/addMarina', {
        marinaName,
        location,
        capacity,
        facilities,
        contact,
        description,
      },{ withCredentials: true} );
      console.log(response.data);
      alert('Marina added successfully');
    } catch (error) {
      console.error('Error adding marina', error);
      alert('Error adding marina');
    }
  };

  return (
    <div className="add-marina-page">
      <div className="form-container">
        <h2>Add New Marina</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Marina Name</label>
            <input
              type="text"
              placeholder="Enter marina name"
              value={marinaName}
              onChange={(e) => setMarinaName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Capacity</label>
            <input
              type="number"
              placeholder="Enter capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Facilities</label>
            <input
              type="text"
              placeholder="Enter facilities"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contact Information</label>
            <input
              type="text"
              placeholder="Enter contact information"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-submit">Add Marina</button>
        </form>
      </div>
    </div>
  );
};

export default AddMarina;
