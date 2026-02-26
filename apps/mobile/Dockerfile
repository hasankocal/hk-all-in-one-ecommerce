FROM node:20 AS builder
WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY packages ./packages
COPY apps/mobile ./apps/mobile

# Mobile için bağımlılıkları yüklüyoruz
RUN npm install

# Turborepo ile sadece mobile projesini derliyoruz
RUN npx turbo run build --filter=mobile

# Sadece statik dosyaları yayınlayacağımız hafif Nginx imajı
FROM nginx:alpine AS runner

# Expo export outputunu (dist dizinini) nginx html klasörüne kopyalıyoruz
COPY --from=builder /app/apps/mobile/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
