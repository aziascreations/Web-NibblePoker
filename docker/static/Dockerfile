FROM nginx:alpine

# Install fcgiwrap for FastCGI support
RUN apk add --no-cache fcgiwrap spawn-fcgi

# Create directory for FastCGI sockets
RUN mkdir -p /var/run/fcgiwrap

# Copy custom nginx configuration
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY default.conf /etc/nginx/conf.d/default.conf

# Copy your FastCGI application/script
#COPY cgi-bin/ /usr/lib/cgi-bin/

# Make CGI scripts executable
#RUN chmod +x /usr/lib/cgi-bin/*

# Expose port
EXPOSE 80

# Start both nginx and fcgiwrap
CMD spawn-fcgi -s /var/run/fcgiwrap/fcgiwrap.sock -P /var/run/fcgiwrap/fcgiwrap.pid /usr/bin/fcgiwrap && \
    nginx -g "daemon off;"
