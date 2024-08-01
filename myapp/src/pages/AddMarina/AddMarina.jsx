import React, { useState ,useEffect} from 'react';
import './AddMarina.scss';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useDropzone } from 'react-dropzone';
import upload from '../../utils/upload';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';

const AddMarina = () => {
  const [marinaName, setMarinaName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [facilities, setFacilities] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
//
  const userInfo = sessionStorage.getItem("userInfo");
  const userData = userInfo ? JSON.parse(userInfo) : {};
  const username = userData.firstname;
  const navigate = useNavigate();
 
 
//
  const queryClient = useQueryClient();
  const { isLoading, error, data: userRoleData } = useQuery({
    queryKey: ['user_auth'+userData._id],
    queryFn: () =>
      newRequest.get('/auth/user_roles', { withCredentials: true }).then((res) => res.data),
    onError: (error) => {
      console.error('Failed to fetch privileges', error);

      if (error.response && error.response.status === 401) {
        console.log("we got an eror");
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        alert('Failed to fetch privileges. Please try again.');
      }
    }
  });

  useEffect(() => {
    if (userRoleData) {
      console.log("User Role Data: ", userRoleData);
      if (userRoleData === "no") {
        alert('You do not have access to this page.');
        navigate('/');
      } else {
        console.log("access");
        //alert(userRoleData);
      }
    }
  }, [userRoleData, navigate]);


  const onDrop = (acceptedFiles) => {
    const fileWithPreview = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))[0];
    setFile(fileWithPreview);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  const handleRemove = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const url = await upload(file);
      setUploading(false);
      return url;
    } catch (err) {
      console.log(err);
      setUploading(false);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImage = await handleUpload();
    if (!uploadedImage) {
      alert('Error uploading image');
      return;
    }

    try {
      const response = await newRequest.post('/marina/addMarina', {
        marinaName,
        location,
        capacity,
        facilities,
        contact,
        description,
        Image: uploadedImage,
      }, { withCredentials: true });
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
          <div className="input-group">
            <label>Upload Photo</label>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag your photo here or click to select a file</p>
            </div>
            {file && (
              <div className="photo-preview">
                <img src={file.preview} alt="preview" />
                <button className="remove-button" onClick={handleRemove}>X</button>
              </div>
            )}
          </div>
          <button type="submit" className="btn-submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add Marina'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarina;
