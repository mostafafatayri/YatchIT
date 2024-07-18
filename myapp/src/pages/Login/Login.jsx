import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import Ending from '../../components/Ending/End';
import newRequest from "../../utils/newRequest";

const Login = () => {
  return (
    <div>
      <div className="login-page">
        <div className="login-container">
          <h1>SIGN IN</h1>
          <p>Welcome Back! Please enter your details</p>
          <form>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
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
