# {heading(Эндпоинты API)[id=rest-api-endpoints]}

В личном кабинете вы можете посмотреть адреса доступных эндпоинтов API.{ifdef(public)} Список и адреса эндпоинтов различаются между {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=регионами]}.

Для работы с {var(cloud)} через API {linkto(../enable-api#rest-api-enable)[text=активируйте доступ по API]}. Подробнее о работе с сервисами читайте в разделе {linkto(../../api-spec#tools-api-spec)[text=%text]}.{/ifdef}

## {heading(Просмотр списка эндпоинтов)[id=rest-api-endpoints-list]}

{ifdef(public)}
Список доступен всем пользователям, вне зависимости от их {linkto(../../../account/concepts/rolesandpermissions#tools-account-concepts-rolesandpermissions)[text=роли]}.
{/ifdef}

Чтобы увидеть список эндпоинтов{ifdef(public)} для вашего региона{/ifdef}:

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API endpoints**.

{/tab}

{ifndef(public)}
{tab(OpenStack CLI)}

1. {linkto(../../../cli/openstack-cli#tools-cli-openstack)[text=Установите]} клиент OpenStack и пройдите аутентификацию в проекте.
1. Выполните команду:

   ```console
   openstack catalog list
   ```
{/tab}
{/ifndef}

{/tabs}


{ifdef(public)}
## {heading(Эндпоинты региона Москва)[id=rest-api-endpoints-msk]}

### {heading(Cloud Servers)[id=rest-api-endpoints-iaas]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Адрес
|Назначение

|Nova
|https://infra.mail.ru:8774/v2.1
|Управление {linkto(../../../../computing/iaas/instructions/vm#iaas-vm)[text=виртуальными машинами]}

|Cinder
|https://public.infra.mail.ru:8776/v3/<project_id>
|Управление {linkto(../../../../computing/iaas/instructions/volumes#iaas-volumes)[text=дисками]} и их снимками 

|Glance
|https://infra.mail.ru:9292
|Управление {linkto(../../../../computing/iaas/instructions/images#iaas-images)[text=образами ВМ]}

|Karboii
|https://mcs.mail.ru/infra/karboii/v1
 Управление {linkto(../../api-spec/backup-api#api-spec-karboii)[text=резервным копированием]} ВМ и инстансов баз данных 

|Manila
|https://public.infra.mail.ru:8786/v2/<project_id>
|Управление {linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=файловыми хранилищами]}

|===

{note:info}
В личном кабинете не отражен эндпоинт Cloud Logging (https://mcs.mail.ru/cloudlogs/v1/logs) — он позволяет {linkto(../../api-spec/logging#api-spec-logging)[text=собирать логи ВМ]}.
{/note}

{cut(Остальные эндпоинты)}

### {heading(Cloud Containers)[id=rest-api-endpoints-k8s]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Адрес
|Назначение

|Magnum
|https://infra.mail.ru:9511/v1
|Управление контейнерами {linkto(../../../../kubernetes/k8s#k8s-k8s)[text=Cloud Containers]}

|Magnum-addons
|https://mcs.mail.ru/infra/container/addons
|Управление {linkto(../../../../kubernetes/k8s/instructions/addons#k8s-addons)[text=аддонами]} сервиса Cloud Containers

|===

### {heading(Cloud Networks)[id=rest-api-endpoints-network]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Адрес
|Назначение

|Neutron
|https://infra.mail.ru:9696
|Управление всеми объектами [text=сетевой инфраструктуры]}{linkto(../../../../networks/vnet), кроме публичных DNS-зон и балансировщиков нагрузки

|Octavia
|https://public.infra.mail.ru:9876
|Управление {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb)[text=балансировщиками нагрузки]}

|Publicdns
|https://mcs.mail.ru/public-dns
|Управление публичными {linkto(../../../../networks/dns/instructions/publicdns#dns-publicdns)[text=DNS-зонами]}

|===

### {heading(Cloud Databases)[id=rest-api-endpoints-dbaas]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Адрес
|Назначение

|Trove
|https://msk.cloud.vk.com/infra/database/v1.0/<project_id>
|Управление {linkto(../../../../dbs/dbaas#dbaas-dbaas)[text=базами данных]}

|===

### {heading({var(s3)})[id=rest-api-endpoints-s3]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Адрес
|Назначение

|Домен {var(s3)}
|https://hb.ru-msk.vkcloud-storage.ru/
|Управление {linkto(../../api-spec/s3-rest-api#api-spec-s3)[text={var(s3)}]}

|===

### {heading(Cloud ML Platform)[id=rest-api-endpoints-ml]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Адрес
|Назначение

|Mlplatform
|https://msk.cloud.vk.com/infra/mlplatform
|Управление {linkto(../../../../ml/mlplatform#mlplatform)[text=Cloud ML Platform]}

|===

### {heading(AI API)[id=rest-api-endpoints-ai]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Адрес
|Назначение

|Vision для распознавания изображений и видео
|https://smarty.mail.ru/
|{linkto(../../api-spec/vision-api#api-spec-vision)[text=Распознавание объектов]}

|===

### {heading(Эндпоинты, не привязанные к сервисам)[id=rest-api-endpoints-other]}

[cols="1,2,2", options="header"]
|===

|Эндпоинт
|Адрес
|Назначение

|Audit
|https://mcs.mail.ru/auditlogs/v1/<project_id>
|Сбор статистики действий пользователей в проекте

|Barbican
|https://public.infra.mail.ru:9311
|Защищенное хранение секретов (SSH-ключей, токенов Keystone, сертификатов TLS)

|Keystone
|https://infra.mail.ru:5000/v3/
|Управление пользователями проекта, авторизация пользователей на основе {linkto(../case-keystone-token#rest-api-keystone-token)[text=токенов]}

|Quota-manager
|https://mcs.mail.ru/quota-manager
|Просмотр {linkto(../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квот]} проекта

|Heat
|https://infra.mail.ru:8004/v1/<project_id>
|Оркестрация облачных сервисов (эндпоинт устарел)

|===

{note:info}
В личном кабинете не отражен эндпоинт Service Users (https://msk.cloud.vk.com/service-users/) — он позволяет управлять {linkto(../../../account/concepts/service-accounts#tools-account-concepts-service-accounts)[text=сервисными учетными записями]}.
{/note}

{/cut}
{/ifdef}

## {heading(Получение Project ID)[id=rest-api-endpoints-get-project-id]}

Адреса некоторых эндпоинтов содержат переменную `<project_id>`. При создании запроса замените эту переменную на Project ID текущего проекта.

Project ID не совпадает с {linkto(../../../account/instructions/project-settings/manage#project-pid-view)[text=идентификатором проекта]} в личном кабинете. Это еще один идентификатор, который используется в конфигурационных файлах:

- В `openrc.sh`, как значение переменной `OS_PROJECT_ID`. Этот файл необходим для работы при помощи дополнительных инструментов, таких OpenStack CLI или cURL.
- В `vkcs_provider.tf`, как значение параметра `project_id`. Этот файл необходим для работы через Terraform.

Чтобы получить значение Project ID для проекта:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Откройте нужный проект, выбрав его из списка в шапке страницы личного кабинета.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Откройте вкладку **Доступ по API** или вкладку **Terraform**.

   Значение доступно на обеих вкладках, под заголовками **Project ID** и **Project ID / tenant_id**, соответственно.
   {ifdef(public)}
   {note:info}
   На вкладке **Доступ по API** значение **Project ID** отображается, если доступ по API активирован.
   {/note}
   {/ifdef}