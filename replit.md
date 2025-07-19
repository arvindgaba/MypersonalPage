# Replit.md

## Overview

This is a full-stack web application built as a personal portfolio and professional profile for Arvind Gaba, a technology leader with 20+ years of experience. The application showcases achievements, expertise, career timeline, awards, and provides contact functionality. It features a modern, AI-themed design with dark mode styling and interactive components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React-based SPA with TypeScript, using Vite as the build tool
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom AI/tech theme colors and animations
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Native fetch API wrapped in a custom query client

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL session store
- **API Structure**: RESTful endpoints for profile content and contact submissions
- **Error Handling**: Global error middleware with structured error responses

### Database Schema
- **users**: Basic user authentication (id, username, password)
- **profile_content**: Dynamic content sections stored as JSONB (id, section, content, updated_at)
- **contact_submissions**: Contact form submissions (id, name, email, subject, message, submitted_at)

### Data Storage Strategy
- **Development**: In-memory storage implementation for rapid development
- **Production**: PostgreSQL with Drizzle ORM migrations
- **Content Management**: JSONB fields for flexible content structure
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle HTTP requests with validation
3. **Storage Layer**: Storage interface abstracts database operations
4. **Response Format**: JSON responses with consistent error handling
5. **Real-time Updates**: Query invalidation for immediate UI updates after mutations

### Content Management Flow
- Profile content is organized by sections (personal, hero, achievements, etc.)
- Each section can be independently updated via PUT requests
- Admin panel allows real-time content editing with immediate preview
- Content validation using Zod schemas before database persistence

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI component suite for accessibility
- **Icons**: Font Awesome icons for visual elements
- **Animations**: CSS-based animations with Tailwind utilities
- **Date Handling**: date-fns for date manipulation
- **Form Management**: React Hook Form ecosystem

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: Drizzle ORM with schema validation
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type checking and validation

### Build Dependencies
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production server builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

## Deployment Strategy

### Development Environment
- **Server**: TSX for TypeScript execution with hot reload
- **Client**: Vite dev server with HMR and React Fast Refresh
- **Database**: Environment-based DATABASE_URL configuration
- **Asset Handling**: Vite asset pipeline with alias resolution

### Production Build Process
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Assets**: Static assets served from production build directory
4. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **NODE_ENV**: Controls development vs production behavior
- **DATABASE_URL**: PostgreSQL connection string (required)
- **Port Configuration**: Express server with configurable port
- **Static Serving**: Production mode serves built React app from Express

### Scalability Considerations
- **Database Connection**: Serverless-compatible PostgreSQL driver
- **Session Storage**: PostgreSQL-backed sessions for multi-instance deployment
- **Asset Optimization**: Vite build optimization with code splitting
- **API Caching**: TanStack Query provides client-side caching layer