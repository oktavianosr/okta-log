FROM node:24-bookworm-slim AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable && corepack prepare pnpm@11.19.0 --activate
WORKDIR /app

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS development

COPY . .

EXPOSE 5173
CMD ["pnpm", "dev"]

FROM dependencies AS build

COPY . .

ARG VITE_CMS_URL=http://localhost:1337
ARG VITE_DEMO_MODE=false
ENV VITE_CMS_URL=$VITE_CMS_URL
ENV VITE_DEMO_MODE=$VITE_DEMO_MODE

RUN pnpm build

FROM nginx:1.29-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
