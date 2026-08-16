# syntax=docker/dockerfile:1

# Build the Astro static site.  The tag is intentionally pinned so release
# builds do not silently change when the moving node:22-alpine tag advances.
FROM node:22.23.2-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the static site.  Static files must be readable by the unprivileged
# Nginx worker after they are exported to the host.
#
# CACHE_BUST forces this layer to rebuild (and re-fetch the latest GitHub
# release) on every deploy.  The deploy script passes the current timestamp,
# so version numbers on the download page never go stale from BuildKit cache.
ARG CACHE_BUST
RUN npm run build && chmod -R a+rX /app/dist

# This is an export-only stage, consumed by Docker BuildKit's --output flag.
# GoNavi is served by the host Nginx rather than a long-running web container.
FROM scratch AS output
COPY --from=builder /app/dist/ /
