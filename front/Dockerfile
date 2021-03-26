FROM node:12 AS builder
WORKDIR /gowork
COPY . .
RUN yarn install && yarn build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /gowork/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]