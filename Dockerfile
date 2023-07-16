FROM node:18

WORKDIR /home/front-end

COPY package.json .

COPY . .

RUN npm install

EXPOSE 3000