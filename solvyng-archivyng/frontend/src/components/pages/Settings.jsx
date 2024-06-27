import React from 'react';
import { NavLink } from 'react-router-dom';
// import './styling/settings.css';
import styles from "../pages/styling/Settings.module.css"; 

import NavBar from "../pages/Navbar.jsx";

const Settings = () => {
  return (
    <>
      <NavBar />
      <hr className={styles["settings-hr"]} />
      <nav className={styles["settings-navbar"]}>
        <ul className={styles["settings-navbar-nav"]}>
          <li className={styles["settings-nav-item"]}>
            <NavLink to="/Account" className={styles["settings-nav-link"]}>
              Account
            </NavLink>
          </li>
          <li className={styles["settings-nav-item"]}>
            <NavLink to="/Billing" className={styles["settings-nav-link"]}>
              Billing
            </NavLink>
          </li>
          <li className={styles["settings-nav-item"]}>
            <NavLink to="/Language" className={styles["settings-nav-link"]}>
              Language and Time
            </NavLink>
          </li>
          <li className={styles["settings-nav-item"]}>
            <NavLink to="/Information" className={styles["settings-nav-link"]}>
              Information
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Settings;
