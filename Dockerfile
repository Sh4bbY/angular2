FROM nginx:1.13-alpine

RUN mkdir -p /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

EXPOSE 8080
