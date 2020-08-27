import React from 'react';
import './Navbar.css';

const Navbar = props => (
  <header className="navbar">
    <nav className="navbar_navigation">
      <div></div>
      <div className="navbar_logo"><a href="/">CONSUMERISM</a></div>
      <div className="spacing"></div>
      <div className="navbar_navigation-item">
        <ul>
          <li><a href="/">About</a></li>
          <li><a href="/">Sign In</a></li>
          <li><a href="/">join</a></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Navbar;