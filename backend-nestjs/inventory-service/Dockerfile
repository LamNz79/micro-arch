# =========================
# Build stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./

# Install all deps
RUN npm ci

# Copy Prisma files
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY src ./src

# Copy entrypoint script
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh && \
    sed -i 's/\r$//' docker-entrypoint.sh  # Remove CRLF line endings
# Build NestJS
RUN npm run build

# =========================
# Production stage
# =========================
FROM node:20-alpine

WORKDIR /app

# Install production deps only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy Prisma files (needed at runtime)
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

# Generate Prisma client again for prod image
RUN npx prisma generate

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh

EXPOSE 3002

ENTRYPOINT ["./docker-entrypoint.sh"]
