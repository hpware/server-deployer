# Building process
FROM oven/bun:latest as builder
WORKDIR /app
# Copy dependency files
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
# Copy source files
COPY . .
# Framework-specific build command
RUN bun run build

# Production image
FROM oven/bun:latest
WORKDIR /app
# Copy built assets and dependencies
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/bun.lockb /app/bun.lockb
# If you have customized your output directory, please add your custom one here, or just remove it. :)

# Install production dependencies only
RUN bun install --production --frozen-lockfile

EXPOSE 3000
# Map the prod command to start via editing your package.json like in the example.package.json
CMD ["bun", "run", "start"]