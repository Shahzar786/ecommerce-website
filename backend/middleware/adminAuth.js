import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("🚫 No Authorization header or wrong format");
      return res.status(403).json({ success: false, message: "Unauthorized - No Token" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("🚫 Token missing");
      return res.status(403).json({ success: false, message: "Unauthorized - Token Missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminEmail = process.env.ADMIN_EMAIL?.trim();

    console.log("✅ Decoded Token:", decoded);
    console.log("🔹 Admin Email Env:", adminEmail);

    if (decoded.role !== "admin" || decoded.email !== adminEmail) {
      console.log("🚫 Role or Email mismatch");
      return res.status(403).json({ success: false, message: "Unauthorized - Role/Email mismatch" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("❌ Admin Auth Error:", error);
    res.status(403).json({ success: false, message: "Unauthorized Access" });
  }
};

export default adminAuth;
