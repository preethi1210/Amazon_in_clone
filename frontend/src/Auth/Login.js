import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import amazonLogo from "../HomePage/images/Amazon_black.png";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedIdentifier = localStorage.getItem("userIdentifier") || "";
    const savedName = localStorage.getItem("userName") || "";
    const token = localStorage.getItem("token") || "";

    if (savedIdentifier) setIdentifier(savedIdentifier);
    if (savedName) setUserName(savedName);
    if (savedIdentifier && token) setIsLoggedIn(true);

    setIsPhone(/^\+?\d{10,15}$/.test(savedIdentifier));
  }, []);

  const formatPhone = (val) => {
    let digits = val.replace(/\D/g, "");
    if (digits.length === 10) digits = "+91" + digits;
    else if (!digits.startsWith("+")) digits = "+" + digits;
    setIdentifier(digits);
    setIsPhone(/^\+\d{10,15}$/.test(digits));
  };

  const signIn = async () => {
    if (!identifier || !password) {
      alert("Please enter both email/phone and password.");
      return;
    }

    try {
      const endpoint = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;

      const bodyData = isPhone
        ? { phone: identifier, password } // ✅ correct key
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

      localStorage.setItem("token", data.token);
      localStorage.setItem("userIdentifier", identifier);
      if (data.name) localStorage.setItem("userName", data.name);

      setUserName(data.name || "");
      setIsLoggedIn(true);

      alert(data.message || "Login successful!");
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
                onChange={(val) => formatPhone(val)}
                inputStyle={{ width: "100%" }}
                countryCodeEditable={false}
              />
            ) : (
              <input
                type="text"
                value={identifier}
                onChange={(e) => formatPhone(e.target.value)}
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

            <button
              onClick={signIn}
              className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded mt-4 w-full font-semibold"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
