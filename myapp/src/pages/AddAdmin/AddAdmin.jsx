import React, { useReducer, useState, useEffect } from 'react';
import './AddAdmin.scss';
import { sellerReducer, INITIAL_SELLER_STATE } from '../../reducers/SellerReducer';
import newRequest from '../../utils/newRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import uploadToCloudinary from '../../utils/upload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const AddAdmin = () => {
  const [state, dispatch] = useReducer(sellerReducer, INITIAL_SELLER_STATE);
  const [boats, setBoats] = useState([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const userInfo = sessionStorage.getItem("userInfo");
  const userData = userInfo ? JSON.parse(userInfo) : {};
  const username = userData.firstname;
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
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_INPUT', payload: { name, value } });
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

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      
      const sellerData = { ...state  };
      mutation.mutate(sellerData);
    } catch (error) {
      console.error('Failed to upload profile photo', error);
    } finally {
      setUploading(false);
    }
  };

  

  const mutation = useMutation({
    mutationFn: async (sellerData) => {
      const headers = {
        'Content-Type': 'application/json',
      };
  
      console.log('Sending sellerData:', sellerData);
  
      return newRequest.post('/adminActions/create_admin', sellerData, { headers });
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
        <h2>Add New Admin</h2>
        <form onSubmit={handleSubmit}>
        
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
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={state.password}
              onChange={handleInputChange}
            />
          </div>
         
        
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add Seller'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
