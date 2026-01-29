# Development Guide - HK All-in-One E-Commerce

Welcome to the HK All-in-One E-Commerce platform! This guide will help you get started with development.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This is a **monorepo** e-commerce platform for Olivefe, featuring:
- 🌐 **Web Application** (Next.js) - Customer-facing e-commerce site
- 📱 **Mobile Application** (React Native Expo) - iOS/Android app
- 🔧 **Backend API** (Express + TypeScript) - RESTful API with MySQL
- 📦 **Shared Types Package** - TypeScript types shared across all apps

---

## 🛠 Tech Stack

### Frontend (Web)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **UI Components**: Custom components with Material Symbols icons

### Frontend (Mobile)
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL
- **Authentication**: JWT

### Shared
- **Types**: TypeScript interfaces in `@olivefe/types`
- **Package Manager**: npm
- **Monorepo Tool**: Turborepo

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MySQL 8+
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hk-all-in-one-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in each app:
   
   **Backend** (`apps/backend/.env`):
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=olivefe_db
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```
   
   **Web** (`apps/web/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```
   
   **Mobile** (`apps/mobile/.env`):
   ```env
   API_URL=http://localhost:8000/api
   ```

4. **Set up the database**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE olivefe_db;
   
   # Run migrations (if available)
   cd apps/backend
   npm run migrate
   ```

5. **Build shared types**
   ```bash
   cd packages/types
   npm run build
   ```

### Running the Applications

Open **3 separate terminals**:

**Terminal 1 - Backend API:**
```bash
cd apps/backend
npx ts-node server.ts
# Runs on http://localhost:8000
```

**Terminal 2 - Web App:**
```bash
cd apps/web
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3 - Mobile App:**
```bash
cd apps/mobile
npx expo start
# Runs on http://localhost:8081
# Scan QR code with Expo Go app
```

---

## 📁 Project Structure

```
hk-all-in-one-ecommerce/
├── apps/
│   ├── backend/              # Express API Server
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Sequelize models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, validation
│   │   └── server.ts         # Entry point
│   │
│   ├── web/                  # Next.js Web App
│   │   ├── app/              # App Router pages
│   │   ├── components/       # React components
│   │   ├── context/          # React contexts
│   │   ├── lib/              # Utilities, API client
│   │   └── public/           # Static assets
│   │
│   └── mobile/               # React Native Expo
│       ├── app/              # Expo Router screens
│       ├── components/       # React Native components
│       ├── services/         # API client
│       └── assets/           # Images, fonts
│
├── packages/
│   └── types/                # Shared TypeScript types
│       └── src/index.ts      # Type definitions
│
├── .cursorrules              # AI coding guidelines
├── DEVELOPMENT.md            # This file
└── package.json              # Root package.json
```

---

## 💻 Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards (see below)
   - Test on both web and mobile if applicable
   - Update types in `packages/types` if needed

3. **Test your changes**
   - Run the app locally
   - Check for TypeScript errors
   - Test API endpoints

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

### Adding New Features

#### Backend API Endpoint
1. Create controller in `apps/backend/controllers/`
2. Define route in `apps/backend/routes/`
3. Add types to `packages/types/src/index.ts`
4. Import route in `server.ts`

#### Web Page
1. Create page in `apps/web/app/[route]/page.js`
2. Create components in `apps/web/components/`
3. Add API calls in `apps/web/lib/api.js`

#### Mobile Screen
1. Create screen in `apps/mobile/app/[route].tsx`
2. Add API calls in `apps/mobile/services/api.ts`

---

## 📝 Coding Standards

### General Rules
- ✅ Use **TypeScript** for all new code
- ✅ Use **kebab-case** for file and folder names
- ✅ Use **ES Modules** (`import`/`export`)
- ✅ Prefer `const` over `let`, never use `var`
- ✅ Use `async/await` instead of `.then()`

### React/Next.js
- Add `"use client"` for client components
- Use functional components with hooks
- Prefer named exports
- Use Tailwind CSS for styling
- Handle loading and error states

### TypeScript
- Enable strict mode
- Define interfaces for all data structures
- Import types: `import type { Product } from '@olivefe/types'`
- Avoid `any`, use `unknown` if needed

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `product-card.tsx` |
| Components | PascalCase | `ProductCard` |
| Functions | camelCase | `getProducts` |
| Constants | UPPER_SNAKE_CASE | `API_URL` |
| Interfaces | PascalCase | `Product` or `IProduct` |

### React Gotchas
```jsx
// ❌ BAD - Renders "0" when count is 0
{count && <Component />}

// ✅ GOOD - Renders nothing when count is 0
{count > 0 && <Component />}
```

---

## 🔧 Common Tasks

### Adding a New API Endpoint

1. **Define types** (`packages/types/src/index.ts`):
   ```typescript
   export interface NewFeature {
     id: number;
     name: string;
   }
   ```

2. **Create model** (`apps/backend/models/NewFeature.ts`):
   ```typescript
   import { DataTypes, Model } from 'sequelize';
   import sequelize from '../config/database';
   
   class NewFeature extends Model {}
   NewFeature.init({ /* ... */ }, { sequelize });
   export default NewFeature;
   ```

3. **Create controller** (`apps/backend/controllers/newFeatureController.ts`):
   ```typescript
   import type { Request, Response } from 'express';
   import NewFeature from '../models/NewFeature';
   
   export const getFeatures = async (req: Request, res: Response) => {
     const features = await NewFeature.findAll();
     res.json(features);
   };
   ```

4. **Create routes** (`apps/backend/routes/newFeatureRoutes.ts`):
   ```typescript
   import express from 'express';
   import * as controller from '../controllers/newFeatureController';
   
   const router = express.Router();
   router.get('/', controller.getFeatures);
   export default router;
   ```

5. **Register in server** (`apps/backend/server.ts`):
   ```typescript
   import newFeatureRoutes from './routes/newFeatureRoutes';
   app.use('/api/features', newFeatureRoutes);
   ```

### Adding a New Web Page

1. **Create page** (`apps/web/app/new-page/page.js`):
   ```jsx
   "use client";
   import Header from '@/components/Header';
   import Footer from '@/components/Footer';
   
   export default function NewPage() {
     return (
       <div>
         <Header />
         <main>Content here</main>
         <Footer />
       </div>
     );
   }
   ```

2. **Add navigation link** (in `Header.jsx` or relevant component)

### Updating Shared Types

1. **Edit types** (`packages/types/src/index.ts`)
2. **Rebuild package**:
   ```bash
   cd packages/types
   npm run build
   ```
3. **Restart apps** to pick up new types

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Database Connection Error
- Check MySQL is running: `mysql.server status`
- Verify credentials in `apps/backend/.env`
- Ensure database exists: `CREATE DATABASE olivefe_db;`

### TypeScript Errors
- Rebuild types: `cd packages/types && npm run build`
- Clear cache: `rm -rf node_modules/.cache`
- Restart TypeScript server in VS Code

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Expo/Mobile Issues
```bash
# Clear Expo cache
cd apps/mobile
npx expo start -c
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Expo](https://docs.expo.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize Docs](https://sequelize.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

1. Follow the coding standards
2. Write descriptive commit messages
3. Test your changes thoroughly
4. Update documentation if needed

---

**Happy Coding! 🚀**
