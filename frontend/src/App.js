import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/Home';
import SignIn from './Auth/SignIn';
import Step2 from './Auth/Step2';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AuthReq from './Auth/auth_req';
import Verify from './utils/Verify';
import Cart from "./HomePage/Cart"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/intent" element={<Step2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth-req" element={<AuthReq />} />
        <Route path="/verify_otp" element={<Verify />} />
        <Route path="/cart" element={<Cart />} />
        {/* Add more routes here */}
      </Routes>

      {/* 🔒 reCAPTCHA must be rendered and kept alive */}
      <div id="recaptcha-container"></div>
    </>
  );
}

export default App;
