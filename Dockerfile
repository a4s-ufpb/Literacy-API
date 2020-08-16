FROM node:10.21

WORKDIR /usr/app

COPY . .

CMD ["npm", "cache", "clean", "--force"]

RUN npm install

EXPOSE 9000

RUN npm run build

CMD ["npm", "start"]