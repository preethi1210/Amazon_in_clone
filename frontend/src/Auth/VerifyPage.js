// src/Auth/VerifyPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Verify from "../utils/Verify";

const VerifyPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Verify(otp, navigate);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded font-semibold"
        >
          Verify OTP
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default VerifyPage;
