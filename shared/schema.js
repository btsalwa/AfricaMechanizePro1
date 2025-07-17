import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  location: text("location"),
  type: text("type").notNull(), // 'webinar', 'conference', 'meeting'
  language: text("language").default("en"),
  registrationUrl: text("registration_url"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // 'webinar', 'newsletter', 'research', 'framework'
  language: text("language").default("en"),
  fileUrl: text("file_url"),
  downloadCount: integer("download_count").default(0),
  section: text("section"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const frameworkElements = pgTable("framework_elements", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description"),
  icon: text("icon"),
  color: text("color"),
  learnMoreUrl: text("learn_more_url"),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  language: text("language").default("en"),
  preferences: jsonb("preferences"),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  networkPartners: integer("network_partners").default(0),
  countries: integer("countries").default(0),
  webinars: integer("webinars").default(0),
  speakers: integer("speakers").default(0),
  participants: integer("participants").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  contacts: many(contacts),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  // Add relations if needed
}));

export const resourcesRelations = relations(resources, ({ one }) => ({
  // Add relations if needed
}));

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  role: true,
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  date: true,
  location: true,
  type: true,
  language: true,
  registrationUrl: true,
  imageUrl: true,
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  category: true,
  language: true,
  fileUrl: true,
  section: true,
});

export const insertFrameworkElementSchema = createInsertSchema(frameworkElements).pick({
  number: true,
  title: true,
  description: true,
  detailedDescription: true,
  icon: true,
  color: true,
  learnMoreUrl: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
  language: true,
  preferences: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertStatsSchema = createInsertSchema(stats).pick({
  networkPartners: true,
  countries: true,
  webinars: true,
  speakers: true,
  participants: true,
});

// Type exports
export const User = users.$inferSelect;
export const InsertUser = z.infer(insertUserSchema);
export const Event = events.$inferSelect;
export const InsertEvent = z.infer(insertEventSchema);
export const Resource = resources.$inferSelect;
export const InsertResource = z.infer(insertResourceSchema);
export const FrameworkElement = frameworkElements.$inferSelect;
export const InsertFrameworkElement = z.infer(insertFrameworkElementSchema);
export const Newsletter = newsletters.$inferSelect;
export const InsertNewsletter = z.infer(insertNewsletterSchema);
export const Contact = contacts.$inferSelect;
export const InsertContact = z.infer(insertContactSchema);
export const Stats = stats.$inferSelect;
export const InsertStats = z.infer(insertStatsSchema);
