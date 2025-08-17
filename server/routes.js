import express, { Router } from "express";
import { createServer } from "http";
import { storage } from "./storage.js";
import passport from "passport";
import { authHelpers, requireAuth, requireEmailVerification, requireAdmin } from "./auth.js";
import { sendWelcomeEmail } from "./emailService.js";
import webinarRoutes from "./routes/webinars.js";
import adminRoutes from "./routes/admin.js";
import { 
  insertFrameworkElementSchema, insertNewsletterSubscriptionSchema, insertContactFormSchema,
  registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema
} from "../shared/schema.js";

export async function registerRoutes(app) {
  const router = Router();

  // Authentication endpoints
  router.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(validatedData.email);
      
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const user = await authHelpers.createUser(validatedData);
      
      // Send welcome email after email verification
      if (user.isEmailVerified) {
        await sendWelcomeEmail(user);
      }
      
      res.status(201).json({ 
        message: "Registration successful! Please check your email to verify your account.",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isEmailVerified: user.isEmailVerified
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  router.post("/api/auth/login", (req, res, next) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          return res.status(500).json({ message: "Authentication error" });
        }
        
        if (!user) {
          return res.status(401).json({ message: info?.message || "Invalid credentials" });
        }
        
        req.logIn(user, (err) => {
          if (err) {
            return res.status(500).json({ message: "Login failed" });
          }
          
          res.json({
            message: "Login successful",
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              isEmailVerified: user.isEmailVerified,
              organization: user.organization,
              country: user.country
            }
          });
        });
      })(req, res, next);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  router.get("/api/auth/user", requireAuth, (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
      isEmailVerified: req.user.isEmailVerified,
      organization: req.user.organization,
      country: req.user.country,
      profileImage: req.user.profileImage,
      bio: req.user.bio,
      lastLoginAt: req.user.lastLoginAt
    });
  });

  router.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(400).json({ message: "Verification token is required" });
      }
      
      const user = await authHelpers.verifyEmail(token);
      
      // Send welcome email after successful verification
      await sendWelcomeEmail(user);
      
      res.json({ message: "Email verified successfully! Welcome to Africa Mechanize." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const validatedData = forgotPasswordSchema.parse(req.body);
      await authHelpers.sendPasswordReset(validatedData.email);
      res.json({ message: "Password reset email sent" });
    } catch (error) {
      // Don't reveal if email exists or not for security
      res.json({ message: "If the email exists, a password reset link has been sent" });
    }
  });

  router.post("/api/auth/reset-password", async (req, res) => {
    try {
      const validatedData = resetPasswordSchema.parse(req.body);
      await authHelpers.resetPassword(validatedData.token, validatedData.password);
      res.json({ message: "Password reset successful" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.put("/api/auth/profile", requireAuth, async (req, res) => {
    try {
      const updates = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        organization: req.body.organization,
        country: req.body.country,
        bio: req.body.bio
      };
      
      const updatedUser = await storage.updateUser(req.user.id, updates);
      res.json({
        message: "Profile updated successfully",
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          organization: updatedUser.organization,
          country: updatedUser.country,
          bio: updatedUser.bio
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Framework elements endpoints
  router.get("/api/framework", async (req, res) => {
    try {
      const elements = await storage.getAllFrameworkElements();
      res.json(elements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch framework elements" });
    }
  });

  router.get("/api/framework/:id", async (req, res) => {
    try {
      const element = await storage.getFrameworkElement(parseInt(req.params.id));
      if (!element) {
        return res.status(404).json({ error: "Framework element not found" });
      }
      res.json(element);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch framework element" });
    }
  });

  // Events endpoints
  router.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  router.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(parseInt(req.params.id));
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  router.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Resources endpoints
  router.get("/api/resources", async (req, res) => {
    try {
      const { category } = req.query;
      const resources = category 
        ? await storage.getResourcesByCategory(category)
        : await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  router.get("/api/resources/:id", async (req, res) => {
    try {
      const resource = await storage.getResource(parseInt(req.params.id));
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resource" });
    }
  });

  router.post("/api/resources", async (req, res) => {
    try {
      const validatedData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(validatedData);
      res.status(201).json(resource);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Newsletter endpoints
  router.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.createNewsletter(validatedData);
      res.status(201).json(newsletter);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Contact endpoints
  router.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Statistics endpoints
  router.get("/api/statistics", async (req, res) => {
    try {
      const stats = await storage.getStatistics();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  router.post("/api/statistics", async (req, res) => {
    try {
      const validatedData = insertStatisticsSchema.parse(req.body);
      const stats = await storage.updateStatistics(validatedData);
      res.json(stats);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Mount webinar routes
  router.use("/api/webinars", webinarRoutes);
  
  // Mount admin routes
  router.use("/api/admin", adminRoutes);

  // Reading Materials endpoints
  router.get("/api/materials", async (req, res) => {
    try {
      const materials = await storage.getAllReadingMaterials();
      res.json(materials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch materials" });
    }
  });

  // Partners endpoints
  router.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getAllPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });

  // Conferences endpoints
  router.get("/api/conferences", async (req, res) => {
    try {
      const conferences = await storage.getAllConferences();
      res.json(conferences);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conferences" });
    }
  });

  // Admin CRUD Routes
  router.patch("/api/resources/:id", async (req, res) => {
    try {
      const resource = await storage.updateResource(parseInt(req.params.id), req.body);
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Failed to update resource" });
    }
  });

  router.delete("/api/resources/:id", async (req, res) => {
    try {
      await storage.deleteResource(parseInt(req.params.id));
      res.json({ message: "Resource deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete resource" });
    }
  });

  router.patch("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.updateEvent(parseInt(req.params.id), req.body);
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to update event" });
    }
  });

  router.delete("/api/events/:id", async (req, res) => {
    try {
      await storage.deleteEvent(parseInt(req.params.id));
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  });

  router.post("/api/webinars", async (req, res) => {
    try {
      const webinar = await storage.createWebinar(req.body);
      res.json(webinar);
    } catch (error) {
      res.status(500).json({ error: "Failed to create webinar" });
    }
  });

  router.patch("/api/webinars/:id", async (req, res) => {
    try {
      const webinar = await storage.updateWebinar(parseInt(req.params.id), req.body);
      res.json(webinar);
    } catch (error) {
      res.status(500).json({ error: "Failed to update webinar" });
    }
  });

  router.delete("/api/webinars/:id", async (req, res) => {
    try {
      await storage.deleteWebinar(parseInt(req.params.id));
      res.json({ message: "Webinar deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete webinar" });
    }
  });

  router.post("/api/materials", async (req, res) => {
    try {
      const material = await storage.createReadingMaterial(req.body);
      res.json(material);
    } catch (error) {
      res.status(500).json({ error: "Failed to create material" });
    }
  });

  router.patch("/api/materials/:id", async (req, res) => {
    try {
      const material = await storage.updateReadingMaterial(parseInt(req.params.id), req.body);
      res.json(material);
    } catch (error) {
      res.status(500).json({ error: "Failed to update material" });
    }
  });

  router.delete("/api/materials/:id", async (req, res) => {
    try {
      await storage.deleteReadingMaterial(parseInt(req.params.id));
      res.json({ message: "Material deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete material" });
    }
  });

  app.use(express.json());
  app.use(router);

  return createServer(app);
}