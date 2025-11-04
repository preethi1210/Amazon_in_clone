// src/utils/Verify.js
import { auth } from "../firebase/firebase";
import axios from "axios";

const Verify = async (otp, navigate) => {
  if (!window.confirmationResult) throw new Error("No OTP session found!");

  try {
    // ✅ 1. Verify OTP with Firebase
    const result = await window.confirmationResult.confirm(otp);
    const user = result.user;
    console.log("✅ OTP verified! Firebase user:", user.phoneNumber);

    // ✅ 2. Get temporarily stored registration data
    const name = localStorage.getItem("name");
    const phone = user.phoneNumber; // backend expects "phone"
    const password = localStorage.getItem("password");
    const email = localStorage.getItem("email") || ""; // optional

    // ✅ 3. Register user on backend
    const { data } = await axios.post("http://localhost:5000/api/auth/register", {
      name,
      phone,
      password,
      email,
    });

    // ✅ 4. Store token & clear local data
    localStorage.setItem("token", data.token);
    localStorage.removeItem("name");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("password");
    localStorage.removeItem("email");

    alert("🎉 Account created successfully!");
    navigate("/"); // redirect to homepage or dashboard
  } catch (error) {
    console.error("❌ OTP verification failed:", error);
    alert(error.response?.data?.message || error.message || "OTP verification failed");
  }
};

export default Verify;
