FROM node:24-bookworm-slim AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable && corepack prepare pnpm@11.19.0 --activate
WORKDIR /app

FROM base AS dependencies

RUN apt-get update \
    && apt-get install -y --no-install-recommends g++ make python3 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS development

COPY . .

EXPOSE 1337
CMD ["pnpm", "develop"]

FROM dependencies AS build

COPY . .

ENV NODE_ENV=production
RUN pnpm build && pnpm prune --prod

FROM base AS production

ENV NODE_ENV=production

COPY --from=build --chown=node:node /app /app
RUN mkdir -p .tmp public/uploads && chown -R node:node .tmp public/uploads

USER node
EXPOSE 1337
CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]
