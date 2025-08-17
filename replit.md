# Africa Mechanize Web Application

## Overview

This is a full-stack web application for Africa Mechanize, built using React (frontend) and Express.js (backend) with TypeScript. The application serves as a platform for promoting sustainable agricultural mechanization in Africa, featuring framework elements, events, resources, and user engagement tools.

## User Preferences

Preferred communication style: Simple, everyday language.
File format preference: JSX files instead of TSX (converted January 2025).
Integration improvements: Added enhanced server architecture, migration system, and additional libraries from AfricaMechanizePro repository.

## Recent Changes (August 2025)

### Admin System Implementation (Latest)
- Built comprehensive admin system with password-protected routes and content management
- Implemented secure JWT-based authentication with bcrypt password hashing
- Created admin dashboard with real-time statistics, user management, webinar management, and contact management
- Added password reset functionality with email-based secure token system
- Established role-based access control supporting admin and super_admin roles
- Created default admin user: username 'admin', password 'admin123' (should be changed after first login)
- Added admin routes: /admin/login, /admin/dashboard, /admin/reset-password
- Integrated admin API endpoints with proper authentication middleware and token verification

### Authentication System Implementation
- Fixed all database schema issues by adding missing authentication columns (reset_password_token, profile_image_url, is_active, etc.)
- Resolved Passport.js local strategy initialization problems in server startup
- Implemented complete user registration and login system with session management
- Added authentication-protected webinar recordings access system
- Created proper error handling for account activation and invalid credentials

### Webinar System Enhancement
- Fixed webinar slug database issues with unique URL-friendly identifiers
- Enhanced webinar detail pages with authentication-protected recordings access
- Implemented comprehensive webinar management with YouTube/Google Drive links protection
- Added proper authentication gates for previous webinar recordings
- Created professional webinar display system with speaker information and resources

### Complete Website Structure Implementation (August 2025)
- Successfully replicated actual africamechanize.org website structure and content
- Created 6 detailed F-SAMA framework element pages: Farm Power, Innovative Financing, Sustainable Systems, Sustainable Mechanization, Social Sustainability, and Human Resources
- Built comprehensive sections: Resources, About, Contact, News & Events with authentic content
- Enhanced navigation with dropdown menus for all 10 F-SAMA framework elements
- Fixed all TypeScript/JSX compatibility issues across UI components
- Integrated webinar connections within each framework element page
- Added professional layouts with breadcrumb navigation matching the real website

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React application with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon (serverless PostgreSQL)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with React plugin
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library (extensive collection of pre-built components)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for API state management
- **Form Handling**: React Hook Form with Zod validation resolvers

### Backend Architecture
- **Framework**: Express.js with JavaScript (migrated from TypeScript)
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Migration System**: Proper Drizzle migrations with SQL files
- **API Structure**: RESTful endpoints organized by resource type
- **Middleware**: Custom logging, JSON parsing, error handling
- **Environment**: dotenv for configuration management
- **Development**: Hot reload with tsx, cross-env for cross-platform compatibility

### Database Schema
The application includes several key entities:
- **Users**: Authentication and user management
- **Framework Elements**: F-SAMA framework components (10 elements for sustainable agricultural mechanization)
- **Events**: Conferences, webinars, meetings, workshops
- **Resources**: Webinars, newsletters, research papers, presentations
- **Contacts**: Contact form submissions
- **Newsletter**: Email subscription management
- **Statistics**: Application analytics and metrics

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express.js routes handle requests and validate data using Zod schemas
3. **Database Layer**: Drizzle ORM manages database operations with type safety
4. **Response**: Data flows back through the same layers with proper error handling

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Uses `@neondatabase/serverless` with WebSocket support

### UI/UX
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Embla Carousel**: Carousel component

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast bundling for production
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with hot reload
- **Backend**: tsx for TypeScript execution with auto-restart
- **Database**: Drizzle push for schema synchronization

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Assets**: Express serves built frontend files in production

### Environment Configuration
- **DATABASE_URL**: Required environment variable for PostgreSQL connection
- **NODE_ENV**: Determines development vs production behavior
- **Build Process**: Unified build script handles both frontend and backend

### Key Features
- **Replit Integration**: Special handling for Replit environment with cartographer plugin
- **Error Handling**: Comprehensive error boundaries and API error responses
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: Built on Radix UI primitives for WCAG compliance

The application is designed to be easily deployable on various platforms while maintaining development efficiency through hot reloading and type safety.