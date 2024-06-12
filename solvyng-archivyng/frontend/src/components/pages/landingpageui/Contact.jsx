import React, { useEffect } from 'react';
import AOS from 'aos';
import '../../../../aos/dist/aos.css';


const Contact = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      delay: 0,
      duration: 1000,
    });
  }, []);

  return (
    <section className="contact_wrapper py-5" data-aos="fade-up" id='contact'>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="contact-left-side">
              <h4>Want to know more?</h4>
              <p>Whether you need some basic information about our electronic signature solutions or you’d like a customised quote for your unique business needs, we’re here to help you to get your questions answered
              </p>

              <div className="socials">
                <div className="social-item mb-4">
                  <img src="src/components/assets/phone.svg" alt=""/>
                  <span>073 251 0893</span>
                </div>

                <div className="social-item mb-4">
                  <img src="src/components/assets//Email.svg" alt="" />
                  <span>hello@solvyng.io</span>
                </div>

                <div className="social-item mb-4" style={{ justifyContent: 'baseline' }}>
                  <img src="src/components/assets/Vector.svg" alt="" />
                  <span>Upper Ground <br/>160 Jan Smuts Avenue <br/> Rosebank Johannesburg</span>
                </div>
                <div className="social-item">
                  <img src="src/components/assets/linkedin.svg" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="contact-form ps-5">
              <form action="">
                <div className="form-group mb-4">
                  <div className="input-with-icon">
                    <input type="text" className="form-control" placeholder="Enter Your Full Name" />
                    <span className="icon"><i className="fas fa-user"></i></span>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <div className="input-with-icon">
                    <input type="email" className="form-control" placeholder="Enter Your Email Address" />
                    <span className="icon"><i className="fa-solid fa-envelope"></i></span>
                  </div>
                </div>



                <div className="form-group mb-5">
                  <textarea cols="30" rows="4" className="form-control" placeholder="   Write Your Message"></textarea>
                </div>

                <button className="btn btn-primary">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
