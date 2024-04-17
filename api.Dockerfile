FROM node:20
ARG GPR_TOKEN

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm i

COPY . .
EXPOSE 9092

