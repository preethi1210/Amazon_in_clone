// src/Auth/Login.js
import React, { useEffect, useState } from "react";
import amazon from "../HomePage/images/Amazon_black.png";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("userIdentifier") || "";
    setIdentifier(saved);
    setIsPhone(/^\+?\d+$/.test(saved)); // detect phone if it starts with digits/+
  }, []);

  const signIn = async () => {
    try {
      

      const endpoint = isPhone
        ? "http://localhost:5000/api/auth/phone"
        : "http://localhost:5000/api/auth/login";
const bodyData = isPhone
        ? { phoneNumber: identifier, password }
        : { email: identifier, password };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });


if (!res.ok) {
  const text = await res.text(); // fallback for errors
  console.error("Login failed:", text);
  alert("Login failed: " + text);
  return;
}

const data = await res.json();
localStorage.setItem("token", data.token);
alert("Login successful!");
navigate("/home");

     

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <img src={amazon} alt="Amazon" className="w-20 mb-5" />
      <div className="border border-gray-400 p-6 w-[350px]">
        <h2 className="text-xl font-bold mb-2">Sign in</h2>

        {/* Identifier input (phone or email) */}
        <label className="block text-sm font-semibold mb-1">
          Email or mobile phone number
        </label>
        {isPhone ? (
          <PhoneInput
            country={"in"}
            value={identifier}
            onChange={(value, country, e, formattedValue) => {
              setIdentifier(formattedValue);
              setIsPhone(/^\+\d+$/.test(formattedValue));
            }}
            inputStyle={{ width: "100%" }}
            countryCodeEditable={false}
          />
        ) : (
          <input
            type="text"
            value={identifier}
            onChange={(e) => {
              const val = e.target.value;
              setIdentifier(val);
              setIsPhone(/^\+?\d+$/.test(val));
            }}
            className="w-full border border-gray-400 px-3 py-2 rounded"
          />
        )}

        {/* Password input */}
        <label className="block text-sm font-semibold mb-1 mt-4">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-400 px-3 py-2 rounded"
        />

        <p
          className="text-blue-500 text-sm mt-1 hover:underline cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </p>

        <button
          onClick={signIn}
          className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded mt-4 w-full"
        >
          Sign in
        </button>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="flex justify-center mt-10 gap-4 text-sm text-blue-500">
        <a href="#" className="hover:underline">
          Conditions of Use
        </a>
        <a href="#" className="hover:underline">
          Privacy Notice
        </a>
        <a href="#" className="hover:underline">
          Help
        </a>
      </div>

      <p className="text-xs text-center text-gray-600 mt-4">
        © 1996–2025, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
};

export default Login;
