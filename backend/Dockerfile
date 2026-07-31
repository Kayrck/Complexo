FROM node:20-alpine
WORKDIR /app

# prisma precisa de openssl no alpine
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4000
CMD ["npm", "start"]
