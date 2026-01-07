# =========================
# Build stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./

# Install all deps
RUN npm ci

# Copy source code
COPY src ./src

# Build
RUN npm run build

# =========================
# Production stage
# =========================
FROM node:20-alpine

WORKDIR /app

# Copy package files and install prod deps only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application
COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main.js"]
