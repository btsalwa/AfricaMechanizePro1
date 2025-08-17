import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { storage } from "../storage.js";
import { sendEmail } from "../emailService.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-admin-jwt-secret-key";
const JWT_EXPIRES = "24h";

// Middleware to verify admin JWT token
const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await storage.getAdminUser(decoded.username);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const admin = await storage.getAdminUser(username);
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login
    await storage.updateAdminUser(admin.id, { lastLoginAt: new Date() });

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Verify token
router.get("/verify", verifyAdminToken, (req, res) => {
  res.json({
    admin: {
      id: req.admin.id,
      username: req.admin.username,
      fullName: req.admin.fullName,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

// Password reset request
router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const admin = await storage.getAdminUserByEmail(email);
    if (!admin) {
      // Don't reveal if email exists or not
      return res.json({ message: "If email exists, reset instructions were sent" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await storage.updateAdminUser(admin.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires,
    });

    const resetUrl = `${req.protocol}://${req.get("host")}/admin/reset-password?token=${resetToken}`;
    
    await sendEmail({
      to: email,
      subject: "AfricaMechanize Admin Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2f5233;">Password Reset Request</h2>
          <p>You requested a password reset for your AfricaMechanize admin account.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #2f5233; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Reset Password
          </a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this reset, please ignore this email.</p>
        </div>
      `,
    });

    res.json({ message: "If email exists, reset instructions were sent" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get admin statistics
router.get("/stats", verifyAdminToken, async (req, res) => {
  try {
    const stats = await storage.getAdminStats();
    res.json(stats);
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// Get users for admin management
router.get("/users", verifyAdminToken, async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Admin users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get webinars for admin management
router.get("/webinars", verifyAdminToken, async (req, res) => {
  try {
    const webinars = await storage.getAllWebinars();
    res.json(webinars);
  } catch (error) {
    console.error("Admin webinars error:", error);
    res.status(500).json({ error: "Failed to fetch webinars" });
  }
});

// Get contacts for admin management
router.get("/contacts", verifyAdminToken, async (req, res) => {
  try {
    const contacts = await storage.getAllContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Admin contacts error:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// Update site statistics
router.post("/update-stats", verifyAdminToken, async (req, res) => {
  try {
    const statsData = req.body;
    const stats = await storage.updateStatistics(statsData);
    res.json(stats);
  } catch (error) {
    console.error("Update stats error:", error);
    res.status(500).json({ error: "Failed to update statistics" });
  }
});

export default router;