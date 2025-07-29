ARG D11N_VERSION
FROM prod-registry.infra.devmail.ru/infra/front/tech-writers/build-d11n:${D11N_VERSION}

ENV TARGET_ENV="development"

ARG SENTRYCLI_CDNURL=https://nexus.infra.devmail.ru/repository/github-releases-proxy/getsentry/sentry-cli/releases/download

COPY .git/ .git/
COPY config/ config/
COPY configs/sentry* ./
COPY .data/ .data/
COPY docs/ docs/
COPY public/ public/
COPY externals/ externals/
COPY guides/ guides/

ENV SENTRY_RELEASE=$IMAGE_TAG

RUN npx preparer start prepare && npx portal build
