// src/utils/send_otp.js
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const ensureRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth, // ✅ first argument should be auth, not "recaptcha-container"
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved ✅");
        },
      }
    );
  }
};

export const sendOtp = async (phoneNumber) => {
  ensureRecaptcha();
  const appVerifier = window.recaptchaVerifier;

  try {
    console.log("📨 Sending OTP to:", phoneNumber);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    alert("✅ OTP sent successfully!");
    return confirmationResult;
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    alert(`Failed to send OTP: ${error.message}`);
    return null;
  }
};
