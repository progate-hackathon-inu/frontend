FROM node:latest

WORKDIR /app

# libc6-compatをインストール
RUN apk add --no-cache libc6-compat

COPY package*.json ./
COPY package-lock.json ./

COPY . .

ENV PORT=4000
ENV STORYBOOK_PORT=6006

EXPOSE 4000 6006