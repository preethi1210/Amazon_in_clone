// src/utils/Verify.js
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase/firebase";
import axios from "axios"
export default async function Verify(otp, navigate) {
  try {
    // Use in-memory confirmation if present; otherwise reconstruct from localStorage
    let verificationId =
      window.confirmationResult?.verificationId ||
      localStorage.getItem("verificationId");

    if (!verificationId) {
      throw new Error("No OTP session found. Please resend the OTP.");
    }

    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const result = await signInWithCredential(auth, credential);
    const firebaseUser = result.user;
    console.log("Verified user:", firebaseUser);

    // Send user data to backend
  // src/utils/Verify.js
const { data } = await axios.post("http://localhost:5000/api/auth/phone", {
  uid: firebaseUser.uid,
  phoneNumber: firebaseUser.phoneNumber,
  email: localStorage.getItem("email") || firebaseUser.email || null,
  name: localStorage.getItem("name") || firebaseUser.displayName || "",  // ✅ use stored name
  password: localStorage.getItem("password") || null                    // ✅ save password if you want
});

    localStorage.setItem("token", data.token);

localStorage.setItem("userIdentifier", data.phoneNumber || data.email || "");
localStorage.setItem("userName", data.name || "");


    // Clear temp values
    localStorage.removeItem("verificationId");
    // You might also want to persist auth user info here
    console.log("Verified user:", result.user);

    // Navigate to your desired page after success
    navigate("/login"); // or "/home"
  } catch (err) {
    console.error("OTP verification failed:", err);
    throw err;
  }
}
