import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlternateThemeContext from '../../../Context/AlternateTheme-context';
import './SideNavbar.css';
import { signOut } from '../../../firebase/firebase';
import { UserContext } from '../../../Context/UserProvider';
import UpdateUserData from '../../../Context/UpdateUserData';

const SideNavbar = ({ toggleNav }) => {
  const { theme } = useContext(AlternateThemeContext);
  const updatedData = useContext(UpdateUserData);
  const user = useContext(UserContext);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (document.cookie.length > 347) {
      setReveal(true);
    }
  }, [updatedData]);

  return (
    <div>
      <div id="sideNavId" className={theme ? 'sideNav' : 'sideNav_dark'}>
        {user ? (
          <ul id="sideNavItem">
            {reveal ? (
              <li>
                <Link onClick={toggleNav} to="/results">
                  Results
                </Link>
              </li>
            ) : null}
            <li>
              <Link to="/login" onClick={signOut}>
                Log out <br></br>({user.displayName})
              </Link>
            </li>
          </ul>
        ) : (
          <ul id="sideNavItem">
            {reveal ? (
              <li>
                <Link onClick={toggleNav} to="/results">
                  Results
                </Link>
              </li>
            ) : null}
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
