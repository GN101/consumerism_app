import React, { useState, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar/SideNavbar';
import AlternateTheme from '../AlternateTheme/AlternateTheme';
import AlternateThemeContext from '../../Context/AlternateTheme-context';

const Navbar = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const { theme, setTheme } = useContext(AlternateThemeContext);

  const toggleNav = () => {
    if (openSideNav) {
      document.getElementById('sideNavId').style.top = '-1500px';
      document.getElementById('overlay').style.display = 'none';
      setOpenSideNav(false);
    } else {
      document.getElementById('sideNavId').style.top = '50px';
      document.getElementById('overlay').style.display = 'block';
      setOpenSideNav(true);
    }
  };
  return (
    <>
      <header id="navbar" className={theme ? 'navbar' : 'navbar_dark'}>
        <nav id="navNav" className="navbar_navigation">
          <Link to="/">
            <div className="navbar_logo">CONSUMERISM</div>
          </Link>
          <button
            type="button"
            onClick={toggleNav}
            className={theme ? 'burgerIcon' : 'burgerIcon_dark'}
          >
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
      <div className="overlay" onClick={toggleNav} id="overlay"></div>
      <SideNavbar toggleNav={toggleNav} />
    </>
  );
};

export default Navbar;
