import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import './Signup.scss';
import Ending from '../../components/Ending/End';
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
    
      const response = await newRequest.post('/auth/register', { firstname, lastname, email, password });
      if (response.status === 200) {
        const { userId } = response.data; // Extract userId from response
        navigate("/registration/additional", { state: { userId } }); // Pass userId to additional info page
       // navigate("/registration/additional") 
      } else {
        setError('Failed to register');
      }
    } catch (error) {
      setError('Failed to register');
    }
  };

  return (
    <div>
      <div className="signup-page">
        <div className="signup-container">
          <h2>SIGN UP</h2>
          <p>Welcome Back! Please enter your details</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input 
                type="text" 
                id="firstName" 
                placeholder="First name" 
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input 
                type="text" 
                id="lastName" 
                placeholder="Last name" 
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Confirm your password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">Ive read and agree with <a href="#">Terms of Service</a> and our <a href="#">Privacy Policy</a>.</label>
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="switch-form">Already have an account? <a href="/login">Sign In</a></p>
          <div className="social-signup">
            <p>Or</p>
            <div id="buttonDiv"></div>
            <button className="social-btn facebook-btn"><FaFacebook /> Sign up with Facebook</button>
            <button className="social-btn google-btn"><FaGoogle /> Sign up with Google</button>
            <button className="social-btn apple-btn"><FaApple /> Sign up with Apple</button>
          </div>
        </div>
      </div>
      <Ending />
    </div>
  );
};

export default SignUp;
