FROM nginx:alpine

COPY css /usr/share/nginx/html/css
COPY img /usr/share/nginx/html/img
COPY js /usr/share/nginx/html/js
COPY vec /usr/share/nginx/html/vec
COPY index.html /usr/share/nginx/html/
