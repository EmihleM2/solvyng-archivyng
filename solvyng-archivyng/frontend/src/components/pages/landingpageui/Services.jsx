import React from 'react'
import '../styling/landingpage.css';
import '../../../../aos/dist/aos.css';

const Services = () => {
  return (
    <>
    <section className="service_wrapper py-5" data-aos="fade-up" id='services'>
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-3 mb-3">
                        <img src="src/components/assets/icon1.svg" alt=""/>
                        <h6 className="py-3">Approve Documents</h6>
                        <p>Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="col-md-3 mb-3">
                        <img src="src/components/assets/icon2.svg" alt=""/>
                        <h6 className="py-3">E-signature</h6>
                        <p>Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="col-md-3 mb-3">
                        <img src="src/components/assets/icon3.png" alt=""/>
                        <h6 className="py-3">Share Media</h6>
                        <p>Drive can provide encrypted and secure access to your files. </p>
                    </div>

                    <div className="col-md-3 mb-3">
                        <img src="src/components/assets/icon4.svg" alt=""/>
                        <h6 className="py-3">Virtually unlimited storage</h6>
                        <p>Drive can provide encrypted and secure access to your files. </p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Services