FROM node:15 AS builder

WORKDIR /hh-gowork

COPY . .

RUN yarn install \
 && yarn build

FROM nginx

WORKDIR /usr/share/nginx/html

COPY --from=builder /hh-gowork/build .

CMD ["nginx", "-g", "daemon off;"]
