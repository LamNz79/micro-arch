# Backend Improvement Plan

## General
- [x] **Logging**: Replace all instances of `console.log` and `console.error` with NestJS's built-in `Logger` service for better formatted and structured logging.
- [ ] **API Documentation**: Integrate `@nestjs/swagger` to automatically generate OpenAPI documentation for both services.
- [ ] **Health Checks**: Implement `@nestjs/terminus` for robust health checks (database connectivity, microservice availability) instead of simple static return values.
- [ ] **Configuration Validation**: Use `joi` or `zod` within `ConfigModule` to validate environment variables (e.g., `DATABASE_URL`, `PORT`, `INVENTORY_BASE_URL`) on application startup.

## Inventory Service
- [ ] **Validation Strategy**: Standardize input validation. Currently, there is a mix of `class-validator` (Global Pipe) and manual `zod` parsing in the controller. Recommend sticking to `class-validator` fully or switching to `nestjs-zod` pipes to avoid redundant checks.
- [ ] **Error Handling**: Refactor `ReserveService` to handle exceptions more gracefully. Avoid swallowing errors in the catch block without properly propagating the error type or alerting.
- [ ] **Testing**: Add unit tests for `ReserveService` and `ReserveController`.

## Orders Service
- [ ] **HTTP Client Logging**: Improve error logging in `InventoryClient` when requests fail.
- [ ] **Shared Types**: Consider extracting shared DTOs (like the reserve stock request/response) into a shared library or package to ensure contract type safety between `orders-service` and `inventory-service`.
