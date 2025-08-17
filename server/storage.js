import { 
  users, frameworkElements, newsletterSubscriptions, contactForms, 
  webinars, webinarResources, webinarRecordings, webinarRegistrations, statistics
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

  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async updateUser(id, updateData) {
    const [user] = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
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

  async updateEvent(id, updateData) {
    const [event] = await db
      .update(events)
      .set(updateData)
      .where(eq(events.id, id))
      .returning();
    return event;
  }

  async deleteEvent(id) {
    await db.delete(events).where(eq(events.id, id));
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

  async updateResource(id, updateData) {
    const [resource] = await db
      .update(resources)
      .set(updateData)
      .where(eq(resources.id, id))
      .returning();
    return resource;
  }

  async deleteResource(id) {
    await db.delete(resources).where(eq(resources.id, id));
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

  // Webinars methods
  async getAllWebinars() {
    return await db.select().from(webinars);
  }

  async getWebinar(id) {
    const [webinar] = await db.select().from(webinars).where(eq(webinars.id, id));
    return webinar || undefined;
  }

  async createWebinar(insertWebinar) {
    const [webinar] = await db
      .insert(webinars)
      .values(insertWebinar)
      .returning();
    return webinar;
  }

  async updateWebinar(id, updateData) {
    const [webinar] = await db
      .update(webinars)
      .set(updateData)
      .where(eq(webinars.id, id))
      .returning();
    return webinar;
  }

  async deleteWebinar(id) {
    await db.delete(webinars).where(eq(webinars.id, id));
  }

  // Reading Materials methods
  async getAllReadingMaterials() {
    return await db.select().from(readingMaterials);
  }

  async getReadingMaterial(id) {
    const [material] = await db.select().from(readingMaterials).where(eq(readingMaterials.id, id));
    return material || undefined;
  }

  async createReadingMaterial(insertMaterial) {
    const [material] = await db
      .insert(readingMaterials)
      .values(insertMaterial)
      .returning();
    return material;
  }

  async updateReadingMaterial(id, updateData) {
    const [material] = await db
      .update(readingMaterials)
      .set(updateData)
      .where(eq(readingMaterials.id, id))
      .returning();
    return material;
  }

  async deleteReadingMaterial(id) {
    await db.delete(readingMaterials).where(eq(readingMaterials.id, id));
  }

  // Mock data methods for new features (to be replaced with real DB methods when schema is ready)
  async getAllPartners() {
    return [
      { id: 1, name: "FAO", type: "organization", website: "https://www.fao.org", country: "Global" },
      { id: 2, name: "African Union Commission", type: "organization", website: "https://au.int", country: "Continental" }
    ];
  }

  async getAllConferences() {
    return [
      { 
        id: 1, 
        title: "FAO Global Conference On Sustainable Agricultural Mechanization",
        description: "Major international conference bringing together experts, policymakers, and practitioners to discuss the future of sustainable agricultural mechanization globally.",
        startDate: "2023-09-29",
        endDate: "2023-09-29",
        location: "Rome, Italy",
        isVirtual: false,
        website: "https://www.fao.org/conferences"
      }
    ];
  }


}

export const storage = new DatabaseStorage();