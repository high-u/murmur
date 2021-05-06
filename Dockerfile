FROM nginx:stable-alpine

# COPY ./index.html /usr/share/nginx/html/
COPY ./index.html /var/www/html/

RUN printf '%s\n' \
  'server {' \
  '  listen 80;' \
  '  server_name localhost;' \
  '  location / {' \
  '    index index.html;' \
  '    root /var/www/html;' \
  '  }' \
  '}' \
  > /etc/nginx/conf.d/alpinejs.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# docker run --rm --name nginx -v $PWD:/usr/share/nginx/html:ro -p 3001:80 -d nginx
