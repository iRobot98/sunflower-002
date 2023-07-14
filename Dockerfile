FROM node:lts as runner

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps


COPY . .

RUN npm run set_up

EXPOSE 3000
CMD npm run start
