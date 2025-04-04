import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  "https://znqceveiswcanfczvotc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpucWNldmVpc3djYW5mY3p2b3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1Nzk0MjYsImV4cCI6MjA1OTE1NTQyNn0.T30vWrveDL6QK8u8Bl5vBgoek-gsrDM1vKUf4rsA8bU"
);

function Verify() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (session?.session) {
        // ✅ User has verified email, redirect to health profile page
        navigate("/healthprofile");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <p className="text-green-600">Checking email verification...</p>
      ) : (
        <p className="text-red-600">
          Email not verified. Please check your inbox and click the link.
        </p>
      )}
    </div>
  );
}

export default Verify;
