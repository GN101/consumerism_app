import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AlternateThemeContext from '../../../Context/AlternateTheme-context';
import './SideNavbar.css';
import { signOut } from '../../../firebase/firebase';
import { UserContext } from '../../../Context/UserProvider';

const SideNavbar = ({ toggleNav }) => {
  const { theme } = useContext(AlternateThemeContext);
  const user = useContext(UserContext);

  return (
    <div>
      <div id="sideNavId" className={theme ? 'sideNav' : 'sideNav_dark'}>
        {user ? (
          <ul id="sideNavItem">
            <li>
              <Link onClick={toggleNav} to="/">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={signOut}>
                Log out
              </Link>
            </li>
          </ul>
        ) : (
          <ul id="sideNavItem">
            <li>
              <Link onClick={toggleNav} to="/">
                About
              </Link>
            </li>
            <li>
              <Link onClick={toggleNav} to="/login">
                Log In
              </Link>
            </li>
            <li>
              <Link onClick={toggleNav} to="/signUp">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
