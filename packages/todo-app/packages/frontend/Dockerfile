# syntax = docker/dockerfile:experimental
# ===== Builder =====
# ===================
FROM node:10-alpine AS builder

RUN apk --no-cache add \
  g++ make python git \
  && yarn global add node-gyp \
  && rm -rf /var/cache/apk/*

WORKDIR /builder/

# Cache client's package
ADD package.json    .
ADD yarn.lock       .
RUN yarn --pure-lockfile

# Build
ADD .env.production .
ADD . .
RUN yarn build --mode production

# ===== Image =====
# ==================

## Client Image
FROM nginx:alpine AS frontend
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /builder/dist/ /usr/share/nginx/html
