FROM node:8

RUN mkdir -p /usr/local/app
COPY . /usr/local/app/
WORKDIR /usr/local/app

RUN npm i
RUN npm run build

ENV DB_HOST mongo

CMD ["npm", "run", "start"]

EXPOSE 8080