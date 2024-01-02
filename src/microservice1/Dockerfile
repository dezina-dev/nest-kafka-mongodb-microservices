# Dockerfile for microservice1
FROM node:14

WORKDIR /usr/src/app/microservice1

COPY package*.json ./

RUN npm install

COPY src ./src

RUN npm run build

CMD ["npm", "run", "start:prod"]