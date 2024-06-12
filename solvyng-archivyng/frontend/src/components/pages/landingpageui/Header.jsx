import React from "react";
import Navbar from "./Navbar";
import '../../../../aos/dist/aos.css';

const Header = () => {

    return (
        <section className="header">
            <div className="container">
                <Navbar />
                <div className="bottom-content mt-5 pt-5">
                    <div className="scaner-card card border-0 p-3">
                        <h2>Start play for exclusive Fishing, Slots and more!</h2>
                        <span>SCAN ME TO PLAY NOW!</span>
                       <div className="scaner-img">
                        <img src="src/components/assets/qr.png" alt="" />
                       </div>
                    <div className="golden-img">
                    <img src="src/components/assets/gold1.png" alt="" />
                    </div>
                    </div>
                  <div className="app-img d-flex">
                  <img src="src/components/assets/google.png" alt="" />
                    <img src="src/components/assets/app.png" alt="" className="ms-2" />
                  </div>
                </div>
            </div>
        </section>
    )
}

export default Header;