# Dockerfile for microservice2
FROM node:14

WORKDIR /usr/src/app/microservice2

COPY package*.json ./

RUN npm install

COPY src ./src

RUN npm run build

CMD ["npm", "run", "start:prod"]