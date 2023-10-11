FROM node:19.0.0-alpine3.16

WORKDIR /var/www

# Copy existing app directory
COPY ./../../../package*.json ./

ENTRYPOINT ["npm"]
CMD ["install", "--production"]
