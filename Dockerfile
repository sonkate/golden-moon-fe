FROM nginx:alpine
COPY assets /usr/share/nginx/html/assets
COPY index.html /usr/share/nginx/html/index.html

# docker build -t mysite:1 .
# docker run -d -p 8080:80 mysite:1