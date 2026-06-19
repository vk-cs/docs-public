Полное описание сервиса отображается на вкладке **Описание сервиса** страницы сервиса в Marketplace.

Текст описания указывается в конфигурации сервиса:

* Для image-based приложения — в файле `full_description.md` сервисного пакета.
* Для SaaS-приложения — в параметре `full_description` в JSON-файле.

В общем случае полное описание сервиса содержит следующие разделы:

* [Информация о сервисе](#service_description_info).
* [Правила тарификации](#service_description_tariffication).
* [Полезные ссылки](#service_description_links).
* [Техническая поддержка](#service_description_support).
* [Лицензионное соглашение](#service_description_license).

## {heading(Информация о сервисе)[id=service_description_info]}

{tabs}

{tab(Image-based)}

{include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-ib-general]}

{/tab}

{tab(SaaS)}

{include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-saas-general]}

{/tab}

{/tabs}

## {heading(Правила тарификации)[id=service_description_tariffication]}

{tabs}

{tab(Image-based)}

{include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-ib-tariff]}

{/tab}

{tab(SaaS)}

{include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-saas-tariff]}

{/tab}

{/tabs}

## {heading(Полезные ссылки)[id=service_description_links]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-links]}

## {heading(Техническая поддержка)[id=service_description_support]}

{tabs}

{tab(Image-based)}

{include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-ib-support]}

{/tab}

{tab(SaaS)}

{include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-saas-support]}

{/tab}

{/tabs}

## {heading(Лицензионное соглашение)[id=service_description_license]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-legal]}
