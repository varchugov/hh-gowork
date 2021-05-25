FROM node:alpine AS builder

WORKDIR /hh-gowork

COPY .yarnrc.yml package.json yarn.lock ./
COPY .yarn .yarn

RUN yarn

COPY . .

RUN yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -Rf ./*

COPY --from=builder /hh-gowork/build ./

COPY nginx.conf /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]
