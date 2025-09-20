import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { sendOtp } from "../utils/send_otp";
import amazonLogo from "../HomePage/images/Amazon_black.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleVerifyMobile = async () => {
  if (!name || !mobileNumber || !password) {
    alert("Please fill all fields");
    return;
  }
  if (!mobileNumber.startsWith("+")) {
    alert("Phone must be in international format, e.g. +91XXXXXXXXXX");
    return;
  }

  try {
    setLoading(true);

    // 1️⃣ Check if phone already registered
    const res = await fetch("http://localhost:5000/api/auth/check-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: mobileNumber }),
    });
    const data = await res.json();

    if (data.exists) {
      alert("Phone already registered. Redirecting to login...");
      navigate("/signin");
      return;
    }

    // 2️⃣ Send OTP
    await sendOtp(mobileNumber);

    // 3️⃣ Save data temporarily
    localStorage.setItem("name", name);
    localStorage.setItem("phoneNumber", mobileNumber);
    localStorage.setItem("password", password);

    alert("OTP sent!");
    navigate("/auth-req"); // go to OTP page
  } catch (err) {
    console.error("Error:", err);
    alert("Failed: " + (err?.message || "Unknown error"));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col items-center mt-20">
      <div id="recaptcha-container"></div> {/* MUST exist */}
      <img src={amazonLogo} alt="Amazon" className="w-20 mb-5" />
      <div className="border border-gray-400 p-6 w-[350px]">
        <h2 className="text-xl font-bold mb-4">Create Account</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <PhoneInput
          country="in"
          value={mobileNumber}
          onChange={(val) => setMobileNumber("+" + val)}
          inputStyle={{ width: "100%" }}
          containerStyle={{ marginBottom: "10px" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <button
          onClick={handleVerifyMobile}
          disabled={loading}
          className={`${
            loading ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300"
          } py-2 px-4 rounded w-full`}
        >
          {loading ? "Sending…" : "Verify mobile number"}
        </button>
      </div>
    </div>
  );
};

export default Register;
