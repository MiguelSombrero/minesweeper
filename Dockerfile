FROM node:alpine

WORKDIR /app
COPY . /app

RUN npm install

USER node

CMD npm start