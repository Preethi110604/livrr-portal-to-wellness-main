import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

function Signup() {
  // Local state for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  // Simulated OTP sending function
  const sendOtp = () => {
    if (!phone) {
      alert("Please enter a valid phone number.");
      return;
    }
    const otpCode = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    setGeneratedOtp(otpCode.toString());
    alert(`Your OTP is: ${otpCode}`); // Simulate sending OTP
  };

  // Input validation function
  const handleSignup = () => {
    if (!name || !email || !phone || !otp || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (otp !== generatedOtp) {
      alert("Invalid OTP. Please try again.");
      return;
    }

    alert("Signup successful!");
    navigate("/dashboard"); // Redirect after successful signup
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-100 to-white">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-96 p-6 shadow-xl rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-center text-green-700 text-2xl font-semibold">
                Create an Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button onClick={sendOtp} className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600">
                  Send OTP
                </button>
                <Input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button onClick={handleSignup} className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600">
                  Verify & Sign Up
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
