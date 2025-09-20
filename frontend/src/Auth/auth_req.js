// src/Auth/auth_req.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import amazon from "../HomePage/images/Amazon_black.png";
import Verify from "../utils/Verify";
import { sendOtp } from "../utils/send_otp";

const AuthReq = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const phone = localStorage.getItem("phoneNumber") || "";
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendCooldown]);

  const handleContinue = async () => {
    if (!otp || otp.length < 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      setLoading(true);
      await Verify(otp, navigate);
    } catch (err) {
      alert("OTP verification failed: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phone) return alert("No phone number found.");
    try {
      setLoading(true);
      await sendOtp(phone);
      alert("OTP resent!");
      setResendCooldown(30);
    } catch (err) {
      console.error("Resend OTP error:", err);
      alert("Failed to resend OTP: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <img src={amazon} alt="Amazon" className="w-20 mb-5" />
      <div className="border border-gray-400 p-6 w-[350px]">
        <h2 className="text-xl font-bold mb-2">Authentication required</h2>

        <p className="mb-2">
          {phone}{" "}
          <span
            onClick={() => navigate("/intent")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Change
          </span>
        </p>

        <p className="mb-4 text-sm">
          We’ve sent a One Time Password (OTP) to the mobile number above. Please enter it to complete verification.
        </p>

        <label className="block text-sm font-semibold mb-1">Enter OTP</label>
        <input
          ref={inputRef}
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="w-full border border-gray-400 px-3 py-2 rounded"
          placeholder="Enter 6-digit code"
          maxLength={6}
        />

        <button
          onClick={handleContinue}
          disabled={loading || otp.length < 6}
          className={`${
            loading || otp.length < 6 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300"
          } py-2 px-4 rounded mt-4 w-full`}
        >
          {loading ? "Verifying..." : "Continue"}
        </button>

        <button
          onClick={handleResend}
          disabled={loading || resendCooldown > 0}
          className="text-blue-500 text-sm mt-2 hover:underline cursor-pointer w-full text-center disabled:text-gray-400"
        >
          {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
        </button>

        <hr className="my-4 border-gray-300" />
        <p className="text-center text-sm text-gray-600">or</p>

        <button
          onClick={() => alert("WhatsApp OTP not implemented yet")}
          className="bg-green-100 hover:bg-green-200 py-2 px-4 rounded mt-4 w-full"
        >
          Send OTP to WhatsApp
        </button>

        <button
          onClick={() => navigate("/signin")}
          className="border border-gray-400 py-2 px-4 rounded mt-4 w-full"
        >
          Sign in with your password
        </button>
      </div>
      {/* DO NOT render another recaptcha container here */}
    </div>
  );
};

export default AuthReq;
