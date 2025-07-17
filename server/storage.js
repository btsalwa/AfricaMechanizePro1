import { 
  users, events, resources, frameworkElements, newsletters, contacts, statistics
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq } from "drizzle-orm";

export class DatabaseStorage {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Framework elements methods
  async getAllFrameworkElements() {
    return await db.select().from(frameworkElements);
  }

  async getFrameworkElement(id) {
    const [element] = await db.select().from(frameworkElements).where(eq(frameworkElements.id, id));
    return element || undefined;
  }

  async createFrameworkElement(insertFrameworkElement) {
    const [element] = await db
      .insert(frameworkElements)
      .values(insertFrameworkElement)
      .returning();
    return element;
  }

  // Events methods
  async getAllEvents() {
    return await db.select().from(events);
  }

  async getEvent(id) {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async createEvent(insertEvent) {
    const [event] = await db
      .insert(events)
      .values(insertEvent)
      .returning();
    return event;
  }

  // Resources methods
  async getAllResources() {
    return await db.select().from(resources);
  }

  async getResource(id) {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource || undefined;
  }

  async getResourcesByCategory(category) {
    return await db.select().from(resources).where(eq(resources.category, category));
  }

  async createResource(insertResource) {
    const [resource] = await db
      .insert(resources)
      .values(insertResource)
      .returning();
    return resource;
  }

  // Newsletter methods
  async createNewsletter(insertNewsletter) {
    const [newsletter] = await db
      .insert(newsletters)
      .values(insertNewsletter)
      .returning();
    return newsletter;
  }

  // Contact methods
  async createContact(insertContact) {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  // Statistics methods
  async getStatistics() {
    const [stats] = await db.select().from(statistics);
    return stats || undefined;
  }

  async updateStatistics(insertStatistics) {
    const [stats] = await db
      .insert(statistics)
      .values(insertStatistics)
      .onConflictDoUpdate({
        target: statistics.id,
        set: insertStatistics
      })
      .returning();
    return stats;
  }
}

export const storage = new DatabaseStorage();