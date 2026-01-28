# Inventory Service

A NestJS microservice responsible for managing product inventory and stock reservations with PostgreSQL persistence using Prisma ORM.

## 🎯 Overview

The Inventory Service manages product stock levels and handles stock reservation requests from the Orders Service. It provides a REST API for inventory operations and uses Prisma for database interactions with PostgreSQL.

## 🛠️ Tech Stack

- **Framework**: NestJS 11.0.1
- **Language**: TypeScript 5.7.3
- **ORM**: Prisma 7.2.0 with PostgreSQL adapter
- **Database**: PostgreSQL 15+
- **Validation**: class-validator 0.14.3, Zod 4.3.5
- **API Documentation**: Swagger/OpenAPI (@nestjs/swagger 11.2.4)
- **Configuration**: @nestjs/config 4.0.2
- **Testing**: Jest 30.0.0

## 📁 Project Structure

```
inventory-service/
├── src/
│   ├── main.ts                 # Application entry point with validation
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   ├── controllers/            # REST API controllers
│   │   ├── inventory.controller.ts
│   │   └── reserve.controller.ts
│   ├── modules/                # Feature modules
│   │   ├── inventory.module.ts
│   │   └── reserve.module.ts
│   ├── services/               # Business logic
│   │   └── reserveService.ts
│   ├── dto/                    # Data Transfer Objects
│   │   └── reserve-stock.dto.ts
│   ├── validation/             # Validation schemas
│   │   └── reserve-stock.schema.ts
│   └── prisma/                 # Prisma client module
│       ├── prisma.module.ts
│       └── prisma.service.ts
├── prisma/                     # Database schema and migrations
│   ├── schema.prisma           # Prisma schema
│   ├── migrations/             # Database migrations
│   └── seed.ts                 # Database seeding script
├── Dockerfile                  # Docker configuration
├── docker-entrypoint.sh        # Docker startup script
├── .env                        # Environment variables
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- PostgreSQL 15 or higher
- npm or yarn

### Installation

```bash
# From the project root (recommended)
npm install

# Or from the inventory-service directory
cd backend-nestjs/inventory-service
npm install
```

### Database Setup

#### 1. Configure Database Connection

Create a `.env` file in the inventory-service directory:

```env
# Server Configuration
PORT=3002

# Database Configuration
DATABASE_URL=postgresql://inventory_user:inventory_pass@localhost:5432/inventory
```

#### 2. Run Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### Development

```bash
# Start in development mode with hot reload
npm run start:dev

# Start in debug mode
npm run start:debug
```

The service will be available at `http://localhost:3002`

### Production

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## 📡 API Endpoints

### Base URL
- Development: `http://localhost:3002`
- Via Kong Gateway: `http://localhost:8000/api/inventory`

### Endpoints

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

#### Create Inventory Item (Placeholder)
```http
POST /
```

**Response:**
```json
{
  "product": "inventory-item",
  "orderId": "uuid",
  "status": "PENDING"
}
```

#### Reserve Stock
```http
POST /reserve
Content-Type: application/json

{
  "productId": "string",
  "quantity": number
}
```

**Success Response (200):**
```json
{
  "reserved": true,
  "productId": "abc-123",
  "quantity": 5
}
```

**Failure Response (200):**
```json
{
  "reserved": false,
  "reason": "Insufficient stock"
}
```

**Validation Error (400):**
```json
{
  "statusCode": 400,
  "message": ["quantity must be a positive number"],
  "error": "Bad Request"
}
```

## 🗄️ Database Schema

### Product Model

