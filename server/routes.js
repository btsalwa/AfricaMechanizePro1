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

  app.use(express.json());
  app.use(router);

  return createServer(app);
}