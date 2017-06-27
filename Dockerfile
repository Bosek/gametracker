FROM node:slim

RUN mkdir -p /home/gametracker
WORKDIR /home/gametracker

COPY . /home/gametracker

RUN yarn install --production
ENTRYPOINT ["npm","start"]
