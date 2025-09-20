import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";

let recaptchaVerifier = null;

export const ensureRecaptcha = () => {
  const container = document.getElementById("recaptcha-container");
  if (!container) {
    console.warn("Recaptcha container not found, delaying initialization");
    return null;
  }

  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("reCAPTCHA solved"),
      "expired-callback": () => {
        recaptchaVerifier?.clear?.();
        recaptchaVerifier = null;
        ensureRecaptcha();
      },
    });
  }
  return recaptchaVerifier;
};

export const resetRecaptcha = () => {
  recaptchaVerifier?.clear?.();
  recaptchaVerifier = null;
};

export const sendOtp = async (phoneNumberE164) => {
  if (!phoneNumberE164?.startsWith("+")) {
    throw new Error("Phone number must be in E.164 format, e.g. +911234567890");
  }

  const verifier = ensureRecaptcha();
  if (!verifier) throw new Error("Recaptcha container not found");

  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberE164, verifier);
  window.confirmationResult = confirmationResult;
  localStorage.setItem("verificationId", confirmationResult.verificationId);
  console.log("OTP request sent");
  return confirmationResult;
};
