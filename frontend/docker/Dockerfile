FROM node:latest

EXPOSE 3000

WORKDIR /frontend

COPY . /frontend

RUN export NODE_OPTIONS=--openssl-legacy-provider

RUN npm install