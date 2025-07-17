import { Router } from "express";
import { createServer } from "http";
import { storage } from "./storage.js";
import { 
  insertEventSchema, insertResourceSchema, insertFrameworkElementSchema,
  insertNewsletterSchema, insertContactSchema, insertStatsSchema
} from "../shared/schema.js";

export async function registerRoutes(app) {
  const router = Router();

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

  router.post("/api/resources/:id/download", async (req, res) => {
    try {
      const resource = await storage.incrementDownloadCount(parseInt(req.params.id));
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Failed to update download count" });
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

  router.post("/api/framework", async (req, res) => {
    try {
      const validatedData = insertFrameworkElementSchema.parse(req.body);
      const element = await storage.createFrameworkElement(validatedData);
      res.status(201).json(element);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Newsletter endpoints
  router.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if already subscribed
      const existing = await storage.getNewsletterSubscription(validatedData.email);
      if (existing && existing.isActive) {
        return res.status(400).json({ error: "Already subscribed" });
      }

      const subscription = await storage.subscribeNewsletter(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      await storage.unsubscribeNewsletter(email);
      res.json({ message: "Unsubscribed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to unsubscribe" });
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

  router.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Stats endpoints
  router.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  router.post("/api/stats", async (req, res) => {
    try {
      const validatedData = insertStatsSchema.parse(req.body);
      const stats = await storage.updateStats(validatedData);
      res.status(201).json(stats);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.use(router);

  const httpServer = createServer(app);
  return httpServer;
}
