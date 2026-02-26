FROM node:18-alpine

WORKDIR /app

# Copy package configurations
COPY package.json package-lock.json turbo.json ./

# Copy the entire monorepo source (this is necessary for local workspace packages like @olivefe/types)
COPY . .

# Install all dependencies (workspaces are linked automatically)
RUN npm install

WORKDIR /app/apps/backend

EXPOSE 8000

# Run using tsx from the backend directory
CMD ["npx", "tsx", "server.ts"]
