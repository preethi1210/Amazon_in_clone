import React, { useState } from "react";
import amazon from "../HomePage/images/Amazon_black.png";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!input.trim()) {
      setError("Please enter your email or mobile number");
      return;
    }

    let formattedInput = input.trim();

    // Auto-add +91 for 10-digit numbers
    if (/^\d{10}$/.test(formattedInput)) {
      formattedInput = "+91" + formattedInput;
    }

    setLoading(true);
    try {
      const isPhone = /^\+?\d{10,15}$/.test(formattedInput);
      const queryParam = isPhone ? `phone=${formattedInput}` : `email=${formattedInput}`;

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/user-exists?${queryParam}`,
        { method: "GET", credentials: "include" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Server error");

      localStorage.setItem("userIdentifier", formattedInput);

      if (data.exists) {
        localStorage.setItem("userName", data.name || "");
        navigate("/login");
      } else {
        navigate("/intent"); // move to Step2/register
      }
    } catch (err) {
      console.error("Error checking user:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <img src={amazon} alt="Amazon" className="w-20 mb-5" />

      <div className="border border-gray-400 p-6 w-80 rounded bg-white">
        <h2 className="text-xl font-bold mb-2">Sign in or create account</h2>

        <label className="block text-sm mb-1">Email or mobile phone number</label>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          className="w-full border border-gray-400 px-3 py-2 rounded mb-2"
          placeholder="Enter email or phone"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleContinue}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300"
          } py-2 px-4 rounded w-full`}
        >
          {loading ? "Checking…" : "Continue"}
        </button>

        <p className="text-xs mt-4">
          By continuing, you agree to Amazon's{" "}
          <Link to="/conditions" className="text-blue-500 hover:underline">
            Conditions of Use
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-500 hover:underline">
            Privacy Notice
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignIn;
