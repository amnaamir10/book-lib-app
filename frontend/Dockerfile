# Web tier: build the React app, then serve it with Nginx

# ---- Stage 1: build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# The browser calls /api on the same host; Nginx forwards it to the app tier
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---- Stage 2: serve ----
FROM nginx:1.27-alpine
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

# Defaults for local docker-compose; overridden on AWS
ENV API_UPSTREAM=app:3200 \
    DNS_RESOLVER=127.0.0.11

EXPOSE 80