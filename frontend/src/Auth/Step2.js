import React, { useEffect, useState } from "react";
import amazon from "../HomePage/images/Amazon_black.png";
import { useNavigate } from "react-router-dom";

const Step2 = () => {
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedIdentifier = localStorage.getItem("userIdentifier") || "";
    const savedName = localStorage.getItem("userName") || "";
    if (savedIdentifier) setIdentifier(savedIdentifier);
    if (savedName) setName(savedName);
  }, []);

  const proceed = () => {
    // Ensure phone is in +91 format if 10 digits
    let formattedIdentifier = identifier;
    if (/^\d{10}$/.test(identifier)) {
      formattedIdentifier = "+91" + identifier;
      localStorage.setItem("userIdentifier", formattedIdentifier);
    }

    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <img src={amazon} alt="Amazon" className="w-20 mb-5" />

      <div className="border border-gray-400 p-6 w-[350px] rounded bg-white">
        <h2 className="text-xl font-bold mb-2">
          {name ? `Welcome ${name}, ` : ""}Looks like you are new to Amazon
        </h2>

        <p className="mb-2">
          {identifier}{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            change
          </span>
        </p>

        <p>Let's create an account using your mobile number</p>

        <button
          onClick={proceed}
          className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded w-full mt-2"
        >
          Proceed to create an account
        </button>
      </div>
    </div>
  );
};

export default Step2;
