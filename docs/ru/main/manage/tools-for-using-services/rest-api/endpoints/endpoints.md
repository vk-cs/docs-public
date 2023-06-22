В личном кабинете вы можете посмотреть адреса доступных эндпоинтов API. Список и адреса эндпоинтов различаются между [регионами](/ru/base/account/concepts/regions).

Для работы с VK Cloud через API [активируйте доступ по API](../enable-api). Подробнее о работе с сервисами читайте в разделе [Справка API](/ru/additionals/api).

## Просмотр списка эндпоинтов

Список доступен всем пользователям, вне зависимости от их [роли](/ru/base/account/concepts/rolesandpermissions), если в проекте [включены сервисы](/ru/base/account/instructions/activation).

Чтобы увидеть список эндпоинтов для вашего региона:

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.

1. Перейдите на вкладку **API endpoints**.

## Эндпоинты региона Москва

Четыре ключевых эндпоинта для сервисов OpenStack:

| Эндпоинт                            | Адрес                   |
|-------------------------------------|-------------------------|
| Nova              | https://infra.mail.ru:8774/v2.1                     |
| Cinder            | https://public.infra.mail.ru:8776/v3/<project_id>   |
| Neutron           | https://infra.mail.ru:9696                          |
| Heat              | https://infra.mail.ru:8004/v1/<project_id>          |

<details><summary>Остальные эндпоинты</summary>

**Эндпоинты сервисов OpenStack**

| Эндпоинт                            | Адрес                   |
|-------------------------------------|-------------------------|
| Audit             | https://mcs.mail.ru/auditlogs/v1/<project_id>       |
| Barbican          | https://public.infra.mail.ru:9311                   |
| Glance            | https://infra.mail.ru:9292                          |
| Gnocchi           | https://infra.mail.ru:8041                          |
| Karboii           | https://mcs.mail.ru/infra/karboii/v1                |
| Keystone          | https://infra.mail.ru:35357/v3/                     |
| Magnum            | https://infra.mail.ru:9511/v1                       |
| Magnum-addons     | https://mcs.mail.ru/infra/container/addons          |
| Manila            | https://public.infra.mail.ru:8786/v2/<project_id>   |
| Octavia           | https://public.infra.mail.ru:9876                   |
| Publicdns         | https://mcs.mail.ru/public-dns                      |
| Quota-manager     | https://mcs.mail.ru/quota-manager                   |
| Sahara            | https://infra.mail.ru:8386/v1.1/<project_id>        |
| Trove             | https://infra.mail.ru:8779/v1.0/<project_id>        |
<br />
<hr color="#D3D3D3" width="90%">
<br />

**Эндпоинты сервиса Объектное хранилище (S3)**

| Эндпоинт                            | Адрес                            |
|-------------------------------------|----------------------------------|
| Домен S3                            | https://hb.ru-msk.vkcs.cloud/    |
<br />
<hr color="#D3D3D3" width="90%">
<br />

**Эндпоинты AI API**

| Эндпоинт                              | Адрес                     |
|---------------------------------------|---------------------------|
| Vision для распознавания изображений  | https://smarty.mail.ru/   |
| Vision для распознавания видео        | https://smarty.mail.ru/   |
<br />
<hr color="#D3D3D3" width="90%">
<br />

**Эндпоинты сервиса Очереди сообщений**

| Эндпоинт                            | Адрес                            |
|-------------------------------------|----------------------------------|
| Endpoint URL                        | https://sqs.mcs.mail.ru          |

</details>

## Получение Project ID

Адреса некоторых эндпоинтов содержат переменную `<project_id>`. При создании запроса замените эту переменную на Project ID текущего проекта.

Project ID не совпадает с [идентификатором проекта](/ru/base/account/instructions/project-settings/manage#poluchenie-identifikatora-proekta) в личном кабинете. Это еще один идентификатор, который используется в конфигурационных файлах:

- В `openrc.sh`, как значение переменной `OS_PROJECT_ID.` Этот файл необходим для работы при помощи дополнительных инструментов, таких OpenStack CLI или cURL.
- В `vkcs_provider.tf`, как значение параметра `project_id`. Этот файл необходим для работы через Terraform.

Чтобы получить значение Project ID для проекта:

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.

1. Откройте нужный проект, выбрав его из списка в шапке страницы личного кабинета.

2. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.

4. Откройте вкладку **Доступ по API** или вкладку **Terraform**.

    Значение доступно на обеих вкладках, под заголовками **Project ID** и **Project ID / tenant_id**, соответственно.

    <info>

    На вкладке **Доступ по API** значение **Project ID** отображается, если доступ по API активирован.

    </info>
