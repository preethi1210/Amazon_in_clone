import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/Home';
import SignIn from './Auth/SignIn';
import Step2 from './Auth/Step2';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AuthReq from './Auth/auth_req';
import VerifyPage from './Auth/VerifyPage';
import Cart from "./HomePage/Cart"
import PrivateRoute from './components/privateRoute';
import Checkout from './HomePage/Checkout';
import Payment from './HomePage/Payments';
import Orders from './HomePage/Orders';
import CategoryPage from "./HomePage/Categorypage";
import ProductsPage from './HomePage/Productspage';
import Account from './HomePage/Account';
import CustomerService from "./HomePage/CustomerService";

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
        <Route path="/verify_otp" element={<VerifyPage />} />
     <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
     <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
     <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
     <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
     <Route path="/account" element={<PrivateRoute><  Account /></PrivateRoute>} />
     <Route path="/category/:category" element={<CategoryPage />} />

     <Route path="/products/:category" element={<ProductsPage />} />
     <Route path="/customer-service" element={<CustomerService />} />

     <Route path="/products" element={<ProductsPage />} />

        {/* Add more routes here */}
      </Routes>

      {/* 🔒 reCAPTCHA must be rendered and kept alive */}
      <div id="recaptcha-container"></div>
    </>
  );
}

export default App;
