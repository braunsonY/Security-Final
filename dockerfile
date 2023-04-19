FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add python3

COPY . .

EXPOSE 3000

CMD ["python3","flaskServer.py"]