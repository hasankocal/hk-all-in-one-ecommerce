FROM node:20
WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY packages ./packages
COPY apps/mobile ./apps/mobile

# Mobile için tüm bağımlılıkları yüklüyoruz (DevDependencies dahil)
RUN npm install

WORKDIR /app/apps/mobile

EXPOSE 8081

# Expo tünel uygulamasını dev geliştirme modunda (QR kod için) çalıştırıyoruz
CMD ["npx", "expo", "start", "--tunnel"]
