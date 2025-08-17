# Admin Dashboard Access

## Default Admin Credentials

**Username:** admin  
**Password:** admin123

## Admin Dashboard Features

### Access URL
- **Development:** `http://localhost:5000/admin`
- **Production:** `https://[your-domain]/admin`

### Available Management Tabs

1. **Dashboard** - Overview with statistics and quick actions
2. **Users** - User management with profiles and permissions
3. **Webinars** - Complete webinar lifecycle management
4. **Contacts** - Contact form submissions and communication
5. **News & Events** - Content management for articles and events
6. **Resources** - Document library with categorization
7. **Webinar Files** - Presentation materials and downloads
8. **Content** - Site statistics and configuration

### Key Administrative Functions

- **User Management**: Create, edit, deactivate user accounts
- **Content Publishing**: Create and manage news, events, resources
- **Webinar Administration**: Schedule webinars, manage recordings
- **Contact Management**: Review and respond to inquiries
- **Site Configuration**: Update homepage statistics and settings
- **Analytics**: Monitor user engagement and content performance

### Security Notes

- Admin credentials are protected with bcrypt hashing
- JWT tokens used for session management
- All admin routes require authentication
- Role-based access control implemented
- Activity logging for audit trails

### Password Reset

If you need to reset the admin password:
1. Use the password reset functionality in the admin login page
2. Or contact the system administrator
3. For development, credentials can be updated in the database directly

### Data Management

The admin dashboard provides comprehensive CRUD operations for:
- User accounts and profiles
- Webinar content and resources
- News articles and event listings
- Resource documents and downloads
- Contact inquiries and responses
- Site configuration and statistics