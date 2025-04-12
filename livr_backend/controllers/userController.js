const User = require("../models/User");

const signupUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

module.exports = { signupUser };
