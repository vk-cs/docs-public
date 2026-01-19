ARG D11N_VERSION
FROM prod-registry.infra.devmail.ru/infra/front/tech-writers/build-d11n:${D11N_VERSION}

ARG SATORI_API_KEY_2
ENV SATORI_API_KEY_2=${SATORI_API_KEY_2}

ARG SATORI_API_BASE_URL
ENV SATORI_API_BASE_URL=${SATORI_API_BASE_URL}

COPY .git/ .git/
COPY config/ config/
COPY .data/ .data/
COPY docs/ docs/
COPY public/ public/
COPY guides/ guides/
COPY externals/ externals/
COPY externals/ .portal/externals/

RUN npx preparer start prepare && npx portal build
