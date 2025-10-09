import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// 🔹 Function to create JWT token for normal users
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 🔹 USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Create token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// 🔹 USER REGISTRATION
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email & password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // Create JWT token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD?.trim();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // ✅ Correct token with role and email fields
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        token,
        message: "✅ Admin login successful",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  } catch (error) {
    console.error("❌ Admin Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin login",
    });
  }
};


export { loginUser, registerUser, adminLogin };
