import React, { useEffect } from 'react';
import { FaCopy, FaPlusCircle } from 'react-icons/fa';
import './AddType.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const AddType = () => {
 
  const navigate = useNavigate();

  // Fetching username from session storage
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    alert('Session expired. Please log in again.');
    navigate('/login');
   // return <div>Error: {error.message}</div>;
  }

  return (
    <div className="add-type-page">
      <div className="content">
        <h2>Welcome back {username}</h2>
        <p>Start a new listing</p>
        <div className="options">
          {userRoleData === 'seller' && (
            <>
              <div className="option">
                <Link to="/add/boat" className="link">
                  <FaPlusCircle className="icon" />
                  <span>Create a new listing</span>
                </Link>
              </div>
              <div className="option">
                <FaCopy className="icon" />
                <span>Create booking</span>
              </div>
            </>
          )}
          {userRoleData === 'admin' && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddType;
