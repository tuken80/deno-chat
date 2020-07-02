FROM hayd/alpine-deno:latest

EXPOSE 8080

WORKDIR /usr/app

COPY server.ts server.ts
COPY chat.ts chat.ts
COPY .env .env

CMD [ "run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "index.ts" ]
