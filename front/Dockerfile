FROM node:15 AS builder

WORKDIR /hh-gowork/

COPY . .

RUN yarn install \
    && yarn build

FROM nginx

WORKDIR /usr/share/nginx/html/

RUN rm -Rf ./*

COPY --from=builder /hh-gowork/build/ .

COPY nginx.conf /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]
