import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthService = () => {
  const [phone, setPhone] = useState(""); // Store phone number
  const [otp, setOtp] = useState(""); // Store OTP
  const [confirm, setConfirm] = useState<any | null>(null); // Store confirmation result
  const navigate = useNavigate(); // Hook for navigation

  // ✅ Send OTP
  const sendOtp = async () => {
    try {
      if (!phone) {
        alert("Please enter a valid phone number.");
        return;
      }
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      alert("OTP Sent Successfully!");
    } catch (error: any) {
      alert("Failed to send OTP: " + error.message);
    }
  };

  // ✅ Verify OTP with backend authentication
  const verifyOtp = async (name: string, email: string, password: string) => {
    try {
      if (!confirm) {
        alert("No OTP confirmation found. Please request OTP again.");
        return;
      }
      if (!otp) {
        alert("Please enter the OTP.");
        return;
      }

      const result = await confirm.confirm(otp);
      const idToken = await result.user.getIdToken(); // Get Firebase ID token

      // Send ID Token to Backend for Authentication
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, idToken, name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful! Redirecting...");
        navigate("/dashboard"); // Redirect to Dashboard
      } else {
        alert("Verification Failed: " + data.error);
      }
    } catch (error: any) {
      alert("Invalid OTP: " + error.message);
    }
  };

  return { phone, setPhone, otp, setOtp, sendOtp, verifyOtp };
};

export default AuthService;