```prisma
model Product {
  id    String @id @default(uuid())
  name  String
  stock Int
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Unique product identifier |
| `name` | String | Product name |
| `stock` | Int | Available stock quantity |

## 🏗️ Architecture

### Service Layers

```
┌─────────────────────────────────────┐
│         Controllers                 │
│  (HTTP Request Handling)            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│          Services                   │
│  (Business Logic)                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       Prisma Service                │
│  (Database Access)                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       PostgreSQL                    │
└─────────────────────────────────────┘
```

### Modules

#### InventoryModule
Handles basic inventory operations (placeholder for future expansion)

#### ReserveModule
Manages stock reservation logic:
- Validates reservation requests
- Checks stock availability
- Updates stock levels atomically

#### PrismaModule
Provides database client across the application:
- Connection management
- Query execution
- Transaction support

### Validation Strategy

The service uses a **dual validation approach**:

1. **Zod Schema Validation** - In controllers for request parsing
2. **class-validator** - Global validation pipe for DTOs

> **Note**: See [ISSUES.md](../ISSUES.md) for planned standardization

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3002` |
| `DATABASE_URL` | PostgreSQL connection string | Required |

### Prisma Configuration

The Prisma client is configured in `prisma.config.ts` with custom output settings.

### Swagger Documentation

Swagger UI is available at `http://localhost:3002/api` when the service is running.

Configuration in `main.ts`:
```typescript
const config = new DocumentBuilder()
  .setTitle('Inventory Service API')
  .setDescription('API for managing inventory and stock')
  .setVersion('1.0')
  .build();
```

## 📝 Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start with hot reload and debug on port 9230
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start production build
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint and fix code
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

### Prisma Scripts

```bash
# Generate Prisma client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Seed the database
npx prisma db seed
```

## 🐳 Docker

### Build Image

```bash
docker build -t inventory-service .
```

### Run Container

```bash
docker run -p 3002:3002 --env-file .env inventory-service
```

The Dockerfile includes:
- Multi-stage build for optimized image size
- Automatic Prisma client generation
- Database migration on startup (via `docker-entrypoint.sh`)

### Docker Compose

```bash
# From project root - starts service with PostgreSQL
docker-compose up backend-inventory inventory-db
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

### E2E Tests

```bash
npm run test:e2e
```

### Debug Tests

```bash
npm run test:debug
```

## 🔍 Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### Formatting

```bash
# Format all TypeScript files
npm run format
```

## 📊 Monitoring & Debugging

### Debug Mode

The service supports remote debugging on port `9230`:

```bash
npm run start:dev
```

Connect your debugger to `localhost:9230`

### Database Monitoring

Use Prisma Studio for visual database inspection:

```bash
npx prisma studio
```

Opens at `http://localhost:5555`

### Logging

The service uses `console.log` for logging. See [ISSUES.md](../ISSUES.md) for planned improvements to use NestJS Logger.

## 🔐 Data Validation

### Request DTOs

**ReserveStockRequestDto:**
```typescript
{
  productId: string;  // Required, non-empty
  quantity: number;   // Required, positive integer
}
```

**ReserveStockResponseDto:**
```typescript
{
  reserved: boolean;
  productId?: string;
  quantity?: number;
  reason?: string;    // Present when reserved = false
}
```

### Validation Rules

- `productId`: Must be a non-empty string
- `quantity`: Must be a positive number

## 🚧 Known Issues & Improvements

See [../ISSUES.md](../ISSUES.md) for planned improvements:

- Standardize validation strategy (class-validator vs Zod)
- Replace `console.log` with NestJS Logger
- Improve error handling in ReserveService
- Add comprehensive unit tests
- Implement health checks with @nestjs/terminus
- Add configuration validation with Joi/Zod

## 🔗 Related Services

- [Orders Service](../orders-service/README.md) - Order management service
- [Frontend](../../frontend/README.md) - User interface

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Zod Documentation](https://zod.dev/)

## 🤝 Contributing

When making changes:

1. Follow NestJS best practices
2. Update Prisma schema for database changes
3. Create migrations for schema changes
4. Add appropriate Swagger decorators for API documentation
5. Write unit tests for new features
6. Update this README if adding new endpoints or configuration
7. Ensure TypeScript strict mode compliance
