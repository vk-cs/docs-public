ARG BASE_IMAGE_RELEASE=latest
FROM stage-registry.infra.devmail.ru/infra/front/services/new-help:$BASE_IMAGE_RELEASE

ARG PARTNER_NAME
COPY partners/${PARTNER_NAME}/docs/ docs-partner/

# rebuild
RUN npm run preparation:full \
    && npm run preparation:fullRedirectNetwork \
    && npm run build
