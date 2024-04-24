// import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
// import { signOut } from 'aws-amplify/auth';
// import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HomePage = () => {
  // const navigate = useNavigate()

  // async function handleSignOut() {
  //   try {
  //     await signOut()
  //     console.log("Logout works");
  //     navigate("/login");
  //   } catch (error) {
  //     console.log('error signing out: ', error);
  //   }
  // }
  // return (
  //   <><h1>Landing Page</h1><div>
  //       <button type="submit" className="button-landpage" onClick={handleSignOut}> Log Out </button>
  //     </div></>

  // );

  // return (
  //   <>
  //     <h1>Landing Page for Signed In users</h1>
  //     <div>
  //       <button
  //         type="submit"
  //         className="button-landpage"
  //         // onClick={handleSignOut}
  //       >
  //         {" "}
  //         Log Out{" "}
  //       </button>
  //     </div>
  //   </>
  // );
   return (
     <div>
      <Dashboard/>

     </div>
   );
};

export default HomePage;
