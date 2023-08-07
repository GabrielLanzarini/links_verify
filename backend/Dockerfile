FROM node:18-alpine
WORKDIR /app
COPY . .
RUN "yarn run migration"
CMD [ "yarn", "run", "dev"]
EXPOSE 5000

