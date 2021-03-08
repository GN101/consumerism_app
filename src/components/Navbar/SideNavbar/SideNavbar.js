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
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Sign In</a>
          </li>
          <Link onClick={toggleNav} to="/signUp">
            <li>join</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
