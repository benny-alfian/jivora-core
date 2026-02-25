# Jivora Core

## Overview
A multi-tenant backend REST API built with TypeScript, Express.js, Prisma ORM, and PostgreSQL. Designed as a SaaS foundation for business management with user authentication, multi-tenant resource isolation, product management, and transaction tracking.

## Project Architecture
- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Framework**: Express.js 4
- **ORM**: Prisma v5
- **Database**: PostgreSQL (Replit managed via `DATABASE_URL`)
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Entry point**: `src/server.ts`
- **Port**: 3000 (console workflow)

## Source Structure
```
src/
  app.ts              - Express app setup and middleware
  server.ts           - HTTP server entry point
  controllers/        - Request/response handlers
  services/           - Business logic and DB interactions
  routes/             - API route definitions
  middlewares/        - Auth/authorization middlewares
  lib/
    prisma.ts         - Prisma Client singleton
prisma/
  schema.prisma       - Data models
  migrations/         - SQL migration history
  seed.js             - Database seeder
```

## Key Data Models
- **PlatformUser** - Global platform users (Founders, Admins)
- **Tenant** - Business entities (multi-tenant isolation)
- **User** - Tenant-scoped users with roles (OWNER, MANAGER, STAFF, CASHIER)
- **Product** - Items owned by a tenant
- **Transaction** - Sales records per tenant
- **AuditLog** - Action tracking

## API Endpoints
- `GET /` - Health check
- `POST /api/auth/register` - Register a new Tenant + Owner
- `POST /api/auth/login` - Login and receive JWT

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (Replit managed)
- `JWT_SECRET` - Secret for signing JWTs
- `PORT` - Server port (default: 3000)

## Development
```bash
npm run dev       # Start with ts-node-dev (hot reload)
npm run build     # Compile TypeScript
npm start         # Run compiled JS + migrate deploy
```

## Database
Run migrations with the local prisma binary:
```bash
./node_modules/.bin/prisma migrate deploy
./node_modules/.bin/prisma generate
```

## Recent Changes
- 2026-02-25: Initial setup — database provisioned, migrations applied, workflow configured
