import React, { useState ,useEffect} from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import Ending from '../../components/Ending/End';
import newRequest from "../../utils/newRequest";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  


  useEffect(() => {
    const logout = async () => {
      try {
        console.log("print test ");
        await newRequest.post('/auth/logout', {}, { withCredentials: true });
        sessionStorage.removeItem('userInfo');
      } catch (error) {
        console.error('Failed to logout', error);
      }
    };

    logout();
  }, [navigate]);
  
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post('/auth/login', { email, password }, { withCredentials: true });
      if (response.status === 200) {
        const { info } = response.data;
        sessionStorage.setItem('userInfo', JSON.stringify(info));
        
        navigate('/myaccount');
      } else {
        setError('Failed to login');
      }
    } catch (error) {
      setError('Failed to login');
      if (error.response && error.response.status === 403) {
        // User is not verified
        setError(error.response.data.message);
        console.log("the id of the user "+error.response.data.data.userId);
        navigate('/verifyEmail', { state: { userId: error.response.data.data.userId } }); // Pass userId or email to verification page
      } else {
        setError('Failed to login. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-container">
          <h1>SIGN IN</h1>
          <p>Welcome Back! Please enter your details</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="options">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#">Forget Password?</a>
            </div>
            <button type="submit" className="btn-signin">Sign In</button>
          </form>
          <p className="create-account">
            Not a member yet?
            <Link to='/registration'>
              <a href="#">Create an account</a>
            </Link>
          </p>
          <div className="divider">
            <span></span>
            <span>Or</span>
            <span></span>
          </div>
          <div className="social-login">
            <button className="btn-facebook">
              <FaFacebookF className="icon" /> Sign up with Facebook
            </button>
            <button className="btn-google">
              <FaGoogle className="icon" /> Sign up with Google
            </button>
            <button className="btn-apple">
              <FaApple className="icon" /> Sign up with Apple
            </button>
          </div>
        </div>
      </div>
      <Ending />
    </div>
  );
};

export default Login;
