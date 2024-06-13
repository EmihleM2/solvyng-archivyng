import React from 'react';
import './styling/landingpage.css';
import Banner from './landingpageui/Banner';
import Contact from './landingpageui/Contact';
import Documents from './landingpageui/Documents';
import DashboardNavbar from './landingpageui/Navbar';
import Pricing from './landingpageui/Pricing';
import SemiBanner from './landingpageui/SemiBanner';
import Services from './landingpageui/Services';

const LandingPage = () => {
  return (
    <div className='landing-page'>
    <DashboardNavbar />
    <Banner />
    <Services />
    <SemiBanner />
    <Documents />
    <Pricing />
    <Contact />
  </div>
  );
};

export default LandingPage;
