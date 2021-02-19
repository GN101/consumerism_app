import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <>
    <header id="navbar" className="navbar">
      <nav id="navNav" className="navbar_navigation">
        <Link to="/">
          <div className="navbar_logo">CONSUMERISM</div>
        </Link>
        <button type="button" onClick={toogleNav} className="burger">
          &#9776;
        </button>
        <div className="spacing"></div>
        <div className="navbar_navigation-item">
          <ul id="navNavItem">
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
    <div>
      <div id="sideNavId" className="sideNav">
        <ul id="sideNavItem">
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
    </div>
  </>
);

const toogleNav = () => {
  if (document.getElementById('sideNavId').style.top !== '-1024px') {
    document.getElementById('sideNavId').style.top = '-1024px';
    document.getElementById('sideNavItem').style.display = 'none';
    console.log('open');
  } else {
    console.log('close');
    document.getElementById('sideNavItem').style.display = 'block';
    document.getElementById('sideNavId').style.top = '50px';
  }
};

export default Navbar;
