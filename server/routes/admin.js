import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { storage } from "../storage.js";
import { sendEmail } from "../emailService.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET environment variable is required");
  process.exit(1);
}
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
      return res.json({
        message: "If email exists, reset instructions were sent",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await storage.updateAdminUser(admin.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires,
    });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/admin/reset-password?token=${resetToken}`;

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

// Update user
router.put("/users/:id", verifyAdminToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    const user = await storage.updateUser(userId, userData);
    res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user
router.delete("/users/:id", verifyAdminToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await storage.deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Update contact
router.put("/contacts/:id", verifyAdminToken, async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    const updateData = req.body;
    const contact = await storage.updateContact(contactId, updateData);
    res.json(contact);
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({ error: "Failed to update contact" });
  }
});

// Delete contact
router.delete("/contacts/:id", verifyAdminToken, async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    await storage.deleteContact(contactId);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// Webinar management
router.post("/webinars", verifyAdminToken, async (req, res) => {
  try {
    const webinarData = req.body;
    const webinar = await storage.createWebinar(webinarData);
    res.json(webinar);
  } catch (error) {
    console.error("Create webinar error:", error);
    res.status(500).json({ error: "Failed to create webinar" });
  }
});

router.put("/webinars/:id", verifyAdminToken, async (req, res) => {
  try {
    const webinarId = parseInt(req.params.id);
    if (isNaN(webinarId)) {
      return res.status(400).json({ error: "Invalid webinar ID" });
    }

    const updateData = req.body;

    // Validate and convert scheduledDate if present
    if (updateData.scheduledDate) {
      const dateObj = new Date(updateData.scheduledDate);
      if (isNaN(dateObj.getTime())) {
        return res.status(400).json({ error: "Invalid scheduledDate value" });
      }
      updateData.scheduledDate = dateObj;
    }

    // Set updatedAt to current timestamp
    updateData.updatedAt = new Date();

    const updated = await storage.updateWebinar(webinarId, updateData);

    if (!updated) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    return res.json(updated);
  } catch (error) {
    console.error("Update webinar error:", error);
    return res.status(500).json({ error: "Failed to update webinar" });
  }
}); 

router.delete("/webinars/:id", verifyAdminToken, async (req, res) => {
  try {
    const webinarId = parseInt(req.params.id);
    await storage.deleteWebinar(webinarId);
    res.json({ message: "Webinar deleted successfully" });
  } catch (error) {
    console.error("Delete webinar error:", error);
    res.status(500).json({ error: "Failed to delete webinar" });
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

// =====================
// NEWS & EVENTS MANAGEMENT
// =====================

// Get all news & events
router.get("/news-events", verifyAdminToken, async (req, res) => {
  try {
    const newsEvents = await storage.getAllNewsEvents();
    res.json(newsEvents);
  } catch (error) {
    console.error("Get news & events error:", error);
    res.status(500).json({ error: "Failed to fetch news & events" });
  }
});

// Create news & event
router.post("/news-events", verifyAdminToken, async (req, res) => {
  try {
    const newsEventData = req.body;
    const newsEvent = await storage.createNewsEvent(newsEventData);
    res.json(newsEvent);
  } catch (error) {
    console.error("Create news & event error:", error);
    res.status(500).json({ error: "Failed to create news & event" });
  }
});

// Update news & event
router.put("/news-events/:id", verifyAdminToken, async (req, res) => {
  try {
    const newsEventId = parseInt(req.params.id);
    const newsEventData = req.body;
    const newsEvent = await storage.updateNewsEvent(newsEventId, newsEventData);
    res.json(newsEvent);
  } catch (error) {
    console.error("Update news & event error:", error);
    res.status(500).json({ error: "Failed to update news & event" });
  }
});

// Delete news & event
router.delete("/news-events/:id", verifyAdminToken, async (req, res) => {
  try {
    const newsEventId = parseInt(req.params.id);
    await storage.deleteNewsEvent(newsEventId);
    res.json({ message: "News & event deleted successfully" });
  } catch (error) {
    console.error("Delete news & event error:", error);
    res.status(500).json({ error: "Failed to delete news & event" });
  }
});

// =====================
// RESOURCES MANAGEMENT
// =====================

// Get all resources
router.get("/resources", verifyAdminToken, async (req, res) => {
  try {
    const resources = await storage.getAllResources();
    res.json(resources);
  } catch (error) {
    console.error("Get resources error:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

// Create resource
router.post("/resources", verifyAdminToken, async (req, res) => {
  try {
    const resourceData = req.body;
    const resource = await storage.createResource(resourceData);
    res.json(resource);
  } catch (error) {
    console.error("Create resource error:", error);
    res.status(500).json({ error: "Failed to create resource" });
  }
});

// Update resource
router.put("/resources/:id", verifyAdminToken, async (req, res) => {
  try {
    const resourceId = parseInt(req.params.id);
    const resourceData = req.body;
    const resource = await storage.updateResource(resourceId, resourceData);
    res.json(resource);
  } catch (error) {
    console.error("Update resource error:", error);
    res.status(500).json({ error: "Failed to update resource" });
  }
});

// Delete resource
router.delete("/resources/:id", verifyAdminToken, async (req, res) => {
  try {
    const resourceId = parseInt(req.params.id);
    await storage.deleteResource(resourceId);
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Delete resource error:", error);
    res.status(500).json({ error: "Failed to delete resource" });
  }
});

// =====================
// WEBINAR RESOURCES MANAGEMENT
// =====================

// Get all webinar resources
router.get("/webinar-resources", verifyAdminToken, async (req, res) => {
  try {
    const webinarResources = await storage.getAllWebinarResources();
    res.json(webinarResources);
  } catch (error) {
    console.error("Get webinar resources error:", error);
    res.status(500).json({ error: "Failed to fetch webinar resources" });
  }
});

// Create webinar resource
router.post("/webinar-resources", verifyAdminToken, async (req, res) => {
  try {
    const resourceData = req.body;
    const resource = await storage.createWebinarResource(resourceData);
    res.json(resource);
  } catch (error) {
    console.error("Create webinar resource error:", error);
    res.status(500).json({ error: "Failed to create webinar resource" });
  }
});

// Update webinar resource
router.put("/webinar-resources/:id", verifyAdminToken, async (req, res) => {
  try {
    const resourceId = parseInt(req.params.id);
    const resourceData = req.body;
    const resource = await storage.updateWebinarResource(
      resourceId,
      resourceData
    );
    res.json(resource);
  } catch (error) {
    console.error("Update webinar resource error:", error);
    res.status(500).json({ error: "Failed to update webinar resource" });
  }
});

// Delete webinar resource
router.delete("/webinar-resources/:id", verifyAdminToken, async (req, res) => {
  try {
    const resourceId = parseInt(req.params.id);
    await storage.deleteWebinarResource(resourceId);
    res.json({ message: "Webinar resource deleted successfully" });
  } catch (error) {
    console.error("Delete webinar resource error:", error);
    res.status(500).json({ error: "Failed to delete webinar resource" });
  }
});

export default router;
