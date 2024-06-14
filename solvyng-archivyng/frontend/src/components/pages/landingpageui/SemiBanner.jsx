import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SemiBanner = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
    });
  }, []);

  return (
    <section className="semi_wrapper py-5" data-aos="fade-up">
      <div className="container">
        <div className="semi-content text-center">
          <h5>Our SaaS application supports a variety of services</h5>
          <button className="btn btn-primary mt-4">See all</button>
        </div>
      </div>
    </section>
  );
}

export default SemiBanner;
