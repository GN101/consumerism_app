import React from 'react';
import { Link } from 'react-router-dom';
import './SideNavbar.css';

const SideNavbar = () => (
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
);

export default SideNavbar;
