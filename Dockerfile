FROM node:20-alpine as developement

WORKDIR /app

COPY package*.json .

RUN npm install

COPY .  .


RUN npm run build



FROM node:20-alpine as production

ARG NODE_ENV="production"

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY --from=developement ./app/dist ./dist

CMD [ "npm" ,"start" ]