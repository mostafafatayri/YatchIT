import React, { useState, useEffect } from 'react';
import './Navbar.scss';

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
      <div className="logo">TripFinder.</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#explore">Explore</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#help">Help</a></li>
        <li><a href="#other-pages">Other Pages</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
