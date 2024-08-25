FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

COPY . .

ENV PORT=4000

EXPOSE 4000

