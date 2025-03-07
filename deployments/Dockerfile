FROM oven/bun:1.2 AS base

FROM base AS dependencies

WORKDIR /app

# Install dependencies
COPY package.json .
COPY bun.lockb .
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV="production"
ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp
# Next.js collects completely anonymous telemetry data about general usage.
# Disable telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

FROM base AS release
WORKDIR /app

ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ADD deployments/entrypoint.sh /app/

RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENV PORT=3000

CMD ["/app/entrypoint.sh"]