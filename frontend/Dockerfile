FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn init -y

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000