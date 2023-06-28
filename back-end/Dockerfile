FROM node:18

WORKDIR /home/zulfikra

COPY . .
COPY package.json .

RUN npm install
RUN npm install -g nodemon
RUN npm install fastify

EXPOSE 4000
