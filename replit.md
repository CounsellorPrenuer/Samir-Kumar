# Careerskope - Career Guidance Platform

## Overview

Careerskope is a modern career guidance platform that provides professional career services for students, graduates, and working professionals. The platform offers psychometric assessments, career coaching, admission guidance, and corporate services. Built as a full-stack web application with a focus on user experience and responsive design, it features service packages, contact forms, testimonials, and comprehensive information about career development services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Design System**: Custom color scheme using blue, red, and green branding with gradient backgrounds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints with structured error handling
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Express sessions with PostgreSQL session store configuration
- **Request Handling**: JSON body parsing with URL-encoded form support

### Data Storage Solutions
- **Development Storage**: In-memory storage using Map data structures
- **Database Configuration**: Drizzle ORM configured for PostgreSQL with Neon serverless
- **Schema Management**: Shared schema definitions using Drizzle with Zod validation
- **Migration System**: Drizzle Kit for database migrations and schema changes

### Authentication and Authorization
- **Session Storage**: Configured for PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Basic user schema with username/password authentication
- **Security**: Express session configuration with secure cookie settings

### External Dependencies
- **Database**: Neon serverless PostgreSQL for production data storage
- **Email Service**: Prepared for integration with email service providers for contact form notifications
- **Asset Management**: Local asset storage with Vite static file serving
- **Fonts**: Google Fonts integration (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icons**: Lucide React for consistent iconography
- **Analytics**: Ready for integration with analytics services
- **Deployment**: Configured for Replit deployment with development tooling