import { 
  users, events, resources, frameworkElements, newsletters, contacts, stats,
  User, InsertUser, Event, InsertEvent, Resource, InsertResource,
  FrameworkElement, InsertFrameworkElement, Newsletter, InsertNewsletter,
  Contact, InsertContact, Stats, InsertStats
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq, desc, asc } from "drizzle-orm";

export class IStorage {
  // User methods
  async getUser(id) { throw new Error("Not implemented"); }
  async getUserByUsername(username) { throw new Error("Not implemented"); }
  async getUserByEmail(email) { throw new Error("Not implemented"); }
  async createUser(user) { throw new Error("Not implemented"); }
  
  // Event methods
  async getAllEvents() { throw new Error("Not implemented"); }
  async getEvent(id) { throw new Error("Not implemented"); }
  async createEvent(event) { throw new Error("Not implemented"); }
  async updateEvent(id, event) { throw new Error("Not implemented"); }
  async deleteEvent(id) { throw new Error("Not implemented"); }
  
  // Resource methods
  async getAllResources() { throw new Error("Not implemented"); }
  async getResource(id) { throw new Error("Not implemented"); }
  async getResourcesByCategory(category) { throw new Error("Not implemented"); }
  async createResource(resource) { throw new Error("Not implemented"); }
  async updateResource(id, resource) { throw new Error("Not implemented"); }
  async deleteResource(id) { throw new Error("Not implemented"); }
  async incrementDownloadCount(id) { throw new Error("Not implemented"); }
  
  // Framework methods
  async getAllFrameworkElements() { throw new Error("Not implemented"); }
  async getFrameworkElement(id) { throw new Error("Not implemented"); }
  async createFrameworkElement(element) { throw new Error("Not implemented"); }
  async updateFrameworkElement(id, element) { throw new Error("Not implemented"); }
  
  // Newsletter methods
  async subscribeNewsletter(subscription) { throw new Error("Not implemented"); }
  async unsubscribeNewsletter(email) { throw new Error("Not implemented"); }
  async getNewsletterSubscription(email) { throw new Error("Not implemented"); }
  
  // Contact methods
  async createContact(contact) { throw new Error("Not implemented"); }
  async getAllContacts() { throw new Error("Not implemented"); }
  async updateContactStatus(id, status) { throw new Error("Not implemented"); }
  
  // Stats methods
  async getStats() { throw new Error("Not implemented"); }
  async updateStats(statsData) { throw new Error("Not implemented"); }
}

export class DatabaseStorage extends IStorage {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Event methods
  async getAllEvents() {
    return await db.select().from(events).orderBy(desc(events.date));
  }

  async getEvent(id) {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async createEvent(insertEvent) {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }

  async updateEvent(id, updateEvent) {
    const [event] = await db.update(events).set(updateEvent).where(eq(events.id, id)).returning();
    return event;
  }

  async deleteEvent(id) {
    await db.delete(events).where(eq(events.id, id));
  }

  // Resource methods
  async getAllResources() {
    return await db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async getResource(id) {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource || undefined;
  }

  async getResourcesByCategory(category) {
    return await db.select().from(resources).where(eq(resources.category, category)).orderBy(desc(resources.createdAt));
  }

  async createResource(insertResource) {
    const [resource] = await db.insert(resources).values(insertResource).returning();
    return resource;
  }

  async updateResource(id, updateResource) {
    const [resource] = await db.update(resources).set(updateResource).where(eq(resources.id, id)).returning();
    return resource;
  }

  async deleteResource(id) {
    await db.delete(resources).where(eq(resources.id, id));
  }

  async incrementDownloadCount(id) {
    const [resource] = await db.update(resources)
      .set({ downloadCount: resources.downloadCount + 1 })
      .where(eq(resources.id, id))
      .returning();
    return resource;
  }

  // Framework methods
  async getAllFrameworkElements() {
    return await db.select().from(frameworkElements).orderBy(asc(frameworkElements.number));
  }

  async getFrameworkElement(id) {
    const [element] = await db.select().from(frameworkElements).where(eq(frameworkElements.id, id));
    return element || undefined;
  }

  async createFrameworkElement(insertElement) {
    const [element] = await db.insert(frameworkElements).values(insertElement).returning();
    return element;
  }

  async updateFrameworkElement(id, updateElement) {
    const [element] = await db.update(frameworkElements).set(updateElement).where(eq(frameworkElements.id, id)).returning();
    return element;
  }

  // Newsletter methods
  async subscribeNewsletter(insertSubscription) {
    const [subscription] = await db.insert(newsletters).values(insertSubscription).returning();
    return subscription;
  }

  async unsubscribeNewsletter(email) {
    await db.update(newsletters).set({ isActive: false }).where(eq(newsletters.email, email));
  }

  async getNewsletterSubscription(email) {
    const [subscription] = await db.select().from(newsletters).where(eq(newsletters.email, email));
    return subscription || undefined;
  }

  // Contact methods
  async createContact(insertContact) {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async getAllContacts() {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async updateContactStatus(id, status) {
    const [contact] = await db.update(contacts).set({ status }).where(eq(contacts.id, id)).returning();
    return contact;
  }

  // Stats methods
  async getStats() {
    const [statsData] = await db.select().from(stats).orderBy(desc(stats.updatedAt));
    return statsData || {
      networkPartners: 250,
      countries: 54,
      webinars: 24,
      speakers: 180,
      participants: 12500
    };
  }

  async updateStats(statsData) {
    const [updatedStats] = await db.insert(stats).values(statsData).returning();
    return updatedStats;
  }
}

export const storage = new DatabaseStorage();
