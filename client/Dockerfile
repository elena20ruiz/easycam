FROM node:11.3.0 as build-stage

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm i npm@6.9.0 -g

COPY . /usr/src/app
RUN npm run build

FROM nginx:1.15.8
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]