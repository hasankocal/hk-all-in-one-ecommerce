FROM node:18-alpine

WORKDIR /app

# Copy root configurations and lockfiles
COPY package.json package-lock.json ./
COPY turbo.json ./

# Copy packages and apps to retain workspace structure
COPY packages ./packages
COPY apps/backend ./apps/backend

# Install dependencies
RUN npm install

WORKDIR /app/apps/backend

# Compile TypeScript to JavaScript
RUN npx tsc

EXPOSE 8000

# Run the compiled JavaScript code
CMD ["node", "dist/server.js"]
