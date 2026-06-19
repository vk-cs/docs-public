# {heading(Получение токена доступа Keystone)[id=rest-api-keystone-token]}

Токен Keystone необходим для работы с некоторыми сервисами и компонентами {var(cloud)} через их API — например, с сервисом виртуальных сетей (Neutron) и подсистемой резервного копирования (Karboii) в сервисе Cloud Servers.

{ifdef(public)}
## {heading(Подготовительные шаги)[id=rest-api-keystone-token-prepare]}

{include(../../../../_includes/_prerequisites-api.md)[tags=api-token-prerequisites]}
{/ifdef}

## {heading(Генерация токена)[id=rest-api-keystone-token-gen]}

{include(../../../../_includes/_prerequisites-api.md)[tags=api-token-gen,case-keystone-token]}

{ifndef(public)}
## {heading(Перевыпуск токена)[id=rest-api-keystone-token-reissue]}

{include(../../../../_includes/_prerequisites-api.md)[tags=api-token-reissue]}
{/ifndef}

{ifdef(public)}
## {heading(Пример использования токена)[id=rest-api-keystone-token-example]}

{include(../../../../_includes/_prerequisites-api.md)[tags=api-token-example]}
{/ifdef}

