import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const frameworkElements = pgTable("framework_elements", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  detailsEn: text("details_en").notNull(),
  detailsFr: text("details_fr").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  type: text("type").notNull(), // 'conference', 'webinar', 'meeting', 'workshop'
  location: text("location"),
  isVirtual: boolean("is_virtual").notNull().default(false),
  registrationUrl: text("registration_url"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'webinar', 'newsletter', 'research', 'presentation'
  category: text("category").notNull(),
  language: text("language").notNull().default("en"),
  fileUrl: text("file_url"),
  downloadUrl: text("download_url"),
  section: text("section"), // 'Webinar 1', 'Magazine', 'Upcoming Webinars', etc.
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  preferences: jsonb("preferences").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  network: integer("network").notNull().default(0),
  countries: integer("countries").notNull().default(0),
  webinars: integer("webinars").notNull().default(0),
  speakers: integer("speakers").notNull().default(0),
  participants: integer("participants").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const webinars = pgTable("webinars", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  duration: text("duration").notNull(),
  presenter: text("presenter").notNull(),
  participants: integer("participants").notNull().default(0),
  maxParticipants: integer("max_participants").notNull().default(500),
  status: text("status").notNull().default("upcoming"), // 'upcoming', 'live', 'completed'
  language: text("language").notNull().default("English"),
  registrationUrl: text("registration_url"),
  topics: jsonb("topics").default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const readingMaterials = pgTable("reading_materials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'framework', 'case-study', 'technical', etc.
  author: text("author").notNull(),
  readTime: text("read_time").notNull(),
  difficulty: text("difficulty").notNull(), // 'Beginner', 'Intermediate', 'Advanced'
  downloadCount: integer("download_count").notNull().default(0),
  rating: integer("rating").notNull().default(4), // 1-5 scale, stored as integer (4.5 = 45)
  coverImage: text("cover_image"),
  tags: jsonb("tags").default([]),
  fileUrl: text("file_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced schema additions based on africamechanize.org content
export const conferences = pgTable("conferences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: text("location"),
  venue: text("venue"),
  isVirtual: boolean("is_virtual").notNull().default(false),
  abstractDeadline: timestamp("abstract_deadline"),
  registrationDeadline: timestamp("registration_deadline"),
  website: text("website"),
  contactEmail: text("contact_email"),
  theme: text("theme"),
  organizers: jsonb("organizers").default([]),
  speakers: jsonb("speakers").default([]),
  sponsors: jsonb("sponsors").default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const abstracts = pgTable("abstracts", {
  id: serial("id").primaryKey(),
  conferenceId: integer("conference_id").notNull(),
  title: text("title").notNull(),
  authorName: text("author_name").notNull(),
  authorEmail: text("author_email").notNull(),
  authorAffiliation: text("author_affiliation"),
  coAuthors: jsonb("co_authors").default([]),
  abstract: text("abstract").notNull(),
  keywords: jsonb("keywords").default([]),
  category: text("category").notNull(),
  presentationType: text("presentation_type").notNull(), // 'oral', 'poster'
  status: text("status").notNull().default("submitted"), // 'submitted', 'under-review', 'accepted', 'rejected'
  reviewComments: text("review_comments"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'sponsor', 'partner', 'organization', 'government'
  description: text("description"),
  website: text("website"),
  logoUrl: text("logo_url"),
  country: text("country"),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const webinarSeries = pgTable("webinar_series", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  totalWebinars: integer("total_webinars").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const abstractsRelations = relations(abstracts, ({ one }) => ({
  conference: one(conferences, {
    fields: [abstracts.conferenceId],
    references: [conferences.id],
  }),
}));

export const conferencesRelations = relations(conferences, ({ many }) => ({
  abstracts: many(abstracts),
}));

// Insert and Select Schemas
export const insertFrameworkElementSchema = createInsertSchema(frameworkElements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWebinarSchema = createInsertSchema(webinars).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertConferenceSchema = createInsertSchema(conferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAbstractSchema = createInsertSchema(abstracts).omit({
  id: true,
  submittedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReadingMaterialSchema = createInsertSchema(readingMaterials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type Exports
export type FrameworkElement = typeof frameworkElements.$inferSelect;
export type InsertFrameworkElement = z.infer<typeof insertFrameworkElementSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Webinar = typeof webinars.$inferSelect;
export type InsertWebinar = z.infer<typeof insertWebinarSchema>;

export type Conference = typeof conferences.$inferSelect;
export type InsertConference = z.infer<typeof insertConferenceSchema>;

export type Abstract = typeof abstracts.$inferSelect;
export type InsertAbstract = z.infer<typeof insertAbstractSchema>;

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;

export type ReadingMaterial = typeof readingMaterials.$inferSelect;
export type InsertReadingMaterial = z.infer<typeof insertReadingMaterialSchema>;

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Statistics = typeof statistics.$inferSelect;

// Additional type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type WebinarSeries = typeof webinarSeries.$inferSelect;
export type InsertWebinarSeries = z.infer<typeof insertWebinarSchema>;

// Insert schema for user table
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStatisticsSchema = createInsertSchema(statistics).omit({
  id: true,
  updatedAt: true,
});

export type Statistics = typeof statistics.$inferSelect;
export type InsertStatistics = z.infer<typeof insertStatisticsSchema>;

export type Webinar = typeof webinars.$inferSelect;
export type InsertWebinar = z.infer<typeof insertWebinarSchema>;

export type ReadingMaterial = typeof readingMaterials.$inferSelect;
export type InsertReadingMaterial = z.infer<typeof insertReadingMaterialSchema>;