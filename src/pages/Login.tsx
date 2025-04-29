import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Initialize Supabase
const supabase = createClient(
  "https://znqceveiswcanfczvotc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpucWNldmVpc3djYW5mY3p2b3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1Nzk0MjYsImV4cCI6MjA1OTE1NTQyNn0.T30vWrveDL6QK8u8Bl5vBgoek-gsrDM1vKUf4rsA8bU"
);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ Fixed

    setLoading(true);
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please fill all the fields correctly");
      setLoading(false); // ✅ Prevent infinite loading state
      return;
    }

    console.log(email, password);

    try {
      // ✅ Use Supabase Authentication for login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        console.log("Login successful!", data);
        navigate("/"); // Redirect after login
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        console.log(error);
        setError("Failed to send password reset email.");
      } else {
        console.log(data);
        setMessage("Password reset link sent! Check your email.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-100 to-white">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content - Centered Login Card */}
      <div className="flex flex-grow items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-96 p-6 shadow-xl rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-center text-green-700 text-2xl font-semibold">
                Welcome Back to Livrr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {message && <p className="text-green-500 text-sm">{message}</p>}

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition-all"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <div className="flex justify-between text-sm mt-2">
                  <button
                    onClick={handleForgotPassword}
                    className="text-green-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-green-600 hover:underline"
                  >
                    Don’t have an account? Sign Up
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

     
    </div>
  );
}

export default Login;
