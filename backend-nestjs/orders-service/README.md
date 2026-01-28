# Orders Service

A NestJS microservice responsible for handling order creation and management in the microservices architecture.

## 🎯 Overview

The Orders Service acts as the orchestrator for order processing, communicating with the Inventory Service to reserve stock before confirming orders. It exposes a REST API for order operations and includes Swagger documentation.

## 🛠️ Tech Stack

- **Framework**: NestJS 11.0.1
- **Language**: TypeScript 5.7.3
- **HTTP Client**: @nestjs/axios 4.0.1
- **API Documentation**: Swagger/OpenAPI (@nestjs/swagger 11.2.4)
- **Configuration**: @nestjs/config 4.0.2
- **Testing**: Jest 30.0.0

## 📁 Project Structure

```
orders-service/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   ├── controllers/            # REST API controllers
│   │   └── orders.controller.ts
│   ├── modules/                # Feature modules
│   │   └── order.module.ts
│   └── clients/                # HTTP clients for inter-service communication
│       └── inventory.client.ts
├── test/                       # E2E tests
├── Dockerfile                  # Docker configuration
├── .env                        # Environment variables
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Inventory Service running (for full functionality)

### Installation

```bash
# From the project root (recommended)
npm install

# Or from the orders-service directory
cd backend-nestjs/orders-service
npm install
```

### Configuration

Create a `.env` file in the orders-service directory:

```env
# Server Configuration
PORT=3001

# Inventory Service URL
INVENTORY_BASE_URL=http://localhost:3002
```

For Docker deployment, use `.env.docker`:

```env
PORT=3001
INVENTORY_BASE_URL=http://backend-inventory:3002
```

### Development

```bash
# Start in development mode with hot reload
npm run start:dev

# Start in debug mode
npm run start:debug
```

The service will be available at `http://localhost:3001`

### Production

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## 📡 API Endpoints

### Base URL
- Development: `http://localhost:3001`
- Via Kong Gateway: `http://localhost:8000/api/orders`

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

#### Create Order
```http
POST /
Content-Type: application/json

{
  "productId": "string",
  "quantity": number
}
```

**Success Response (200):**
```json
{
  "status": "CONFIRMED"
}
```

**Rejection Response (200):**
```json
{
  "status": "REJECTED",
  "reason": "Insufficient stock" | "Product not found"
}
```

## 🏗️ Architecture

### Service Communication

The Orders Service communicates with the Inventory Service using HTTP:

```
┌─────────────────┐
│ Orders Service  │
│                 │
│  POST /         │
└────────┬────────┘
         │
         │ HTTP POST /reserve
         ▼
┌─────────────────┐
│ Inventory Svc   │
│                 │
│  Reserve Stock  │
└─────────────────┘
```

### Order Flow

1. Client sends order request to Orders Service
2. Orders Service calls Inventory Service to reserve stock
3. If stock is available:
   - Inventory Service reserves the stock
   - Orders Service returns `CONFIRMED` status
4. If stock is unavailable:
   - Inventory Service returns rejection reason
   - Orders Service returns `REJECTED` status with reason

### Modules

#### OrdersModule
Located in `src/modules/order.module.ts`, this module encapsulates:
- Orders controller
- Inventory client for inter-service communication

#### InventoryClient
Located in `src/clients/inventory.client.ts`, handles:
- HTTP communication with Inventory Service
- Stock reservation requests
- Error handling for service communication

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `INVENTORY_BASE_URL` | Inventory Service base URL | `http://localhost:3002` |

### Swagger Documentation

Swagger UI is available at `http://localhost:3001/api` when the service is running.

Configuration in `main.ts`:
```typescript
const config = new DocumentBuilder()
  .setTitle('Orders Service API')
  .setDescription('API for managing orders')
  .setVersion('1.0')
  .build();
```

## 📝 Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start with hot reload and debug on port 9229
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start production build
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint and fix code
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

## 🐳 Docker

### Build Image

```bash
docker build -t orders-service .
```

### Run Container

```bash
docker run -p 3001:3001 --env-file .env.docker orders-service
```

### Docker Compose

```bash
# From project root
docker-compose up backend-orders
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

The service supports remote debugging on port `9229`:

```bash
npm run start:dev
```

Connect your debugger to `localhost:9229`

### Logging

The service uses `console.log` for logging. See [ISSUES.md](../ISSUES.md) for planned improvements to use NestJS Logger.

## 🚧 Known Issues & Improvements

See [../ISSUES.md](../ISSUES.md) for planned improvements:

- Replace `console.log` with NestJS Logger
- Improve error handling in InventoryClient
- Add shared types/DTOs between services
- Implement comprehensive testing
- Add health checks with @nestjs/terminus

## 🔗 Related Services

- [Inventory Service](../inventory-service/README.md) - Stock management service
- [Frontend](../../frontend/README.md) - User interface

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)
- [Swagger/OpenAPI](https://swagger.io/specification/)

## 🤝 Contributing

When making changes:

1. Follow NestJS best practices
2. Add appropriate Swagger decorators for API documentation
3. Write unit tests for new features
4. Update this README if adding new endpoints or configuration
5. Ensure TypeScript strict mode compliance
