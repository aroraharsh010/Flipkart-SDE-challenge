FROM node:14

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7788
CMD [ "node", "server.js" ]
