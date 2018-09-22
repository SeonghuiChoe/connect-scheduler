FROM node:alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

ENV APP_HOME /usr/share/nginx/html

WORKDIR $APP_HOME
RUN rm -rf $APP_HOME
COPY --from=builder /usr/src/app/dist $APP_HOME
