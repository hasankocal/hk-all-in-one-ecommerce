FROM node:18-alpine

WORKDIR /app

# Copy root configurations and lockfiles
COPY package.json package-lock.json ./
COPY turbo.json ./

# Copy packages and apps to retain workspace structure
COPY packages ./packages
COPY apps/backend ./apps/backend

# Install dependencies (workspaces will be linked automatically)
RUN npm install

WORKDIR /app/apps/backend

EXPOSE 8000

# Run in dev mode as specified originally
CMD ["npm", "run", "dev"]
