События, которые сервис [файловых хранилищ](/ru/computing/iaas/concepts/about#file_share) передает в Cloud Audit:

[cols="1,4", options="header"]
|===
|Метод
|Эндпоинт и генерируемые на нем события, включая неудачные попытки действий

2+^|[Создание, удаление и изменение параметров файловых хранилищ](https://docs.openstack.org/api-ref/shared-file-system/index.html#create-share)

|POST
|`/v2/shares/`

[Создано](/ru/computing/iaas/service-management/fs-manage#creating_a_file_storage) файловое хранилище

|POST
|`/v2/shares/manage`

Файловое хранилище, созданное вне сервиса файловых хранилищ, передано под управление этого сервиса

|PUT
|`/v2/shares/{share_id}`

Изменены параметры файлового хранилища

|DELETE
|`/v2/shares/{share_id}`

[Удалено](/ru/computing/iaas/service-management/fs-manage#deleting_a_file_storage_and_its_network) файловое хранилище

2+^|[Операции с метаданными файловых хранилищ](https://docs.openstack.org/api-ref/shared-file-system/index.html#delete-share-metadata-item)

|POST
|`/v2/shares/{share_id}/metadata`

* Добавлены новые метаданные в виде пар ключ/значение.
* Изменены значения для существующих метаданных

|PUT
|`/v2/shares/{share_id}/metadata`

Все метаданные файлового хранилища заменены новыми

|DELETE
|`/v2/shares/{share_id}/metadata/{key}`

Удален элемент метаданных с заданным ключом

2+^|[Дополнительные операции с файловыми хранилищами](https://docs.openstack.org/api-ref/shared-file-system/index.html#grant-access)

|POST
|`/v2/shares/{share_id}/action`

* [Предоставлен](/ru/computing/iaas/service-management/fs-manage#adding_an_access_rule) доступ к файловому хранилищу.
* [Отозван](/ru/computing/iaas/service-management/fs-manage#deleting_an_access_rule) доступ к файловому хранилищу.
* [Изменен размер](/ru/computing/iaas/service-management/fs-manage#increasing_file_storage_size) файлового хранилища

2+^|[Операции со снимками файловых хранилищ](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-snapshots)

|POST
|`/v2/snapshots`

[Создан](/ru/computing/iaas/service-management/fs-manage#creating_a_snapshot) снимок файлового хранилища

|POST
|`/v2/snapshots/manage`

Снимок файлового хранилища, которое создано вне сервиса файловых хранилищ, передан под управление этого сервиса

|POST
|`/v2/snapshots/{snapshot_id}/action`

Отменено управление снимком файлового хранилища, которое создано вне сервиса файловых хранилищ

|PUT
|`/v2/snapshots/{snapshot_id}`

Изменены параметры снимка файлового хранилища

|DELETE
|`/v2/snapshots/{snapshot_id}`

[Удален](/ru/computing/iaas/service-management/fs-manage#deleting_a_snapshot) снимок файлового хранилища

2+^|[Операции с метаданными снимков файловых хранилищ](https://docs.openstack.org/api-ref/shared-file-system/index.html#snapshot-metadata-since-api-v2-73)

|POST
|`/v2/snapshots/{snapshot_id}/metadata`

* Добавлены новые метаданные в виде пар ключ/значение
* Изменены значения для существующих метаданных

|PUT
|`/v2/snapshots/{snapshot_id}/metadata`

Все метаданные снимка файлового хранилища заменены новыми

|DELETE
|`/v2/snapshots/{snapshot_id}/metadata/{key}`

Удален элемент метаданных с заданным ключом

2+^|[Управление сетями файловых хранилищ](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-networks)

|POST
|`/v2/share-networks`

[Создана](/ru/computing/iaas/service-management/fs-manage#creating_a_file_storage) сеть файлового хранилища

|POST
|`/v2/share-networks/{share_network_id}/action`

Действия со службой безопасности для сети файлового хранилища:

* служба добавлена, удалена или заменена;
* выполнена проверка возможности добавить или заменить службу.

|PUT
|`/v2/share-networks/{share_network_id}`

Изменены параметры сети файлового хранилища

|DELETE
|`/v2/share-networks/{share_network_id}`

[Удалена](/ru/computing/iaas/service-management/fs-manage#deleting_a_file_storage_and_its_network) сеть файлового хранилища

2+^|[Управление подсетями в сетях файловых хранилищ](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-network-subnets-since-api-v2-51)

|POST
|`/v2/share-networks/{share_network_id}/subnets`

Создана подсеть в заданной сети файлового хранилища

|DELETE
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}`

Удалена подсеть из заданной сети файлового хранилища

2+^|[Управление метаданными сетей файловых хранилищ](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-network-subnets-metadata-since-api-v2-78)

|POST
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata`

* Добавлены новые метаданные в виде пар ключ/значение.
* Изменены значения для существующих метаданных

|PUT
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata`

Все метаданные заданной подсети заменены новыми

|DELETE
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata/{key}`

Удален элемент метаданных с заданным ключом

2+^|[Операции с типами файловых хранилищ](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-types)

|POST
|`/v2/types`

Создан новый тип файловых хранилищ

|POST
|`/v2/types/{share_type_id}/extra_specs`

Заданному типу файлового хранилища присвоена дополнительная спецификация 

|DELETE
|`/v2/types/{share_type_id}/extra_specs/{extra-spec-key}`

Отменено присвоение дополнительной спецификации для типа файлового хранилища

|POST
|`/v2/types/{share_type_id}/action`

* Предоставлен доступ к типу файловых хранилищ.
* Отозван доступ к типу файловых хранилищ

|DELETE
|`/v2/types/{share_type_id}`

Удален тип файловых хранилищ

|PUT
|`/v2/types/{share_type_id}`

Изменены параметры для типа файлового хранилища

2+^|[Управление квотами](https://docs.openstack.org/api-ref/shared-file-system/index.html#quota-sets)

|PUT
|`/v2/quota-sets/{project_id_quota_request_path}?user_id={user_id}`

Изменены квоты для проекта или пользователя в проекте

|DELETE
|`/v2/quota-sets/{project_id_quota_request_path}?user_id={user_id}`

Отменено изменение квот для проекта или пользователя в проекте, т.е. квоты вернулись к значениям по умолчанию

2+^|[Операции с метаданными для правил доступа](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-access-rule-metadata-since-api-v2-45)

|PUT
|`/v2/share-access-rules/{access_id}/metadata`

Изменены метаданные для правила доступа к файловому хранилищу

|DELETE
|`/v2/share-access-rules/{access_id}/metadata/{key}`

* Отменена настройка метаданных для правила доступа к файловому хранилищу.
* Удалено значение для элемента метаданных с заданным ключом

2+^|[Управление резервным копированием файлового хранилища](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-backups-since-api-v2-80)

|POST
|`/v2/share-backups`

Создана резервная копия файлового хранилища

|PUT
|`/v2/share-backups/{backup_id}`

Изменены параметры резервной копии файлового хранилища

|DELETE
|`/v2/share-backups/{backup_id}`

Удалена резервная копия файлового хранилища

|POST
|`/v2/share-backups/{backup_id}/action`

* Файловое хранилище восстановлено из резервной копии.
* Администратором изменен статус резервной копии
|===
