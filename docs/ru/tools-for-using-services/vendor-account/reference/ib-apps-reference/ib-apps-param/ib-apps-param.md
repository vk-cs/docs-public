Конфигурационный файл `service.yaml` содержит следующую информацию:

- [Общие параметры приложения](#app_parameters).
- [Массив plans](#service_plans) с именами тарифных планов. Эти имена используются только для описания сервисного пакета и не отображаются в интерфейсе Marketplace.
- [Секция preview](#service_options_for_matrix) с именами тарифных опций. Эти имена используются только для описания сервисного пакета и не отображаются в интерфейсе Marketplace.

## {heading(Общие параметры приложения)[id=app_parameters]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=service.yaml-common-param]}

## {heading(Массив plans)[id=service_plans]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=service.yaml-plans]}

## {heading(Секция preview)[id=service_options_for_matrix]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=service.yaml-preview]}

## {heading(Пример файла service.yaml)[id=ibexample_service]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=service.yaml-example]}