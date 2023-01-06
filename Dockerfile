ARG node_base_image=16.14.2-alpine
FROM node:${node_base_image} AS builder
WORKDIR /app
COPY package*.json tsconfig*.json nest-cli.json ./
RUN npm ci --also=dev
COPY src src
