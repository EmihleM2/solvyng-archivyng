import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Pricing = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 500,
    });
  }, []);

  return (
    <div>
      <section className="price_wrapper py-5" data-aos="fade-up" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="500" id='allplans'>
        <div className="container">
          <div className="price-header text-center mb-5 pb-5">
            <h3>Find the plan that’s right for your organisation</h3>
          </div>
          <div className="row mt-5">
            <div className="col-md-4 mb-3">
              <div className="card p-3 mt-5">
                <div className="card-header">
                  <h5>Starter Pack</h5>
                </div>
                <div className="card-body">
                  <div className="selection">
                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Start here</button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-3 centerCard">
                <div className="card-header">
                  <h5>Premium Pack</h5>
                </div>
                <div className="card-body">
                  <div className="selection">
                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-outline-primary bg-white">Start here</button>
                </div>
                <img src="src/components/assets/papular.png" alt="" />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-3 mt-5">
                <div className="card-header">
                  <h5>Enterprise Pack</h5>
                </div>
                <div className="card-body">
                  <div className="selection" style={{ lineHeight: '5px' }}>
                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item" style={{ justifyContent: 'flex-start' }}>
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="select-item">
                      <i className="fa-solid fa-check"></i>
                      <p className="ms-3">Drive can provide encrypted and secure access to your files. </p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Start here</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
