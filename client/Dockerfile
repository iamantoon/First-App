FROM node:latest AS build
WORKDIR /app/

COPY ./client/package*.json .
RUN npm ci
RUN npm i -g @angular/cli

COPY ./client/ .
RUN npm run build --configuration=production

FROM nginx:latest
COPY ./client/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 81