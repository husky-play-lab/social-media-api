# Build Stage
FROM node:16.20-slim AS build

WORKDIR /usr/src/app
COPY . .

RUN rm -rf yarn.lock && \
    rm /usr/local/bin/yarnpkg && \
    rm /usr/local/bin/yarn && \
    npm install -g yarn && \
    yarn install && \
    yarn workspace @apps/sso-service install && \
    yarn build @apps/sso-service

# Final Stage
FROM node:18.17-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

ENV NODE_ENV=production
EXPOSE 7001

CMD ["yarn", "start", "@apps/sso-service"]
