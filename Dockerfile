FROM node:lts as runner

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps


COPY . .

RUN npm run rebuild

EXPOSE 5050
CMD npm run start
