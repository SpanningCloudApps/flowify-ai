FROM node:18.17.1-alpine as build
WORKDIR /app
ENV PATH ./node_modules/.bin:$PATH
COPY package.json tsconfig.json tsconfig.node.json package-lock.json ./
RUN npm install
COPY ./src ./src
RUN ["npm", "run", "build"]

FROM nginx:stable-alpine
COPY ./nginx /etc/nginx/templates
COPY --from=build ./app/dist /usr/share/nginx/html
RUN touch /var/run/nginx.pid \
    && chown -R nginx: /usr/share/nginx/html /etc/nginx/conf.d /var/cache/nginx /var/log/nginx /var/run/nginx.pid
EXPOSE 80
