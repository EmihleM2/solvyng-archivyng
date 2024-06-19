import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
    });
  }, []);
  
  const navigate = useNavigate()

  const RegisterLink = () => {
    navigate("/signup");
  }

  return (
    <section className="banner_wrapper py-5" data-aos="fade-up">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6">
            <div className="banner-content">
              <h3>Take control over your <br /> brand’s growth on <br /> Amazon</h3>
              <p className="py-4">Upsly partners exclusively with manufacturing brands to create custom solutions for accelerated growth.</p>
              <div className="banner-btn">
                <button className="btn btn-primary" onClick={RegisterLink}>Register</button>
                <button className="btn btn-outline-info text-primary ms-3" id='allplans'>View all plans</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="banner-img">
              <img src="src/components/assets/banner-img.png" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
