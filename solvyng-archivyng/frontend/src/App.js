import './App.css';
import React from 'react';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Verify from './components/auth/verify';
import HomePage from './components/pages/homepage';
import {Route, Routes} from 'react-router-dom'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import ResetPassword from './components/auth/reset-password';
import ConfirmResetPassword from './components/auth/confirm-reset-password';
//Amplify environment is to be changed before running auth pages

Amplify.configure(amplifyconfig);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/confirm-reset-password" element={<ConfirmResetPassword />} />
    </Routes>
  );
}

export default App;
