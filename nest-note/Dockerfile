FROM node:20-alpine3.16 AS build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g cnpm
RUN cnpm install

COPY . .

RUN npm run build

# production stage
FROM node:20-alpine3.16 AS production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g cnpm
RUN cnpm install

EXPOSE 3000

CMD ["node", "/app/main.js"]
