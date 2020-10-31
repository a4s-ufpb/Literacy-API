FROM node:10.21

COPY . ./literacy-api

WORKDIR /literacy-api

CMD ["npm", "cache", "clean", "--force"]

RUN npm install

EXPOSE 8083

RUN npm run build

CMD ["npm", "start"]