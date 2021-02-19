import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [value, setValue] = useState(false);

  const toogleNav = () => {
    if (value) {
      document.getElementById('sideNavId').style.top = '-1024px';
      setValue(false);
    } else {
      document.getElementById('sideNavId').style.top = '50px';
      setValue(true);
    }
  };

  return (
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
};

export default Navbar;
