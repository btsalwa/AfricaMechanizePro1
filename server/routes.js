import express, { Router } from "express";
import { createServer } from "http";
import { storage } from "./storage.js";
import { 
  insertEventSchema, insertResourceSchema, insertFrameworkElementSchema,
  insertNewsletterSchema, insertContactSchema, insertStatisticsSchema
} from "../shared/schema.js";

export async function registerRoutes(app) {
  const router = Router();

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

  // Webinars endpoints
  router.get("/api/webinars", async (req, res) => {
    try {
      const webinars = await storage.getAllWebinars();
      res.json(webinars);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch webinars" });
    }
  });

  // Reading Materials endpoints
  router.get("/api/materials", async (req, res) => {
    try {
      const materials = await storage.getAllReadingMaterials();
      res.json(materials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch materials" });
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