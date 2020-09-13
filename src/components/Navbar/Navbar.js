import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <header className="navbar">
    <nav className="navbar_navigation">
      <div></div>
      <Link to="/">
        <div className="navbar_logo">CONSUMERISM</div>
      </Link>
      <div className="spacing"></div>
      <div className="navbar_navigation-item">
        <ul>
          <li><a href="/">About</a></li>
          <li><a href="/">Sign In</a></li>
          <Link to="/signUp">
            <li>join</li>
          </Link>
        </ul>
      </div>
    </nav>
  </header>
);

export default Navbar;
