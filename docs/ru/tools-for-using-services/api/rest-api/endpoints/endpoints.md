В личном кабинете вы можете посмотреть адреса доступных эндпоинтов API. Список и адреса эндпоинтов различаются между [регионами](/ru/tools-for-using-services/account/concepts/regions).

Для работы с VK Cloud через API [активируйте доступ по API](../enable-api). Подробнее о работе с сервисами читайте в разделе [Спецификация API](/ru/tools-for-using-services/api).

## Просмотр списка эндпоинтов

Список доступен всем пользователям, вне зависимости от их [роли](/ru/tools-for-using-services/account/concepts/rolesandpermissions).

Чтобы увидеть список эндпоинтов для вашего региона:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API endpoints**.

## Эндпоинты региона Москва

### Cloud Servers

| Эндпоинт                            | Адрес                   | Назначение |
|-------------------------------------|-------------------------|-----------------|
| Nova              | https://infra.mail.ru:8774/v2.1                     | Управление [виртуальными машинами](/ru/computing/iaas/service-management/vm) |
| Cinder            | https://public.infra.mail.ru:8776/v3/<project_id>   | Управление [дисками](/ru/computing/iaas/service-management/volumes) и их снимками |
| Glance            | https://infra.mail.ru:9292                          | Управление [образами ВМ](/ru/computing/iaas/service-management/images) |
| Karboii           | https://mcs.mail.ru/infra/karboii/v1                | Управление [резервным копированием](/ru/tools-for-using-services/api/api-spec/backup-api) ВМ и инстансов баз данных |
| Manila            | https://public.infra.mail.ru:8786/v2/<project_id>   | Управление [файловыми хранилищами](/ru/computing/iaas/service-management/fs-manage) |

<info>

В личном кабинете не отражен эндпоинт Cloud Logging (https://mcs.mail.ru/cloudlogs/v1/logs) — он позволяет [собирать логи ВМ](/ru/tools-for-using-services/api/api-spec/logging).

</info>

<details><summary>Остальные эндпоинты</summary>

### Cloud Containers

| Эндпоинт                            | Адрес                   | Назначение |
|-------------------------------------|-------------------------|-----------------|
| Magnum            | https://infra.mail.ru:9511/v1                       | Управление контейнерами [Cloud Containers](/ru/kubernetes/k8s) |
| Magnum-addons     | https://mcs.mail.ru/infra/container/addons          | Управление [аддонами](/ru/kubernetes/k8s/service-management/addons) сервиса Cloud Containers |

### Cloud Networks

| Эндпоинт                            | Адрес                   | Назначение |
|-------------------------------------|-------------------------|-----------------|
| Neutron           | https://infra.mail.ru:9696                          | Управление всеми объектами [сетевой инфраструктуры](/ru/networks/vnet), кроме публичных DNS-зон и балансировщиков нагрузки |
| Octavia           | https://public.infra.mail.ru:9876                   | Управление [балансировщиками нагрузки](/ru/networks/balancing/service-management/manage-lb) |
| Publicdns         | https://mcs.mail.ru/public-dns                      | Управление публичными [DNS-зонами](/ru/networks/dns/publicdns) |

### Cloud Big Data

| Эндпоинт                            | Адрес                   | Назначение |
|-------------------------------------|-------------------------|-----------------|
| Sahara            | https://infra.mail.ru:8386/v1.1/<project_id>        | Управление кластерами [Cloud Big Data](/ru/tools-for-using-services/api/api-spec/bigdata-api) |

### Cloud Databases

| Эндпоинт                            | Адрес                   | Назначение |
|-------------------------------------|-------------------------|-----------------|
| Trove             | https://infra.mail.ru:8779/v1.0/<project_id>        | Управление [базами данных](/ru/dbs/dbaas) |

### Cloud Storage

| Эндпоинт                            | Адрес                            | Назначение |
|-------------------------------------|----------------------------------| -----------------|
| Домен S3                            | https://hb.ru-msk.vkcloud-storage.ru/    | Управление [Cloud Storage](/ru/tools-for-using-services/api/api-spec/s3-rest-api) |

### Cloud ML Platform

| Эндпоинт                              | Адрес                     | Назначение |
|---------------------------------------|---------------------------| -----------------|
| Mlplatform | https://msk.cloud.vk.com/infra/mlplatform   | Управление [Cloud ML Platform](/ru/ml/mlplatform) |

### AI API

| Эндпоинт                              | Адрес                     | Назначение |
|---------------------------------------|---------------------------| -----------------|
| Vision для распознавания изображений и видео | https://smarty.mail.ru/   | [Распознавание объектов](/ru/tools-for-using-services/api/api-spec/vision-api) |

### Эндпоинты, не привязанные к сервисам

| Эндпоинт                            | Адрес                   | Назначение |
|-------------------------------------|-------------------------|-----------------|
| Audit             | https://mcs.mail.ru/auditlogs/v1/<project_id>       | Сбор статистики действий пользователей в проекте |
| Barbican          | https://public.infra.mail.ru:9311                   | Защищенное хранение секретов (SSH-ключей, токенов Keystone, сертификатов TLS) |
| Keystone          | https://infra.mail.ru:35357/v3/                     | Управление пользователями проекта, авторизация пользователей на основе [токенов](../case-keystone-token) |
| Quota-manager     | https://mcs.mail.ru/quota-manager                   | Просмотр [квот](/ru/tools-for-using-services/account/concepts/quotasandlimits) проекта |
| Heat              | https://infra.mail.ru:8004/v1/<project_id>          | Оркестрация облачных сервисов (эндпоинт устарел) |

</details>

## Получение Project ID

Адреса некоторых эндпоинтов содержат переменную `<project_id>`. При создании запроса замените эту переменную на Project ID текущего проекта.

Project ID не совпадает с [идентификатором проекта](/ru/tools-for-using-services/account/service-management/project-settings/manage#poluchenie_identifikatora_proekta) в личном кабинете. Это еще один идентификатор, который используется в конфигурационных файлах:

- В `openrc.sh`, как значение переменной `OS_PROJECT_ID`. Этот файл необходим для работы при помощи дополнительных инструментов, таких OpenStack CLI или cURL.
- В `vkcs_provider.tf`, как значение параметра `project_id`. Этот файл необходим для работы через Terraform.

Чтобы получить значение Project ID для проекта:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Откройте нужный проект, выбрав его из списка в шапке страницы личного кабинета.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Откройте вкладку **Доступ по API** или вкладку **Terraform**.

    Значение доступно на обеих вкладках, под заголовками **Project ID** и **Project ID / tenant_id**, соответственно.

    <info>

    На вкладке **Доступ по API** значение **Project ID** отображается, если доступ по API активирован.

    </info>
