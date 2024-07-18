import React, { useState, useEffect } from 'react';
import './Signup.scss';
import Ending from '../../components/Ending/End';
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
    const location = useLocation();
    const userId = location.state?.userId;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await newRequest.post('/auth/registration/verifyOTP', { userId, otp });
      if (response.status === 200) {
        const { token, info } = response.data;
        
        // Save token and user info to local storage
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(info));
        
        alert("OTP verified successfully");
        navigate("/myaccount"); // Redirect to the next step after successful verification
      } else {
        //alert(response.data);
        setError('Failed to verify OTP');
      }
    } catch (error) {
      setError('Failed to verify OTP');
    }
  };
  

  const handleResend = async () => {
    try {
      await newRequest.post('/auth/registration/resendOTP',{userId});
      setResendTimer(60);
      setCanResend(false);
    } catch (error) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div>
      <div className="signup-page">
        <div className="signup-container">
          <h2>VERIFY YOUR EMAIL:</h2>
          <p>Welcome! Please enter the OTP sent to your email</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP Code:</label>
              <input 
                type="text" 
                id="otp" 
                placeholder="Enter your OTP code here" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="signup-btn">Verify</button>
          </form>
          <div className="resend-otp">
            {canResend ? (
              <button onClick={handleResend} className="resend-btn">Resend OTP</button>
            ) : (
              <p>Resend OTP in {resendTimer} seconds</p>
            )}
          </div>
        </div>
      </div>
      <Ending />
    </div>
  );
};

export default VerifyEmail;
