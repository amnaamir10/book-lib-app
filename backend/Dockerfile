# Application tier: Node.js + Express API
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Install production dependencies only (no jest/supertest in the image)
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Run as the non-root "node" user (least privilege)
USER node

EXPOSE 3200
CMD ["node", "server.js"]