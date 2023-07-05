ARG NODEJS_VERSION=18
FROM stage-registry.infra.devmail.ru/external/nodejs:${NODEJS_VERSION}

WORKDIR /home/node/app

ENV TARGET_ENV="development"
COPY package*.json ./

ARG GITLAB_REGISTRY_TOKEN
RUN { echo '@vk-cloud-solutions:registry=https://gitlab.corp.mail.ru/api/v4/projects/23670/packages/npm/' \
    ; echo '//gitlab.corp.mail.ru/api/v4/projects/23670/packages/npm/:_authToken=${GITLAB_REGISTRY_TOKEN}' \
    ; echo 'registry=https://nexus.infra.devmail.ru/repository/npm-group/' \
    ; } > .npmrc

ARG SENTRYCLI_CDNURL=https://downloads.sentry-cdn.com/sentry-cli
RUN npm ci \
    && npm cache clean --force

COPY configs/sentry* ./
COPY vkdocs.config.js ./
COPY configs/.data/ .data/
COPY docs/ docs/
COPY externals/ externals/
COPY guides/ guides/

ARG SENTRY_AUTH_TOKEN=""
ENV SENTRY_RELEASE=$IMAGE_TAG

RUN npm run prep \
    && npm cache clean --force \
    && npm run updateRedirect

EXPOSE 3000

CMD ["npm", "run", "dev"]
