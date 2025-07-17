import { 
  users, events, resources, frameworkElements, newsletters, contacts, statistics,
  type User, type Event, type Resource, type FrameworkElement, type Newsletter, type Contact, type Statistics,
  type InsertUser, type InsertEvent, type InsertResource, type InsertFrameworkElement, type InsertNewsletter, type InsertContact, type InsertStatistics
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Framework elements methods
  getAllFrameworkElements(): Promise<FrameworkElement[]>;
  getFrameworkElement(id: number): Promise<FrameworkElement | undefined>;
  createFrameworkElement(insertFrameworkElement: InsertFrameworkElement): Promise<FrameworkElement>;
  
  // Events methods
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(insertEvent: InsertEvent): Promise<Event>;
  
  // Resources methods
  getAllResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  createResource(insertResource: InsertResource): Promise<Resource>;
  
  // Newsletter methods
  createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Contact methods
  createContact(insertContact: InsertContact): Promise<Contact>;
  
  // Statistics methods
  getStatistics(): Promise<Statistics | undefined>;
  updateStatistics(insertStatistics: InsertStatistics): Promise<Statistics>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Framework elements methods
  async getAllFrameworkElements(): Promise<FrameworkElement[]> {
    return await db.select().from(frameworkElements);
  }

  async getFrameworkElement(id: number): Promise<FrameworkElement | undefined> {
    const [element] = await db.select().from(frameworkElements).where(eq(frameworkElements.id, id));
    return element || undefined;
  }

  async createFrameworkElement(insertFrameworkElement: InsertFrameworkElement): Promise<FrameworkElement> {
    const [element] = await db
      .insert(frameworkElements)
      .values(insertFrameworkElement)
      .returning();
    return element;
  }

  // Events methods
  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db
      .insert(events)
      .values(insertEvent)
      .returning();
    return event;
  }

  // Resources methods
  async getAllResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource || undefined;
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.category, category));
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db
      .insert(resources)
      .values(insertResource)
      .returning();
    return resource;
  }

  // Newsletter methods
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletters)
      .values(insertNewsletter)
      .returning();
    return newsletter;
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  // Statistics methods
  async getStatistics(): Promise<Statistics | undefined> {
    const [stats] = await db.select().from(statistics);
    return stats || undefined;
  }

  async updateStatistics(insertStatistics: InsertStatistics): Promise<Statistics> {
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