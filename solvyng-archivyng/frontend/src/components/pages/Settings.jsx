import React from 'react';
import { NavLink } from 'react-router-dom';
import './styling/settings.css';
import NavBar from "../pages/Navbar.jsx";

const Settings = () => {
  return (
    <>
    <NavBar/>
    <hr className='settings-hr'/>
    <nav className="settings-navbar">
      <ul className="settings-navbar-nav">
        <li className="settings-nav-item">
          <NavLink to="/Account" className="settings-nav-link">Account</NavLink>
        </li>
        <li className="settings-nav-item">
          <NavLink to="/Billing" className="settings-nav-link">Billing</NavLink>
        </li>
        <li className="settings-nav-item">
          <NavLink to="/Language" className="settings-nav-link">Language and Time</NavLink>
        </li>
        <li className="settings-nav-item">
          <NavLink to="/Information" className="settings-nav-link">Information</NavLink>
        </li>
      </ul>
    </nav>
    </>
  );
};

export default Settings;
