import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <header id="navbar" className="navbar">
    <nav className="navbar_navigation">
      <Link to="/">
        <div className="navbar_logo">CONSUMERISM</div>
      </Link>
      <button onClick={OpenNav} className="burger">
        &#9776;
      </button>
      <div className="spacing"></div>
      <div className="navbar_navigation-item">
        <ul id="nni">
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Sign In</a>
          </li>
          <Link to="/signUp">
            <li>join</li>
          </Link>
        </ul>
      </div>
    </nav>
  </header>
);

const OpenNav = () => {
  if (document.getElementById('nni').style.display === 'none') {
    document.getElementById('nni').style.display = 'flex';
    document.getElementById('navbar').style.height = '100%';
    document.getElementById('navbar').style.width = '50%';
  } else {
    document.getElementById('nni').style.display = 'none';
    document.getElementById('navbar').style.height = '50px';
    document.getElementById('navbar').style.width = '50px';
  }
};

export default Navbar;
