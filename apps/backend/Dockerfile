FROM node:18-alpine

WORKDIR /app

# Copy package configurations
COPY package.json package-lock.json turbo.json ./

# Copy the entire monorepo source (this is necessary for local workspace packages like @olivefe/types)
COPY . .

# Install all dependencies (workspaces are linked automatically)
RUN npm install

WORKDIR /app/apps/backend

# Compile TypeScript
RUN npx tsc || true
RUN ls -la dist || true

EXPOSE 8000

# Run the compiled js
CMD ["node", "dist/server.js"]
