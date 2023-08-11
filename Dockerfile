FROM node:latest

WORKDIR /app

COPY package* ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]