ARG BASE_IMAGE_RELEASE=latest
FROM stage-registry.infra.devmail.ru/infra/front/new-help:$BASE_IMAGE_RELEASE

COPY en/ docs/en/
COPY ru/ docs/ru/

RUN npm run test:lint \
    && npm run test:ts \
    && npm run preparation:full \
    && npm run build
