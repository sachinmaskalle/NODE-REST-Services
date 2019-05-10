FROM node:latest

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 8080

ENTRYPOINT node server