import React from "react";
import '../styling/landingpage.css';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const LoginLink = () => {
    navigate("/login");
  }
  return (
    <nav className="navbar-landpage">
      <div className="navbar-container-landpage">
        <a className="navbar-brand-landpage" href="#">
          <img src="src/components/assets/logo.png" width='130' alt="Logo" />
        </a>
        <div className="navbar-collapse-landpage">
          <ul className="navbar-nav-landpage">
            <li className="nav-item-landpage">
              <a className="nav-link-landpage" href="#services">Services</a>
            </li>
            <li className="nav-item-landpage">
              <a className="nav-link-landpage" href="#contact">Contact Us</a>
            </li>
            <li className="nav-item-landpage">
              <a className="btn-landpage btn-custom-login-landpage" href="#" onClick={LoginLink}>Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
