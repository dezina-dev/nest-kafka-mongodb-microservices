# Dockerfile for kafka
FROM node:14

WORKDIR /usr/src/app/kafka

COPY package*.json ./

RUN npm install

COPY src ./src

RUN npm run build

CMD ["npm", "run", "start:prod"]