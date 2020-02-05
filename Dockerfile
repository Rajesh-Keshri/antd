# Stage 0, "build-stage", based on Node.js
FROM node:8 as build-stage

# set working directory
WORKDIR /app

# install and build app
COPY ./package.json /app/

RUN npm install

COPY ./ /app/

# RUN npm run build
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled rapidpigeon app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

# Copy the  nginx.conf
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

CMD /bin/bash -c "envsubst '\${API_URL} \${NGINX_PORT}'  < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf"