const express = require("express");
const nodemailer = require("nodemailer");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD, // App password, not your Gmail password
  },
});

// Route: Signup and send verification email
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Save to Supabase
    const { error } = await supabase
      .from("SIGNUP")
      .insert([{ Name: name, Email: email, password }]);

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return res.status(400).json({ error: error.message });
    }

    // Generate verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify?email=${email}`;

    // Send verification email
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Hello ${name},</h2>
        <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>
      `,
    });

    res.json({ message: "Signup successful. Verification email sent." });

  } catch (err) {
    console.error("❌ Email Sending Error:", err);
    res.status(500).json({
      message: "Signup successful, but verification email failed to send.",
    });
  }
});

// Route: Test email (optional, for debugging)
app.get("/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "your-test-email@gmail.com",
      subject: "Test Email from Livrr Backend",
      html: "<p>This is a test email sent from your backend server.</p>",
    });
    res.send("✅ Test email sent successfully.");
  } catch (err) {
    console.error("❌ Test Email Error:", err);
    res.status(500).send("❌ Failed to send test email.");
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
