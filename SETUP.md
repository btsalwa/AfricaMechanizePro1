# Africa Mechanize Project Setup Guide

This guide will help you download and run the Africa Mechanize web application on your local machine or deployment environment.

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database (local or cloud instance like Neon, Supabase, etc.)

## Step 1: Download and Extract

1. Download the project as a ZIP file
2. Extract the ZIP file to your desired location
3. Navigate to the project directory in your terminal:
   ```bash
   cd africa-mechanize-project
   ```

## Step 2: Install Dependencies

Install all required packages:
```bash
npm install
```

## Step 3: Environment Setup

1. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

2. Add your database configuration to `.env`:
   ```env
   DATABASE_URL=your_postgresql_connection_string_here
   NODE_ENV=development
   PORT=5000
   ```

   **Database URL Format Examples:**
   - **Neon**: `postgresql://username:password@host.neon.tech:5432/dbname?sslmode=require`
   - **Supabase**: `postgresql://postgres:password@db.project.supabase.co:5432/postgres`
   - **Local PostgreSQL**: `postgresql://username:password@localhost:5432/africa_mechanize`
   - **Railway**: `postgresql://postgres:password@host.railway.app:5432/railway`

## Step 4: Database Setup

The project includes pre-built migrations and will automatically set up the database structure.

### Option A: Push Schema to Database (Recommended)
```bash
npm run db:push
```

### Option B: Run Migrations (if available)
If you have migration files, run:
```bash
npx drizzle-kit migrate
```

## Step 5: Seed Database (Optional)

The application will work with an empty database, but you can populate it with sample data by running the server and using the API endpoints, or by importing SQL data if available.

## Step 6: Start the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The application will be available at:
- **Frontend**: http://localhost:5000
- **API**: http://localhost:5000/api/*

## Step 7: Verify Installation

1. Open your browser and go to `http://localhost:5000`
2. Check if the Africa Mechanize homepage loads
3. Verify API endpoints work:
   - Framework: `http://localhost:5000/api/framework`
   - Statistics: `http://localhost:5000/api/statistics`
   - Events: `http://localhost:5000/api/events`

## Database Schema

The application uses these main tables:
- `framework_elements` - F-SAMA framework components
- `events` - Conferences, webinars, meetings
- `resources` - Documents, presentations, materials
- `contacts` - Contact form submissions
- `newsletters` - Email subscriptions
- `statistics` - Application metrics
- `users` - User management (optional)

## Key Features

- **F-SAMA Framework**: 10 elements for sustainable agricultural mechanization
- **Event Management**: Conferences, webinars, workshops
- **Resource Library**: Multi-language documents and materials
- **Contact System**: Contact form and newsletter signup
- **Statistics Dashboard**: Network metrics and analytics
- **Responsive Design**: Works on desktop and mobile devices
- **Multi-language Support**: English and French content

## Troubleshooting

### Database Connection Issues
- Verify your DATABASE_URL is correct
- Ensure your database server is running
- Check firewall settings for cloud databases
- Verify SSL settings match your database provider

### Port Already in Use
Change the port in your `.env` file:
```env
PORT=3000
```

### Missing Dependencies
Delete node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
Ensure you have the correct Node.js version:
```bash
node --version  # Should be 18 or higher
```

## Deployment Options

### Cloud Platforms
- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Deploy the built static files
- **Railway**: Full-stack deployment with database
- **Render**: Deploy both frontend and backend
- **Heroku**: Traditional deployment platform

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
PORT=80
```

## API Documentation

### Framework Elements
- `GET /api/framework` - Get all framework elements
- `GET /api/framework/:id` - Get specific framework element

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get specific event
- `POST /api/events` - Create new event

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources?category=webinar` - Filter by category
- `POST /api/resources` - Create new resource

### Contact & Newsletter
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Newsletter signup

### Statistics
- `GET /api/statistics` - Get application statistics
- `POST /api/statistics` - Update statistics

## Support

If you encounter any issues during setup:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure your database is accessible and running
4. Check that all dependencies are installed properly

The application is built with modern web technologies:
- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Drizzle ORM
- **Database**: PostgreSQL
- **State Management**: TanStack Query