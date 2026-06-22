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

RUN cp config/public.docs.config.mjs config/docs.config.mjs && \
    rm config/public.docs.config.mjs config/private.docs.config.mjs config/data-platform.docs.config.mjs config/s3.docs.config.mjs

RUN cp config/all.preparer.config.mjs config/preparer.config.mjs && \
    rm config/all.preparer.config.mjs config/data-platform.preparer.config.mjs config/private.preparer.config.mjs config/s3.preparer.config.mjs

RUN BUILD_POINTS=public npx preparer start prepare && npx portal build
