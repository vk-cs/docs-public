ARG BASE_IMAGE_RELEASE=latest
FROM stage-registry.infra.devmail.ru/infra/front/services/new-help:$BASE_IMAGE_RELEASE

# remove saved in image symlink
RUN rm -rf docs \
        externals \
        docs-public \
        .next \
        public/_docs

# copy new docs
COPY docs/ docs/
COPY externals/ externals/

# rebuild
RUN npm run preparation:full \
    && npm run preparation:fullRedirectNetwork \
    && npm run build
