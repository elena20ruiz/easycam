FROM node:11.3.0
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "server.js" ]