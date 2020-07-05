FROM node:12.18-alpine

RUN apk add --no-cache bash

WORKDIR /home/app

COPY package*.json ./

COPY wait-for-it.sh ./wait-for-it.sh

RUN chmod +x ./wait-for-it.sh

RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD [ "node", "src/index.js" ]
