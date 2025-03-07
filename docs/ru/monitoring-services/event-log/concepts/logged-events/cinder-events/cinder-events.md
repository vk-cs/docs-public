События, которые [сервис управления дисками и их снимками](/ru/computing/iaas/service-management/volumes) передает в Cloud Audit.

## События компонента Cinder v2

[cols="2,3", options="header"]
|===
|Событие
|Описание

|`force-delete-backup`
|Принудительно удалена резервная копия

|`accept-volume-transfer`
|Разрешена передача тома (volume transfer) от одного пользователя к другому

|`create-volume-transfer`
|Создана передача тома

|`delete-volume-transfer`
|Удалена передача тома

|`create-backup`
|Создана резервная копия

|`delete-backup`
|Удалена резервная копия

|`restore-backup`
|Выполнено восстановление из резервной копии

|`reset-snapshot-status`
|Сброшен статус снимка

|`create-snapshot`
|Создан снимок

|`update-snapshot-metadata`
|Обновлены метаданные снимка

|`update-snapshot`
|Обновлен снимок

|`delete-snapshot`
|Удален снимок

|`volume-type-action`
|Выполнено действие с типом тома

|`create-consistency-group`
|Создана группа консистентности для создания снимков

|`create-consistency-group-from-source`
|Группа консистентности создана из источника

|`delete-consistency-group`
|Удалена группа консистентности

|`update-consistency-group`
|Обновлена группа консистентности

|`extend-volume-size`
|Увеличен размер тома

|`manage-existing-volume`
|Существующий том передан под управление Cinder

|`unset-keys-in-qos-specification`
|Отключены ключи спецификации QoS

|`set-keys-in-qos-specification`
|Установлены ключи спецификации QoS

|`delete-qos-specification`
|Удалена спецификация QoS

|`create-qos-specification`
|Создана спецификация QoS

|`update-quotas-for-user`
|Обновлены квоты пользователя

|`delete-quotas-for-user`
|Удалены квоты пользователя

|`update-quotas`
|Обновлены квоты

|`delete-quotas`
|Удалены квоты

|`create-volume`
|Создан том

|`update-volume`
|Обновлен том

|`delete-volume`
|Удален том

|`create-volume-metadata`
|Созданы метаданные тома

|`update-volume-metadata`
|Обновлены метаданные тома

|`delete-consistency-group-snapshot`
|Удален снимок группы консистентности

|`create-consistency-group-snapshot`
|Создан снимок группы консистентности

|`update-volume-type`
|Обновлен тип тома

|`delete-volume-type`
|Удален тип тома

|`create-volume-type`
|Создан тип тома

|`action-volume`
|Выполнено действие с томом
|===

## События компонента Cinder v3

[cols="2,3", options="header"]
|===
|Событие
|Описание

|`accept-volume-transfer`
|Разрешена передача тома (volume transfer) от одного пользователя к другому

|`create-volume-transfer`
|Создана передача тома

|`delete-volume-transfer`
|Удалена передача тома

|`force-delete-backup`
|Принудительно удалена резервная копия

|`delete-group-snapshot`
|Удален снимок группы

|`create-group-snapshot`
|Создан снимок группы

|`create-backup`
|Создана резервная копия

|`delete-backup`
|Удалена резервная копия

|`restore-backup`
|Выполнено восстановление из резервной копии

|`add-private-volume-type-access-to-project`
|В проект добавлен доступ к приватному типу тома

|`create-consistency-group`
|Создана группа консистентности для создания снимков

|`create-consistency-group-from-source`
|Группа консистентности создана из источника

|`delete-consistency-group`
|Удалена группа консистентности

|`update-consistency-group`
|Обновлена группа консистентности

|`unset-keys-in-qos-specification`
|Отключены ключи спецификации QoS

|`set-keys-in-qos-specification`
|Установлены ключи спецификации QoS

|`delete-qos-specification`
|Удалена спецификация QoS

|`create-qos-specification`
|Создана спецификация QoS

|`extend-volume-size`
|Увеличен размер тома

|`create-volume`
|Создан том

|`update-volume`
|Обновлен том

|`delete-volume`
|Удален том

|`create-metadata-for-volume`
|Созданы метаданные тома

|`update-volume-metadata`
|Обновлены метаданные тома

|`manage-an-existing-volume`
|Существующий том передан под управление Cinder

|`reset-snapshot-status`
|Сброшен статус снимка

|`update-group-type`
|Изменен тип группы

|`create-group-specs-for-group-type`
|Созданы спецификации группы для типа группы

|`delete-group-type`
|Удален тип группы

|`create-group-type`
|Создан тип группы

|`update-quotas-for-user`
|Обновлены квоты пользователя

|`delete-quotas-for-user`
|Удалены квоты пользователя

|`update-quotas-for-project`
|Обновлены квоты для проекта

|`delete-quotas-for-project`
|Удалены квоты для проекта

|`update-volume-type`
|Обновлен тип тома

|`delete-volume-type`
|Удален тип тома

|`create-volume-type`
|Создан тип тома

|`create-an-encryption-type`
|Создан тип шифрования

|`update-an-encryption-type`
|Обновлен тип шифрования

|`create-group`
|Создана группа

|`create-group-from-source`
|Группа создана из источника

|`delete-group`
|Удалена группа

|`update-group`
|Обновлена группа

|`create-snapshot`
|Создан снимок

|`update-snapshot-metadata`
|Обновлены метаданные снимка

|`update-snapshot`
|Обновлен снимок

|`delete-snapshot`
|Удален снимок

|`delete-consistency-group-snapshot`
|Удален снимок группы консистентности

|`create-consistency-group-snapshot`
|Создан снимок группы консистентности
|===
