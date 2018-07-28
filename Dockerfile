FROM nginx:alpine

MAINTAINER Marijn Giesen <marijn@studio-donder.nl>

COPY dist /usr/share/nginx/html
