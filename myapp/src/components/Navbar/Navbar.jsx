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
      <div className="logo" >YatchNEt.</div>
      </Link>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <Link to='/explore'>
        <li><a href="#explore">Explore</a></li>
        </Link>

        <Link to='/add'>
        <li><a href="#pricing">Admin Actions</a></li>
        </Link>

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
