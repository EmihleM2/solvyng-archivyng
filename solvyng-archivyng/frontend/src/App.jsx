import "./App.css";
import React from "react";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Verify from "./components/auth/verify";
import { Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
import ResetPassword from "./components/auth/reset-password";
import ConfirmResetPassword from "./components/auth/confirm-reset-password";
import Dashboard from "./components/pages/Dashboard";
import Files from "./components/pages/Files";
import NavBar from "./components/pages/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bookmarks from "./components/pages/Bookmarks";
import NotificationEmails from './components/pages/NotificationEmails';
import EmailDetails from './components/pages/EmailDetails';
import Billing from './components/pages/Billing';
import Stamp from './components/pages/stamp';
import 'react-toastify/dist/ReactToastify.css';
import RecentFiles from './components/pages/RecentFiles';

import LandingPage from './components/pages/LandingPage';
//Amplify environment is to be changed before running auth pages

Amplify.configure(amplifyconfig);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Files" element={<Files />} />
        <Route path="/Bookmarks" element={<Bookmarks />} />
        <Route path="/Navbar" element={<NavBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Navbar" element={<NavBar />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/stamp" element={<Stamp />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/EmailDetails" element={<EmailDetails />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/NotificationEmails" element={<NotificationEmails />} />
        <Route path="/confirm-reset-password" element={<ConfirmResetPassword />} />
        <Route path="/RecentFiles" element={<RecentFiles/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
// import "./App.css";
// import React from "react";
// import Login from "./components/auth/login";
// import Signup from "./components/auth/signup";
// import Verify from "./components/auth/verify";
// import { Route, Routes } from "react-router-dom";
// import { Amplify } from "aws-amplify";
// import amplifyconfig from "./amplifyconfiguration.json";
// import ResetPassword from "./components/auth/reset-password";
// import ConfirmResetPassword from "./components/auth/confirm-reset-password";
// import Dashboard from "./components/pages/Dashboard";
// import Files from "./components/pages/Files";
// import NavBar from "./components/pages/Navbar";
// import {  ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Bookmarks from "./components/pages/Bookmarks";

// //Amplify environment is to be changed before running auth pages

// Amplify.configure(amplifyconfig);

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/Files" element={<Files />} />
//         <Route path="/Bookmarks" element={<Bookmarks />} />
//         <Route path="/Navbar" element={<NavBar />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify" element={<Verify />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route
//           path="/confirm-reset-password"
//           element={<ConfirmResetPassword />}
//         />
//       </Routes>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;
