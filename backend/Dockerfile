From node:latest  
RUN mkdir /app
WORKDIR /app

COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 8090
CMD [ "node", "server.js" ]