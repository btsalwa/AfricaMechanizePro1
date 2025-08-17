# Admin System Setup

## Default Admin Credentials

**Username:** `admin`  
**Password:** `admin123`  
**Email:** `admin@africamechanize.org`  
**Role:** `super_admin`

## Admin System Features

### 🔐 Authentication & Security
- **Password Protection**: Secure login with bcrypt password hashing
- **JWT Tokens**: Session management with 24-hour token expiration
- **Password Reset**: Email-based password reset with secure tokens
- **Role-Based Access**: Support for admin and super_admin roles

### 📊 Admin Dashboard
- **Statistics Overview**: Real-time site statistics (users, webinars, contacts, newsletters)
- **User Management**: View and manage registered users
- **Webinar Management**: Create, edit, and manage webinars and events
- **Contact Management**: Review contact form submissions
- **Content Settings**: Update site statistics and configurations

### 🛡️ Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Main admin dashboard
- `/admin/reset-password` - Password reset request

### 🔧 API Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/verify` - Token verification
- `POST /api/admin/reset-password` - Password reset request
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - User management data
- `GET /api/admin/webinars` - Webinar management data
- `GET /api/admin/contacts` - Contact form submissions

## First Time Setup

1. **Access Admin Panel**: Navigate to `/admin/login`
2. **Login**: Use the default credentials above
3. **Change Password**: Immediately update the password after first login
4. **Configure Email**: Set up SMTP credentials for password reset functionality

## Security Features

- **Protected Routes**: All admin routes require valid JWT authentication
- **Token Expiration**: 24-hour token lifetime with automatic logout
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Email Verification**: Secure password reset via email tokens (1-hour expiration)

## Development Notes

- Admin users are stored in the `admin_users` table
- Passwords are hashed using bcryptjs with 10 salt rounds
- JWT tokens use HS256 algorithm with server secret
- Password reset tokens expire after 1 hour
- All admin API routes are protected with token verification middleware

## Production Considerations

1. **Change Default Password**: Always change the default admin password
2. **Set JWT Secret**: Use a strong, unique JWT_SECRET environment variable
3. **Configure SMTP**: Set up proper email service for password resets
4. **Backup Database**: Regular backups of admin_users table
5. **Monitor Access**: Log admin login attempts and activities