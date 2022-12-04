FROM node:latest

RUN mkdir /app
WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]