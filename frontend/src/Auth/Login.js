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

  const signIn = async () => {
    if (!identifier || !password) {
      alert("Please enter both email/phone and password.");
      return;
    }

    try {
      const endpoint = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;

      const normalizedPhone = identifier.startsWith("+")
        ? identifier
        : "+" + identifier;

      const bodyData = isPhone
        ? { phone: normalizedPhone, password } // ✅ use correct backend key
        : { email: identifier, password };

      console.log("Login payload:", bodyData);

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
                onChange={(value) => {
                  const val = value.startsWith("+") ? value : "+" + value;
                  setIdentifier(val);
                  setIsPhone(/^\+?\d{10,15}$/.test(val));
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
  let formatted = val.replace(/\D/g, ""); // remove non-digits
  if (formatted.length === 10) formatted = "+91" + formatted;
  else if (!formatted.startsWith("+")) formatted = "+" + formatted;
  setIdentifier(formatted);
  setIsPhone(/^\+\d{10,15}$/.test(formatted));

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
