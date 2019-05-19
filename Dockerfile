FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./config.json ./config.json

USER node

RUN npm install

EXPOSE 5000

CMD [ "node", "server.js" ]