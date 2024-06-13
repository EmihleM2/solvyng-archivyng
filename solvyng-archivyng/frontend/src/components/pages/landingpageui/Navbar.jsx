import React from "react";

const DashboardNavbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img src="src/components/assets/logo.png" width='130' alt="" />
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#services">Services</a>
                  </li>
                  <li className="nav-item">
                    <a className="btn btn-primary" href="#">Login</a>
                  </li>
                  <li className="nav-item ms-2">
                    <a href="#contact" className="btn btn-primary">Contact Us</a>
                  </li>
                </ul>
               
              </div>
            </div>
          </nav>
    )
}

export default DashboardNavbar;