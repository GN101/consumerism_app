import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AlternateThemeContext from '../../../Context/AlternateTheme-context';
import './SideNavbar.css';

const SideNavbar = ({ toggleNav }) => {
  const { theme, setTheme } = useContext(AlternateThemeContext);
  return (
    <div>
      <div id="sideNavId" className={theme ? 'sideNav' : 'sideNav_dark'}>
        <ul id="sideNavItem">
          <li>
            <Link onClick={toggleNav} to="/">
              About
            </Link>
          </li>
          <li>
            <Link onClick={toggleNav} to="/login">
              Sign In
            </Link>
          </li>
          <li>
            <Link onClick={toggleNav} to="/signUp">
              Join
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
