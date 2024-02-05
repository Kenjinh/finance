FROM node:18-slim

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000