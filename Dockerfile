# Build the Astro static site
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the static site
RUN npm run build

# Output the dist directory
FROM scratch AS output
COPY --from=builder /app/dist /