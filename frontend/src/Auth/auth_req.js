// src/Auth/AuthReq.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Verify from "../utils/Verify"; // ✅ default import

const AuthReq = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await Verify(otp, navigate);
      alert("✅ OTP verified successfully!");
    } catch (error) {
      alert(error.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleVerify} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
        <input
          type="text"
          placeholder="6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 py-2 rounded hover:bg-yellow-500"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default AuthReq;
