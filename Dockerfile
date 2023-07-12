FROM node:lts as runner

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN cd views/app && npm run build && cd ../..
RUN cd views/auth && npm run build && cd ../..

COPY . .

EXPOSE 3000
CMD npm run start
