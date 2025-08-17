import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  role: varchar("role", { length: 20 }).default("user"),
  isActive: boolean("is_active").default(true),
  isEmailVerified: boolean("is_email_verified").default(false),
  emailVerificationToken: varchar("email_verification_token", { length: 255 }),
  resetPasswordToken: varchar("reset_password_token", { length: 255 }),
  resetPasswordExpires: timestamp("reset_password_expires"),
  lastLoginAt: timestamp("last_login_at"),
  profileImageUrl: varchar("profile_image_url", { length: 500 }),
  organization: varchar("organization", { length: 255 }),
  country: varchar("country", { length: 100 }),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Webinars table
export const webinars = pgTable("webinars", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  description: text("description").notNull(),
  shortDescription: varchar("short_description", { length: 500 }),
  speakerName: varchar("speaker_name", { length: 255 }).notNull(),
  speakerTitle: varchar("speaker_title", { length: 255 }),
  speakerBio: text("speaker_bio"),
  speakerImage: varchar("speaker_image", { length: 500 }),
  scheduledDate: timestamp("scheduled_date").notNull(),
  duration: integer("duration").notNull(), // in minutes
  status: varchar("status", { length: 20 }).default("upcoming"), // upcoming, live, completed, cancelled
  registrationRequired: boolean("registration_required").default(true),
  maxAttendees: integer("max_attendees"),
  currentAttendees: integer("current_attendees").default(0),
  thumbnailImage: varchar("thumbnail_image", { length: 500 }),
  bannerImage: varchar("banner_image", { length: 500 }),
  tags: text("tags").array(),
  category: varchar("category", { length: 100 }),
  language: varchar("language", { length: 10 }).default("en"),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Webinar Resources (presentations, downloads, etc.)
export const webinarResources = pgTable("webinar_resources", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").references(() => webinars.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  resourceType: varchar("resource_type", { length: 50 }).notNull(), // presentation, download, link, video
  fileUrl: varchar("file_url", { length: 500 }),
  fileName: varchar("file_name", { length: 255 }),
  fileSize: integer("file_size"), // in bytes
  requiresAuth: boolean("requires_auth").default(false),
  downloadCount: integer("download_count").default(0),
  isPublic: boolean("is_public").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Webinar Recordings (YouTube, Google Drive, etc.)
export const webinarRecordings = pgTable("webinar_recordings", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").references(() => webinars.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  recordingUrl: varchar("recording_url", { length: 500 }).notNull(),
  recordingType: varchar("recording_type", { length: 50 }).notNull(), // youtube, gdrive, vimeo, direct
  duration: integer("duration"), // in minutes
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  requiresAuth: boolean("requires_auth").default(true),
  viewCount: integer("view_count").default(0),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Webinar Registrations
export const webinarRegistrations = pgTable("webinar_registrations", {
  id: serial("id").primaryKey(),
  webinarId: integer("webinar_id").references(() => webinars.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  registeredAt: timestamp("registered_at").defaultNow(),
  attended: boolean("attended").default(false),
  attendedAt: timestamp("attended_at"),
});

// Framework Elements
export const frameworkElements = pgTable("framework_elements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  shortTitle: varchar("short_title", { length: 100 }),
  description: text("description").notNull(),
  details: text("details"),
  category: varchar("category", { length: 100 }),
  color: varchar("color", { length: 100 }),
  icon: varchar("icon", { length: 50 }),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Newsletter Subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  isActive: boolean("is_active").default(true),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

// Contact Forms
export const contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("new"), // new, read, responded, closed
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWebinarSchema = createInsertSchema(webinars).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  currentAttendees: true,
});

export const insertWebinarResourceSchema = createInsertSchema(webinarResources).omit({
  id: true,
  createdAt: true,
  downloadCount: true,
});

export const insertWebinarRecordingSchema = createInsertSchema(webinarRecordings).omit({
  id: true,
  createdAt: true,
  viewCount: true,
});

export const insertWebinarRegistrationSchema = createInsertSchema(webinarRegistrations).omit({
  id: true,
  registeredAt: true,
  attended: true,
  attendedAt: true,
});

export const insertFrameworkElementSchema = createInsertSchema(frameworkElements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  subscribedAt: true,
  unsubscribedAt: true,
});

export const insertContactFormSchema = createInsertSchema(contactForms).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Webinar = typeof webinars.$inferSelect;
export type InsertWebinar = z.infer<typeof insertWebinarSchema>;

export type WebinarResource = typeof webinarResources.$inferSelect;
export type InsertWebinarResource = z.infer<typeof insertWebinarResourceSchema>;

export type WebinarRecording = typeof webinarRecordings.$inferSelect;
export type InsertWebinarRecording = z.infer<typeof insertWebinarRecordingSchema>;

export type WebinarRegistration = typeof webinarRegistrations.$inferSelect;
export type InsertWebinarRegistration = z.infer<typeof insertWebinarRegistrationSchema>;

export type FrameworkElement = typeof frameworkElements.$inferSelect;
export type InsertFrameworkElement = z.infer<typeof insertFrameworkElementSchema>;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;

export type ContactForm = typeof contactForms.$inferSelect;
export type InsertContactForm = z.infer<typeof insertContactFormSchema>;

// Auth schemas for routes
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  organization: z.string().optional(),
  country: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});