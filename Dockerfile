# Stage 1: build
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies
COPY server/package*.json ./
RUN npm ci

# Copy source code
COPY server/tsconfig.json ./
COPY server/prisma ./prisma
COPY server/src ./src

# Build TypeScript
RUN npm run build

# Stage 2: production
FROM node:24-alpine

WORKDIR /app

# Install dependencies
COPY server/package*.json ./
RUN npm ci

# Copy source + prisma
COPY server/src ./src
COPY server/prisma ./prisma
COPY server/tsconfig.json ./
COPY server/prisma.config.ts ./

# Environment
ENV NODE_ENV=production

RUN npx prisma generate

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx src/server.ts"]