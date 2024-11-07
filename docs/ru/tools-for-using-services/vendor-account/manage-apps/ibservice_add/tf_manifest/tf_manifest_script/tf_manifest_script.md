# {heading(Использование скриптов)[id=tf_manifest_script]}

Скрипты позволяют выполнять различные операции в процессе развертывания сервиса, например синхронизировать узлы при объединении в кластер.

Существует два способа использования скриптов:

- через [Cloud-init](/ru/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ib_image_create/ib_image_requirements);
- через [агент](/ru/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ib_image_create/ib_image_agent).

## {heading(Выполнение скриптов через Cloud-init)[id=tf_script_userdata]}

Cloud-init позволяет настроить очередность выполнения скриптов и задать момент их запуска на одном сервере. Например, скрипт может выполняться при каждой загрузке ОС или только один раз.

Недостатки этого способа:

- Если скрипт будет выполнен с ошибкой, это остановит развертывание инстанса, то есть не все нужные настройки будут применены.
- Нельзя задавать зависимость запуска скрипта относительно других ресурсов Terraform: скрипт может еще выполняться, но в Marketplace будет уже будет отмечено, что развертывание инстанса завершено.

Чтобы использовать скрипты через Cloud-init:

1. (Опционально) Во входных переменных опишите содержимое скриптов. Поддерживаются языки Bash и Python.
1. Опишите порядок и настройки выполнения скриптов в аргументе `user_script` ресурса `ivkcs_user_data`. Подробнее в разделе {linkto(/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]}.
1. Опишите содержимое скриптов с использованием переменных или напрямую в ресурсе. 

В разделе {linkto(/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#user_script)[text=%text]} приведен пример описания скриптов в ресурсе `ivkcs_user_data` манифеста.

## {heading(Выполнение скриптов через агент)[id=tf_script_agentexec]}

Агент позволяет задавать зависимость запуска скрипта относительно других ресурсов Terraform, устанавливать таймаут, контролировать коды выхода и останавливать развертывание приложения при ошибках.

В процессе развертывания сервиса агент передает хеш выполненных скриптов в сервис управления конфигурациями. Это позволяет оценить текущее состояние ВМ с инстансом сервиса (какие скрипты выполнены на текущий момент) и привести его к состоянию, описанному в манифесте Terraform.

Агент передает сервису управления конфигурациями статус скриптов. Возможные статусы:

- `ok` — скрипт выполнен успешно.
- `running` — скрипт выполняется.
- `failed` — скрипт завершен с ошибкой. [Просмотрите](../../ibservice_upload/ibservice_upload_deploysystemtest/#agent_log) логи агента, чтобы определить ее причину.

   Если получен статус `failed`, система развертывания запустит процесс развертывания сервиса повторно. Повторные попытки могут занимать до полутора часов и могут быть отключены в файле `settings.yaml` (подробнее — в разделе {linkto(../tf_manifest_settings/#tf_manifest_settings)[text=%text]}).

Результаты выполнения скриптов можно передать в сервис управления конфигурациями в форматированном виде и использовать при выполнении других скриптов.

Недостатки этого способа:

- Требуется установка агента.
- Невозможно перезапускать скрипты при рестарте ОС.

Чтобы использовать скрипты через агент:

1. Убедитесь, что в манифесте описана установка агента на ВМ. Если установка агента не описана, опишите ее (подробнее — в разделе {linkto(/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]}).
1. (Опционально) Во входных переменных опишите содержимое скриптов. Поддерживаются языки Bash и Python.
1. Опишите порядок и настройки выполнения скриптов. Используйте [ресурс ivkcs_agent_exec](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_exec) или блок `locals`.

   Например, для скрипта можно определить тайм-аут выполнения, количество попыток выполнения скрипта до присвоения ему статуса `failed`.

   Для каждого скрипта можно определить опции, описанные в разделе {linkto(/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_exec/#ivkcs_agent_exec)[text=%text]} (например, тайм-аут выполнения, количество попыток выполнения скрипта до определения его статуса как `failed`).
1. Опишите содержимое скриптов с использованием переменных или напрямую в ресурсе.
1. (Опционально) Если требуется получить результаты скриптов, чтобы использовать их в выходных параметрах (подробнее — в разделе {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]}) или в других ресурсах манифеста, используйте источник данных `ivkcs_agent_script_result`.

В разделе {linkto(../tf_manifest_steps/#tf_manifest_example)[text=%text]} приведен пример манифеста с применением скриптов в ресурсе `ivkcs_agent_exec`.

<info>

Ресурсы и источники данных описаны в разделе [Справочник по провайдеру VK CS Infra (iVK CS)](../../../ivkcs).

</info>