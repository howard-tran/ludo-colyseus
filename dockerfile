FROM node:14-alpine

RUN mkdir /home/app

COPY arena.env /home/app/
COPY development.env /home/app/
COPY package-lock.json /home/app/
COPY package.json /home/app/
COPY tsconfig.json /home/app/

WORKDIR /home/app
RUN npm i

CMD ["npm", "run", "start"]