import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar/SideNavbar';
import AlternateTheme from '../AlternateTheme/AlternateTheme';

const Navbar = () => {
  const [openSideNav, setOpenSideNav] = useState(false);

  const toogleNav = () => {
    if (openSideNav) {
      document.getElementById('sideNavId').style.top = '-1024px';
      setOpenSideNav(false);
    } else {
      document.getElementById('sideNavId').style.top = '50px';
      setOpenSideNav(true);
    }
  };
  return (
    <>
      <header id="navbar" className="navbar">
        <nav id="navNav" className="navbar_navigation">
          <Link to="/">
            <div className="navbar_logo">CONSUMERISM</div>
          </Link>
          <button type="button" onClick={toogleNav} className="burgerIcon ">
            &#9776;
          </button>
          <div className="navbar_navigation-items">
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
          <AlternateTheme />
        </nav>
      </header>
      <SideNavbar />
    </>
  );
};

export default Navbar;
