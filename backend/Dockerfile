FROM node:14-alpine
RUN apk add vim
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD yarn install &&\ 
	yarn knex migrate:latest &&\
	yarn knex seed:run &&\
	yarn dev\
