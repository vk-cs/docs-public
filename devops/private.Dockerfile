ARG D11N_VERSION
FROM prod-registry.infra.devmail.ru/infra/front/tech-writers/build-d11n:${D11N_VERSION}

COPY config/ config/
COPY .data/ .data/
COPY docs/ docs/
COPY public/ public/
COPY guides/ guides/
COPY externals/ externals/
COPY externals/ .portal/externals/

RUN cp config/private.docs.config.mjs config/docs.config.mjs && \
    rm config/public.docs.config.mjs config/private.docs.config.mjs config/data-platform.docs.config.mjs config/s3.docs.config.mjs

RUN cp docs/ru/ru.meta.private.json docs/ru/ru.meta.json && \
    rm docs/ru/ru.meta.private.json

RUN cp config/private.preparer.config.mjs config/preparer.config.mjs && \
    rm config/private.preparer.config.mjs config/all.preparer.config.mjs config/data-platform.preparer.config.mjs config/s3.preparer.config.mjs

# .git is only needed while building (git history for preparers), so mount it
# instead of copying: ~800 MB less in the image to export, push and pull
RUN --mount=type=bind,source=.git,target=.git,rw BUILD_POINTS=private npx preparer start prepare && npx portal build