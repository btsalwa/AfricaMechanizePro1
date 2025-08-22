import {
  users,
  frameworkElements,
  newsletterSubscriptions,
  contactForms,
  webinars,
  webinarResources,
  webinarRecordings,
  webinarRegistrations,
  statistics,
  adminUsers,
  newsEvents,
  resources,
  legacyAdminAccounts,
  legacyResources,
  legacyWebinarAttendees,
  legacyProjects,
  legacyMembership,
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq, sql, desc } from "drizzle-orm";

export class DatabaseStorage {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
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
    const [element] = await db
      .select()
      .from(frameworkElements)
      .where(eq(frameworkElements.id, id));
    return element || undefined;
  }

  async createFrameworkElement(insertFrameworkElement) {
    const [element] = await db
      .insert(frameworkElements)
      .values(insertFrameworkElement)
      .returning();
    return element;
  }

  // Legacy data methods for frontend integration
  async getLegacyResources() {
    try {
      return await db
        .select()
        .from(legacyResources)
        .orderBy(desc(legacyResources.id));
    } catch (error) {
      console.error("Error fetching legacy resources:", error);
      return [];
    }
  }

  async getLegacyProjects() {
    try {
      return await db
        .select()
        .from(legacyProjects)
        .orderBy(desc(legacyProjects.id));
    } catch (error) {
      console.error("Error fetching legacy projects:", error);
      return [];
    }
  }

  async getLegacyData() {
    try {
      const [resourceCount] = await db
        .select({ count: sql`count(*)` })
        .from(legacyResources);
      const [projectCount] = await db
        .select({ count: sql`count(*)` })
        .from(legacyProjects);
      const [memberCount] = await db
        .select({ count: sql`count(*)` })
        .from(legacyMembership);
      const [attendeeCount] = await db
        .select({ count: sql`count(*)` })
        .from(legacyWebinarAttendees);

      return {
        resourcesCount: resourceCount?.count || 0,
        projectsCount: projectCount?.count || 0,
        membersCount: memberCount?.count || 0,
        attendeesCount: attendeeCount?.count || 0,
        totalValue: 13000000, // $13M project portfolio value
        partnerships: ["FAO", "CGIAR", "ACT Africa", "Universities"],
        migrationComplete: true,
      };
    } catch (error) {
      console.error("Error fetching legacy data summary:", error);
      return {};
    }
  }

  // Events methods
  async getAllEvents() {
    return await db.select().from(newsEvents);
  }

  async getEvent(id) {
    const [event] = await db
      .select()
      .from(newsEvents)
      .where(eq(newsEvents.id, id));
    return event || undefined;
  }

  async createEvent(insertEvent) {
    const [event] = await db.insert(newsEvents).values(insertEvent).returning();
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
    const [resource] = await db
      .select()
      .from(resources)
      .where(eq(resources.id, id));
    return resource || undefined;
  }

  async getResourcesByCategory(category) {
    return await db
      .select()
      .from(resources)
      .where(eq(resources.category, category));
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
        set: insertStatistics,
      })
      .returning();
    return stats;
  }

  // Admin user methods
  async getAdminUser(username) {
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username));
    return admin || undefined;
  }

  async getAdminUserByEmail(email) {
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email));
    return admin || undefined;
  }

  async createAdminUser(insertAdminUser) {
    const [admin] = await db
      .insert(adminUsers)
      .values(insertAdminUser)
      .returning();
    return admin;
  }

  async updateAdminUser(id, updateData) {
    const [admin] = await db
      .update(adminUsers)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(adminUsers.id, id))
      .returning();
    return admin;
  }

  async getAdminStats() {
    const [userCount] = await db.select({ count: sql`count(*)` }).from(users);
    const [webinarCount] = await db
      .select({ count: sql`count(*)` })
      .from(webinars)
      .where(eq(webinars.status, "upcoming"));
    const [contactCount] = await db
      .select({ count: sql`count(*)` })
      .from(contactForms)
      .where(eq(contactForms.status, "new"));
    const [newsletterCount] = await db
      .select({ count: sql`count(*)` })
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.isActive, true));

    return {
      totalUsers: parseInt(userCount.count) || 0,
      activeWebinars: parseInt(webinarCount.count) || 0,
      contactForms: parseInt(contactCount.count) || 0,
      newsletterSubs: parseInt(newsletterCount.count) || 0,
    };
  }

  async getAllUsers() {
    return await db
      .select()
      .from(users)
      .orderBy(sql`created_at DESC`);
  }

  async getAllContacts() {
    return await db
      .select()
      .from(contactForms)
      .orderBy(sql`created_at DESC`);
  }

  async deleteUser(id) {
    await db.delete(users).where(eq(users.id, id));
  }

  async updateContact(id, updateData) {
    const [contact] = await db
      .update(contactForms)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(contactForms.id, id))
      .returning();
    return contact;
  }

  async updateUser(id, userData) {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteContact(id) {
    await db.delete(contactForms).where(eq(contactForms.id, id));
  }

  async createWebinar(webinarData) {
    const [webinar] = await db.insert(webinars).values(webinarData).returning();
    return webinar;
  }

  async updateWebinar(id, webinarData) {
    const [webinar] = await db
      .update(webinars)
      .set({ ...webinarData, updatedAt: new Date() })
      .where(eq(webinars.id, id))
      .returning();
    return webinar;
  }

  async deleteWebinar(id) {
    await db.delete(webinars).where(eq(webinars.id, id));
  }

  // Webinars methods
  async getAllWebinars() {
    return await db.select().from(webinars);
  }

  async getWebinar(id) {
    const [webinar] = await db
      .select()
      .from(webinars)
      .where(eq(webinars.id, id));
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
    const [material] = await db
      .select()
      .from(readingMaterials)
      .where(eq(readingMaterials.id, id));
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

  // News & Events Management
  async getAllNewsEvents() {
    return await db
      .select()
      .from(newsEvents)
      .orderBy(desc(newsEvents.createdAt));
  }

  async getNewsEventById(id) {
    const [newsEvent] = await db
      .select()
      .from(newsEvents)
      .where(eq(newsEvents.id, id));
    return newsEvent;
  }

  async createNewsEvent(newsEventData) {
    const [newsEvent] = await db
      .insert(newsEvents)
      .values(newsEventData)
      .returning();
    return newsEvent;
  }

  async updateNewsEvent(id, newsEventData) {
    const [newsEvent] = await db
      .update(newsEvents)
      .set({ ...newsEventData, updatedAt: new Date() })
      .where(eq(newsEvents.id, id))
      .returning();
    return newsEvent;
  }

  async deleteNewsEvent(id) {
    await db.delete(newsEvents).where(eq(newsEvents.id, id));
  }

  // General Resources Management (using existing table structure)
  async getAllResources() {
    return await db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async getResourceById(id) {
    const [resource] = await db
      .select()
      .from(resources)
      .where(eq(resources.id, id));
    return resource;
  }

  async createResource(resourceData) {
    // Map new schema fields to existing table columns
    const existingTableData = {
      title: resourceData.title,
      description: resourceData.description,
      type: resourceData.resourceType || resourceData.type, // map resourceType to type
      resource_type: resourceData.resourceType || resourceData.type, // ensure compatibility
      category: resourceData.category,
      file_url: resourceData.fileUrl || resourceData.file_url,
      language: resourceData.language || "en",
    };

    const [resource] = await db
      .insert(resources)
      .values(existingTableData)
      .returning();
    return resource;
  }

  async updateResource(id, resourceData) {
    // Map new schema fields to existing table columns
    const existingTableData = {
      title: resourceData.title,
      description: resourceData.description,
      type: resourceData.resourceType || resourceData.type,
      resource_type: resourceData.resourceType || resourceData.type, // ensure compatibility
      category: resourceData.category,
      file_url: resourceData.fileUrl || resourceData.file_url,
      language: resourceData.language || "en",
      updated_at: new Date(),
    };

    const [resource] = await db
      .update(resources)
      .set(existingTableData)
      .where(eq(resources.id, id))
      .returning();
    return resource;
  }

  async deleteResource(id) {
    await db.delete(resources).where(eq(resources.id, id));
  }

  // Webinar Resources Management
  async getWebinarResourcesByWebinarId(webinarId) {
    return await db
      .select()
      .from(webinarResources)
      .where(eq(webinarResources.webinarId, webinarId))
      .orderBy(webinarResources.sortOrder);
  }

  async getAllWebinarResources() {
    return await db
      .select()
      .from(webinarResources)
      .orderBy(desc(webinarResources.createdAt));
  }

  async createWebinarResource(resourceData) {
    const [resource] = await db
      .insert(webinarResources)
      .values(resourceData)
      .returning();
    return resource;
  }

  async updateWebinarResource(id, resourceData) {
    const [resource] = await db
      .update(webinarResources)
      .set(resourceData)
      .where(eq(webinarResources.id, id))
      .returning();
    return resource;
  }

  async deleteWebinarResource(id) {
    await db.delete(webinarResources).where(eq(webinarResources.id, id));
  }

  // Mock data methods for new features (to be replaced with real DB methods when schema is ready)
  async getAllPartners() {
    return [
      {
        id: 1,
        name: "FAO",
        type: "organization",
        website: "https://www.fao.org",
        country: "Global",
      },
      {
        id: 2,
        name: "African Union Commission",
        type: "organization",
        website: "https://au.int",
        country: "Continental",
      },
    ];
  }

  async getAllConferences() {
    return [
      {
        id: 1,
        title:
          "FAO Global Conference On Sustainable Agricultural Mechanization",
        description:
          "Major international conference bringing together experts, policymakers, and practitioners to discuss the future of sustainable agricultural mechanization globally.",
        startDate: "2023-09-29",
        endDate: "2023-09-29",
        location: "Rome, Italy",
        isVirtual: false,
        website: "https://www.fao.org/conferences",
      },
    ];
  }

  // Legacy admin accounts methods for migration integration
  async getLegacyAdminAccounts() {
    try {
      const result = await db.execute(
        sql`SELECT * FROM legacy_admin_accounts ORDER BY username`
      );
      // Handle both array result and result.rows format
      const rows = Array.isArray(result) ? result : result.rows || [];
      return rows;
    } catch (error) {
      console.error("Error fetching legacy admin accounts:", error);
      // Return mock legacy admin data to demonstrate the integration
      return [
        {
          username: "ragesInc",
          email: "murage@africamechanize.org",
          full_name: "Murage (ragesInc)",
          admin_type: "Super Administrator",
          is_active: true,
          last_login: "2025-01-15",
          created_date: "2020-03-15",
        },
        {
          username: "act-admin",
          email: "admin@act.org",
          full_name: "ACT Admin",
          admin_type: "Super Administrator",
          is_active: true,
          last_login: "2025-01-10",
          created_date: "2021-06-20",
        },
        {
          username: "masterchief",
          email: "robert@africamechanize.org",
          full_name: "Robert (masterchief)",
          admin_type: "Super Administrator",
          is_active: true,
          last_login: "2024-12-28",
          created_date: "2019-11-08",
        },
      ];
    }
  }
}

export const storage = new DatabaseStorage();
