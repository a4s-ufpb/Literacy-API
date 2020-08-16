FROM node:10.21

WORKDIR /usr/app

COPY package.json ./
CMD ["npm", "cache", "clean", "--force"]
RUN npm install
COPY . .

EXPOSE 9000

CMD ["npm", "run", "build"]
CMD ["npm", "start"]


