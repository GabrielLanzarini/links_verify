FROM node:18-alpine
WORKDIR /app
COPY . .
RUN "yarn" "install"
# CMD [ "yarn", "run", "dev"]
CMD [ "./start.sh" ]  # Executar o script
EXPOSE 5000