import express from 'express';
import { db } from '../db.js';
import { webinars, webinarResources, webinarRecordings, webinarRegistrations } from '@shared/schema';
import { eq, desc, and, or, sql, gte, lte } from 'drizzle-orm';
import { requireAuth } from '../auth.js';

const router = express.Router();

// Get all webinars with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      status, 
      limit = 10, 
      offset = 0, 
      recent = false,
      category,
      search
    } = req.query;

    let query = db.select().from(webinars);
    const conditions = [eq(webinars.isPublic, true)];

    // Filter by status
    if (status) {
      conditions.push(eq(webinars.status, status));
    }

    // Filter by category
    if (category) {
      conditions.push(eq(webinars.category, category));
    }

    // Search functionality
    if (search) {
      conditions.push(
        or(
          sql`${webinars.title} ILIKE ${'%' + search + '%'}`,
          sql`${webinars.description} ILIKE ${'%' + search + '%'}`,
          sql`${webinars.speakerName} ILIKE ${'%' + search + '%'}`
        )
      );
    }

    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Order by date
    if (recent) {
      query = query.orderBy(desc(webinars.scheduledDate));
    } else {
      query = query.orderBy(webinars.scheduledDate);
    }

    // Apply pagination
    query = query.limit(parseInt(limit)).offset(parseInt(offset));

    const result = await query;

    res.json(result);
  } catch (error) {
    console.error('Error fetching webinars:', error);
    res.status(500).json({ message: 'Failed to fetch webinars' });
  }
});

// Get single webinar by slug with resources and recordings
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const isAuthenticated = req.isAuthenticated && req.isAuthenticated();

    // Get webinar
    const [webinar] = await db
      .select()
      .from(webinars)
      .where(and(
        eq(webinars.slug, slug),
        eq(webinars.isPublic, true)
      ));

    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    // Get public resources
    const publicResources = await db
      .select()
      .from(webinarResources)
      .where(and(
        eq(webinarResources.webinarId, webinar.id),
        eq(webinarResources.isPublic, true)
      ))
      .orderBy(webinarResources.sortOrder);

    // Get auth-required resources if user is logged in
    const authResources = isAuthenticated ? await db
      .select()
      .from(webinarResources)
      .where(and(
        eq(webinarResources.webinarId, webinar.id),
        eq(webinarResources.requiresAuth, true),
        eq(webinarResources.isPublic, true)
      ))
      .orderBy(webinarResources.sortOrder) : [];

    // Get recordings (auth required)
    const recordings = isAuthenticated ? await db
      .select()
      .from(webinarRecordings)
      .where(and(
        eq(webinarRecordings.webinarId, webinar.id),
        eq(webinarRecordings.isPublic, true)
      )) : [];

    // Check if user is registered (if authenticated)
    let isRegistered = false;
    if (isAuthenticated && req.user) {
      const registration = await db
        .select()
        .from(webinarRegistrations)
        .where(and(
          eq(webinarRegistrations.webinarId, webinar.id),
          eq(webinarRegistrations.userId, req.user.id)
        ))
        .limit(1);
      
      isRegistered = registration.length > 0;
    }

    res.json({
      ...webinar,
      resources: {
        public: publicResources,
        authenticated: authResources
      },
      recordings: recordings,
      isRegistered: isRegistered,
      canViewRecordings: isAuthenticated
    });
  } catch (error) {
    console.error('Error fetching webinar:', error);
    res.status(500).json({ message: 'Failed to fetch webinar' });
  }
});

// Register for a webinar (authenticated users only)
router.post('/:slug/register', requireAuth, async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;

    // Get webinar
    const [webinar] = await db
      .select()
      .from(webinars)
      .where(and(
        eq(webinars.slug, slug),
        eq(webinars.isPublic, true)
      ));

    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    // Check if registration is required
    if (!webinar.registrationRequired) {
      return res.status(400).json({ message: 'Registration not required for this webinar' });
    }

    // Check if webinar is in the future
    if (new Date(webinar.scheduledDate) < new Date()) {
      return res.status(400).json({ message: 'Cannot register for past webinars' });
    }

    // Check if already registered
    const existingRegistration = await db
      .select()
      .from(webinarRegistrations)
      .where(and(
        eq(webinarRegistrations.webinarId, webinar.id),
        eq(webinarRegistrations.userId, userId)
      ))
      .limit(1);

    if (existingRegistration.length > 0) {
      return res.status(400).json({ message: 'Already registered for this webinar' });
    }

    // Check capacity
    if (webinar.maxAttendees && webinar.currentAttendees >= webinar.maxAttendees) {
      return res.status(400).json({ message: 'Webinar is full' });
    }

    // Create registration
    await db.insert(webinarRegistrations).values({
      webinarId: webinar.id,
      userId: userId
    });

    // Update attendee count
    await db
      .update(webinars)
      .set({ currentAttendees: sql`${webinars.currentAttendees} + 1` })
      .where(eq(webinars.id, webinar.id));

    res.json({ message: 'Successfully registered for webinar' });
  } catch (error) {
    console.error('Error registering for webinar:', error);
    res.status(500).json({ message: 'Failed to register for webinar' });
  }
});

// Download resource (increment download count)
router.get('/:slug/resources/:resourceId/download', async (req, res) => {
  try {
    const { slug, resourceId } = req.params;
    const isAuthenticated = req.isAuthenticated && req.isAuthenticated();

    // Get webinar and resource
    const [webinar] = await db
      .select()
      .from(webinars)
      .where(and(
        eq(webinars.slug, slug),
        eq(webinars.isPublic, true)
      ));

    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    const [resource] = await db
      .select()
      .from(webinarResources)
      .where(and(
        eq(webinarResources.id, parseInt(resourceId)),
        eq(webinarResources.webinarId, webinar.id),
        eq(webinarResources.isPublic, true)
      ));

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if auth is required
    if (resource.requiresAuth && !isAuthenticated) {
      return res.status(401).json({ message: 'Authentication required to download this resource' });
    }

    // Increment download count
    await db
      .update(webinarResources)
      .set({ downloadCount: sql`${webinarResources.downloadCount} + 1` })
      .where(eq(webinarResources.id, resource.id));

    res.json({
      downloadUrl: resource.fileUrl,
      fileName: resource.fileName
    });
  } catch (error) {
    console.error('Error downloading resource:', error);
    res.status(500).json({ message: 'Failed to download resource' });
  }
});

// Get user's webinar registrations (authenticated users only)
router.get('/user/registrations', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const registrations = await db
      .select({
        webinar: webinars,
        registration: webinarRegistrations
      })
      .from(webinarRegistrations)
      .innerJoin(webinars, eq(webinarRegistrations.webinarId, webinars.id))
      .where(eq(webinarRegistrations.userId, userId))
      .orderBy(desc(webinars.scheduledDate));

    res.json(registrations);
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

export default router;