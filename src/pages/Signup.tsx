import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import supabase from "@/services/supabaseclient";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 1. Insert into Supabase
    const { error } = await supabase.from("SIGNUP").insert([
      {
        Name: name,
        Email: email,
        password: password,
      },
    ]);

    if (error) {
      alert("Signup failed: " + error.message);
      return;
    }

    // 2. Send verification email using your backend
    try {
      const res = await fetch("http://localhost:8080/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        alert("Signup successful! Please check your email to verify your account.");
        navigate("/login");
      } else {
        alert("Signup successful, but verification email failed to send.");
      }
    } catch (err) {
      console.error(err);
      alert("Signup successful, but email sending failed.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-100 to-white">
      <Navbar />
      <div className="flex-grow pt-24 px-4 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-96 p-6 shadow-xl rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-center text-green-700 text-2xl font-semibold">
                Create an Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={handleSignup}
                  className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
                >
                  Sign Up
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <footer className="bg-white text-gray-600 py-6" />
    </div>
  );
}

export default Signup;  