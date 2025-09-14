import express, { Router } from "express";
import { createServer } from "http";
import { storage } from "./storage.js";
import passport from "passport";
import {
  authHelpers,
  requireAuth,
  requireEmailVerification,
  requireAdmin,
} from "./auth.js";
import { sendWelcomeEmail } from "./emailService.js";
import webinarRoutes from "./routes/webinars.js";
import adminRoutes from "./routes/admin.js";
import {
  insertFrameworkElementSchema,
  insertNewsletterSubscriptionSchema,
  insertContactFormSchema,
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../shared/schema.js";

export async function registerRoutes(app) {
  const router = Router();

  // Legacy data endpoints for frontend integration
  router.get("/api/legacy/resources", async (req, res) => {
    try {
      const legacyResources = await storage.getLegacyResources();
      res.json({ data: legacyResources || [] });
    } catch (error) {
      console.error("Error fetching legacy resources:", error);
      res.status(500).json({ message: "Failed to fetch legacy resources" });
    }
  });

  router.get("/api/legacy/projects", async (req, res) => {
    try {
      const legacyProjects = await storage.getLegacyProjects();
      res.json({ data: legacyProjects || [] });
    } catch (error) {
      console.error("Error fetching legacy projects:", error);
      res.status(500).json({ message: "Failed to fetch legacy projects" });
    }
  });

  router.get("/api/legacy/data", async (req, res) => {
    try {
      const legacyData = await storage.getLegacyData();
      res.json({ data: legacyData || {} });
    } catch (error) {
      console.error("Error fetching legacy data:", error);
      res.status(500).json({ message: "Failed to fetch legacy data" });
    }
  });

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
        message:
          "Registration successful! Please check your email to verify your account.",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isEmailVerified: user.isEmailVerified,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  router.post("/api/auth/login", (req, res, next) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return res.status(500).json({ message: "Authentication error" });
        }

        if (!user) {
          return res
            .status(401)
            .json({ message: info?.message || "Invalid credentials" });
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
              country: user.country,
            },
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
      lastLoginAt: req.user.lastLoginAt,
    });
  });

  router.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;

      if (!token) {
        console.warn("[Email Verification] Missing token in request");
        return res
          .status(400)
          .json({ message: "Verification token is required" });
      }

      console.log(`[Email Verification] Received token: ${token}`);

      // Validate and mark user email as verified
      const user = await authHelpers.verifyEmail(token);

      console.log(
        `[Email Verification] User verified: ID=${user.id}, Email=${user.email}`
      );

      // Send welcome email asynchronously, don’t block response
      sendWelcomeEmail(user).catch((err) => {
        console.error(
          "[Email Verification] Failed to send welcome email:",
          err
        );
      });

      // Success response with user info for frontend
      res.json({
        message: "Email verified successfully! Welcome to Africa Mechanize.",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isEmailVerified: true,
        },
      });
    } catch (error) {
      console.error("[Email Verification] Error:", error);
      const errMsg =
        error.message === "Invalid or expired verification token"
          ? "Verification link is invalid or expired. Please register again or contact support."
          : error.message || "Email verification failed";

      res.status(400).json({ message: errMsg });
    }
  });

  router.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const validatedData = forgotPasswordSchema.parse(req.body);
      await authHelpers.sendPasswordReset(validatedData.email);
      res.json({ message: "Password reset email sent" });
    } catch (error) {
      // Don't reveal if email exists or not for security
      res.json({
        message: "If the email exists, a password reset link has been sent",
      });
    }
  });

  router.post("/api/auth/reset-password", async (req, res) => {
    try {
      const validatedData = resetPasswordSchema.parse(req.body);
      await authHelpers.resetPassword(
        validatedData.token,
        validatedData.password
      );
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
        bio: req.body.bio,
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
          bio: updatedUser.bio,
        },
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
      const element = await storage.getFrameworkElement(
        parseInt(req.params.id)
      );
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
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const newsletter = await storage.createNewsletter(validatedData);
      res.status(201).json(newsletter);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Contact endpoints
  router.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactFormSchema.parse(req.body);
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
      const resource = await storage.updateResource(
        parseInt(req.params.id),
        req.body
      );
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
      const event = await storage.updateEvent(
        parseInt(req.params.id),
        req.body
      );
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
      const body = { ...req.body };

      // Required fields
      if (!body.title || !body.slug || !body.scheduledDate) {
        return res
          .status(400)
          .json({ error: "Title, slug, and scheduledDate are required" });
      }

      // Validate scheduledDate
      const parsedDate = new Date(body.scheduledDate);
      if (isNaN(parsedDate.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid scheduledDate format, expected ISO string" });
      }
      body.scheduledDate = parsedDate;

      // Duration validation
      if (body.duration) {
        const duration = parseInt(body.duration, 10);
        if (isNaN(duration) || duration <= 0) {
          return res
            .status(400)
            .json({ error: "Duration must be a positive number" });
        }
        body.duration = duration;
      }

      // Normalize tags
      if (body.tags && typeof body.tags === "string") {
        body.tags = body.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }

      if (!body.language) {
        body.language = "en";
      }

      body.createdAt = new Date();
      body.updatedAt = new Date();

      const webinar = await storage.createWebinar(body);
      res.status(201).json(webinar);
    } catch (error) {
      console.error("Create webinar error:", error);
      res.status(500).json({ error: "Failed to create webinar" });
    }
  });

  router.put("/api/webinars/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid webinar ID" });
      }

      const body = { ...req.body };

      // Validate scheduledDate
      if (body.scheduledDate) {
        const parsedDate = new Date(body.scheduledDate);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            error: "Invalid scheduledDate format, expected ISO string",
          });
        }
        body.scheduledDate = parsedDate;
      }

      // Ensure duration is a number
      if (body.duration) {
        const duration = parseInt(body.duration, 10);
        if (isNaN(duration) || duration <= 0) {
          return res
            .status(400)
            .json({ error: "Duration must be a positive number" });
        }
        body.duration = duration;
      }

      // Normalize tags
      if (body.tags && typeof body.tags === "string") {
        body.tags = body.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }

      // Default language
      if (!body.language) {
        body.language = "en";
      }

      body.updatedAt = new Date();

      const webinar = await storage.updateWebinar(id, body);

      if (!webinar) {
        return res.status(404).json({ error: "Webinar not found" });
      }

      res.json({ message: "Webinar updated successfully", webinar });
    } catch (error) {
      console.error("Update webinar error:", error);
      res.status(500).json({ error: "Failed to update webinar" });
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
      const material = await storage.updateReadingMaterial(
        parseInt(req.params.id),
        req.body
      );
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

  // Legacy data migration endpoints
  router.post("/api/migration/import-legacy-data", async (req, res) => {
    try {
      const { LegacyDataImporter } = await import("./legacyDataImporter.js");
      const importer = new LegacyDataImporter();

      // Execute the comprehensive import
      const importResults = await importer.importAllLegacyContent();

      // Get updated legacy admin accounts
      const legacyAccounts = await storage.getLegacyAdminAccounts();

      res.json({
        success: true,
        message: "Legacy data import completed successfully",
        summary: {
          adminAccountsImported: legacyAccounts.length,
          legacyAdminAccounts: legacyAccounts.map((acc) => ({
            username: acc.username,
            email: acc.email,
            fullName: acc.full_name,
            adminType: acc.admin_type,
            legacyId: acc.legacy_admin_id,
            isActive: acc.is_active,
          })),
          contentImported: importResults.importedCounts,
          migrationStatus: "completed",
          note: "Comprehensive legacy data import from original africamechanize.org database completed",
          timestamp: importResults.timestamp,
        },
      });
    } catch (error) {
      console.error("Import legacy data error:", error);
      res.status(500).json({
        success: false,
        message: "Legacy data import failed",
        error: error.message,
      });
    }
  });

  router.get("/api/migration/status", async (req, res) => {
    try {
      const legacyAccounts = await storage.getLegacyAdminAccounts();
      console.log("Legacy accounts data:", legacyAccounts);

      res.json({
        success: true,
        migrationTablesExist: true,
        legacyAccountsCount: legacyAccounts.length,
        accounts: legacyAccounts.map((acc) => ({
          username: acc.username,
          email: acc.email,
          fullName: acc.full_name,
          isActive: acc.is_active,
          adminType: acc.admin_type,
          legacyId: acc.legacy_admin_id,
          createdAt: acc.created_at,
        })),
      });
    } catch (error) {
      console.error("Migration status error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  // Legacy content analysis endpoint
  router.get("/api/migration/content-analysis", async (req, res) => {
    try {
      res.json({
        success: true,
        analysis: {
          criticalContentAreas: [
            {
              name: "Resource Library",
              priority: "HIGH",
              description:
                "100+ educational resources including training manuals, guides, and research papers",
              status: "Schema Ready - Import Needed",
              impact: "Core educational content from original platform",
            },
            {
              name: "Webinar Community Database",
              priority: "HIGH",
              description:
                "5,000+ webinar attendee records from historical sessions",
              status: "Schema Ready - Import Needed",
              impact: "Engaged community for platform growth",
            },
            {
              name: "Project Database",
              priority: "MEDIUM",
              description:
                "Historical projects with budgets, locations, and outcomes",
              status: "Schema Ready - Import Needed",
              impact: "Project tracking and reporting capabilities",
            },
            {
              name: "Membership Records",
              priority: "MEDIUM",
              description: "Professional membership database with credentials",
              status: "Schema Ready - Import Needed",
              impact: "Community analytics and engagement",
            },
          ],
          contentStats: {
            adminAccountsImported: 3,
            resourcesAnalyzed: 100,
            webinarAttendeesIdentified: 5000,
            projectsTracked: 50,
            totalLegacyRecords: 5153,
          },
          integrationBenefits: [
            "Established content library with proven educational value",
            "Large engaged community of 5,000+ practitioners",
            "Historical project data for reporting and analysis",
            "SEO advantage with optimized content structure",
            "Seamless user transition from original platform",
          ],
        },
      });
    } catch (error) {
      console.error("Content analysis error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  // Legacy content access endpoints
  router.get("/api/legacy/resources", async (req, res) => {
    try {
      const resources = await db
        .select()
        .from(legacyResources)
        .orderBy(desc(legacyResources.id));
      res.json({ success: true, data: resources });
    } catch (error) {
      console.error("Error fetching legacy resources:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.get("/api/legacy/webinar-attendees", async (req, res) => {
    try {
      const attendees = await db
        .select()
        .from(legacyWebinarAttendees)
        .orderBy(desc(legacyWebinarAttendees.id));
      res.json({ success: true, data: attendees });
    } catch (error) {
      console.error("Error fetching legacy webinar attendees:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.get("/api/legacy/projects", async (req, res) => {
    try {
      const projects = await db
        .select()
        .from(legacyProjects)
        .orderBy(desc(legacyProjects.budgetAmount));
      res.json({ success: true, data: projects });
    } catch (error) {
      console.error("Error fetching legacy projects:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.get("/api/legacy/membership", async (req, res) => {
    try {
      const membership = await db
        .select()
        .from(legacyMembership)
        .orderBy(desc(legacyMembership.id));
      res.json({ success: true, data: membership });
    } catch (error) {
      console.error("Error fetching legacy membership:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Email campaign endpoints for re-engaging legacy community
  router.post("/api/admin/email-campaign", requireAdmin, async (req, res) => {
    try {
      const { subject, message, targetAudience, templateType } = req.body;

      // Get target emails based on audience selection
      let targetEmails = [];

      if (targetAudience === "legacy-webinar-attendees") {
        const attendees = await db
          .select({
            email: legacyWebinarAttendees.email,
            name: legacyWebinarAttendees.name,
          })
          .from(legacyWebinarAttendees);
        targetEmails = attendees.filter(
          (a) => a.email && a.email.includes("@")
        );
      } else if (targetAudience === "legacy-membership") {
        const members = await db
          .select({
            email: legacyMembership.email,
            name: legacyMembership.name,
          })
          .from(legacyMembership);
        targetEmails = members.filter((m) => m.email && m.email.includes("@"));
      }

      // For now, we'll just log the campaign (since SMTP is not configured)
      console.log("📧 Email Campaign Created:", {
        subject,
        targetCount: targetEmails.length,
        targetAudience,
        message: message.substring(0, 100) + "...",
      });

      // In a real implementation, we would:
      // 1. Queue the emails for sending
      // 2. Track campaign metrics
      // 3. Handle bounces and unsubscribes

      res.json({
        success: true,
        message: `Campaign prepared for ${targetEmails.length} recipients`,
        targetCount: targetEmails.length,
        targets: targetEmails.slice(0, 5).map((t) => t.email), // Show first 5 for confirmation
      });
    } catch (error) {
      console.error("Email campaign error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.get("/api/admin/email-targets", requireAdmin, async (req, res) => {
    try {
      const webinarAttendees = await db.select().from(legacyWebinarAttendees);
      const membership = await db.select().from(legacyMembership);

      const emailTargets = {
        "legacy-webinar-attendees": {
          count: webinarAttendees.filter(
            (a) => a.email && a.email.includes("@")
          ).length,
          description:
            "Imported webinar attendees from FAO, CGIAR, ACT Africa and other organizations",
          sample: webinarAttendees
            .slice(0, 3)
            .map((a) => a.email)
            .filter((e) => e && e.includes("@")),
        },
        "legacy-membership": {
          count: membership.filter((m) => m.email && m.email.includes("@"))
            .length,
          description:
            "Professional members including academic institutions and engineers",
          sample: membership
            .slice(0, 3)
            .map((m) => m.email)
            .filter((e) => e && e.includes("@")),
        },
      };

      res.json({ success: true, data: emailTargets });
    } catch (error) {
      console.error("Error fetching email targets:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.use(express.json());
  app.use(router);

  return createServer(app);
}
