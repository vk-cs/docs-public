ARG D11N_VERSION
FROM prod-registry.infra.devmail.ru/infra/front/tech-writers/build-d11n:${D11N_VERSION}

COPY .git/ .git/
COPY config/ config/
COPY .data/ .data/
COPY docs/ docs/
COPY public/ public/
COPY guides/ guides/
COPY externals/ externals/
COPY externals/ .portal/externals/

RUN npx preparer start prepare && npx portal build
