import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { Style } from '@material-ui/icons';
import { colors } from '@material-ui/core';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

      <Link to='/'>
      <div className="logo" >YatchNET.</div>
      </Link>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <Link to='/explore'>
        <li><a href="#explore">Explore</a></li>
        </Link>
        <li><a href="#pricing">Pricing</a></li>
        
        <Link to="/myaccount">
        <li><a href="#help">account</a></li>
        </Link>
        <Link to='/login'>
        <li><a href="#other-pages">Login</a></li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
