ARG NODEJS_VERSION=18
FROM stage-registry.infra.devmail.ru/external/nodejs:${NODEJS_VERSION}

WORKDIR /home/node/app

ENV TARGET_ENV="development"
COPY package*.json ./

ARG GITLAB_REGISTRY_TOKEN
RUN { echo '@vk-tech:registry=https://gitlab.corp.mail.ru/api/v4/projects/23670/packages/npm/' \
    ; echo '//gitlab.corp.mail.ru/api/v4/projects/23670/packages/npm/:_authToken=${GITLAB_REGISTRY_TOKEN}' \
    ; echo 'registry=https://nexus.infra.devmail.ru/repository/npm-group/' \
    ; } > .npmrc

ARG SENTRYCLI_CDNURL=https://downloads.sentry-cdn.com/sentry-cli
RUN npm ci \
    && npm cache clean --force

COPY .git/ .git/
COPY config/ config/
COPY configs/sentry* ./
COPY docs.config.js ./
COPY configs/.data/ .data/
COPY docs/ docs/
COPY public/ public/
COPY externals/ externals/
COPY guides/ guides/

ARG SENTRY_AUTH_TOKEN=""
ENV SENTRY_RELEASE=$IMAGE_TAG

RUN npm run bootstrap \
    && npm cache clean --force

VOLUME /docs

EXPOSE 3000

CMD ["npm", "run", "dev"]
