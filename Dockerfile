FROM node:20-alpine3.20 as build-stage

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN npm run build

# production stage
FROM node:20-alpine3.20 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "/app/main.js"]
