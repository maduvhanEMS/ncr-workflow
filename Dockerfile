FROM node:15.8.0-alpine as development

ENV NODE_ENV development

WORKDIR /app

COPY package.json  .

RUN npm install

RUN npm i react-scripts

COPY . .

EXPOSE 3000

CMD ["npm", "start"]



