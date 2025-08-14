# Africa Mechanize Web Application

## Overview

This is a full-stack web application for Africa Mechanize, built using React (frontend) and Express.js (backend) with TypeScript. The application serves as a platform for promoting sustainable agricultural mechanization in Africa, featuring framework elements, events, resources, and user engagement tools.

## User Preferences

Preferred communication style: Simple, everyday language.
File format preference: JSX files instead of TSX (converted December 2024).

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
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **API Structure**: RESTful endpoints organized by resource type
- **Middleware**: Custom logging, JSON parsing, error handling
- **Development**: Hot reload with tsx

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