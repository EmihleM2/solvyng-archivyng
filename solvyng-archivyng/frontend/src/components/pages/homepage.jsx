// import React, { useState } from 'react';
import './styling/homepage.css';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate()

  async function handleSignOut() {
    try {
      await signOut()
      console.log("Logout works");
      navigate("/login");
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <><h1>Landing Page</h1><div>
      <button type="submit" className="button-landpage" onClick={handleSignOut}> Log Out </button>
    </div></>

  );
};

export default HomePage;
