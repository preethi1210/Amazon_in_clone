import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import amazonLogo from "../HomePage/images/Amazon_black.png";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [userName, setUserName] = useState(""); // track logged-in name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Initialize from localStorage if available
  useEffect(() => {
    const savedIdentifier = localStorage.getItem("userIdentifier") || "";
    const savedName = localStorage.getItem("userName") || "";
    const token = localStorage.getItem("token") || "";

    if (savedIdentifier) setIdentifier(savedIdentifier);
    if (savedName) setUserName(savedName);
    if (savedIdentifier && token) setIsLoggedIn(true);

    setIsPhone(/^\+?\d+$/.test(savedIdentifier));
  }, []);

  const signIn = async () => {
    if (!identifier || !password) {
      alert("Please enter both email/phone and password.");
      return;
    }

    try {
      const endpoint = "http://localhost:5000/api/auth/login";
      const bodyData = isPhone
        ? { phone: identifier, password }
        : { email: identifier, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid credentials. Please try again.");
        return;
      }

      // ✅ Store info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userIdentifier", identifier);
      if (data.name) localStorage.setItem("userName", data.name);

      // ✅ Update state to reflect login immediately
      setUserName(data.name || "");
      setIsLoggedIn(true);

      alert(data.message || "✅ Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <img src={amazonLogo} alt="Amazon" className="w-20 mb-5" />

      <div className="border border-gray-400 p-6 w-[350px] rounded bg-white">
        <h2 className="text-xl font-bold mb-3">
          {isLoggedIn ? `Welcome back, ${userName}` : "Sign in"}
        </h2>

        {!isLoggedIn && (
          <>
            <label className="block text-sm font-semibold mb-1">
              Email or mobile phone number
            </label>

            {isPhone ? (
              <PhoneInput
                country="in"
                value={identifier}
                onChange={(value) => {
                  setIdentifier("+" + value);
                  setIsPhone(/^\+\d+$/.test("+" + value));
                }}
                inputStyle={{ width: "100%" }}
                countryCodeEditable={false}
              />
            ) : (
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setIdentifier(val);
                  setIsPhone(/^\+?\d+$/.test(val));
                }}
                className="w-full border border-gray-400 px-3 py-2 rounded"
              />
            )}

            <label className="block text-sm font-semibold mb-1 mt-4">
              Password
            </label>
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
              className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded mt-4 w-full font-semibold"
            >
              Sign in
            </button>

            <p className="text-sm text-gray-700 mt-3">
              New to Amazon?{" "}
              <span
                className="text-yellow-600 cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Create your Amazon account
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
