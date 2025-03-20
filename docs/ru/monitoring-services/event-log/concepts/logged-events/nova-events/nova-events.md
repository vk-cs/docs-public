События, которые [сервис управления вычислительными ресурсами](/ru/computing/iaas/service-management/vm) передает в Cloud Audit.

[cols="2,3", options="header"]
|===
|Событие
|Описание

|`create-vm`
|Создана ВМ

|`delete-vm`
|Удалена ВМ

|`update-vm`
|Обновлена ВМ

|`vm-action`
|Выполнено действие с ВМ

|`vm-create-console`
|Создана консоль ВМ

|`vm-create-or-update-metadata`
|Созданы или обновлены метаданные ВМ

|`vm-delete-metadata`
|Удалены метаданные ВМ

|`vm-attach-interface`
|Подключен интерфейс ВМ

|`vm-detach-interface`
|Отключен интерфейс ВМ

|`vm-clear-password`
|Сброшен пароль ВМ

|`vm-attach-volume`
|К ВМ подключен диск

|`vm-detach-volume`
|От ВМ отключен диск

|`vm-update-volume`
|Обновлен диск ВМ

|`flavor-create`
|Создан шаблон конфигурации ВМ (flavor)

|`flavor-delete`
|Удален шаблон конфигурации ВМ

|`flavor-update`
|Обновлен шаблон конфигурации ВМ

|`flavor-modify-access`
|Изменен доступ к шаблону конфигурации ВМ

|`flavor-create-extraspecs`
|Добавлены дополнительные спецификации в шаблон конфигурации ВМ

|`flavor-delete-extraspecs`
|Удалены дополнительные спецификации из шаблона конфигурации ВМ

|`flavor-update-extraspecs`
|Обновлены дополнительные спецификации в шаблоне конфигурации ВМ

|`keypair-create`
|Создана ключевая пара

|`keypair-delete`
|Удалена ключевая пара

|`aggregate-create`
|Создан агрегат (aggregate)

|`aggregate-delete`
|Удален агрегат

|`aggregate-delete`
|Обновлен агрегат

|`external-event`
|Произошло внешнее событие

|`assisted-volume-snapshots-create`
|С помощью эмулятора или гипервизора созданы снимки состояния тома

|`assisted-volume-snapshots-delete`
|С помощью эмулятора или гипервизора удалены снимки состояния тома

|`vm-migration-create`
|Запущена миграция ВМ

|`vm-migration-abort`
|Прервана миграция ВМ

|`quota-update`
|Обновлена квота

|`quota-class-update`
|Обновлены квоты для класса квот

|`quota-revert-to-default`
|Квота сброшена до значения по умолчанию

|`server-groups-create`
|Созданы группы серверов

|`server-groups-delete`
|Удалены группы серверов

|`tags-replace`
|Заменены все теги

|`tags-delete`
|Удалены все теги

|`tag-create`
|Заменен тег

|`tag-delete`
|Удален тег

|`create-security-group`
|Создана группа безопасности

|`update-security-group`
|Обновлена группа безопасности

|`delete-security-group`
|Удалена группа безопасности

|`create-security-group-rule`
|Создано правило группы безопасности

|`delete-security-group-rule`
|Удалено правило группы безопасности

|`create-floating-ip`
|Создан [Floating IP-адрес](/ru/networks/vnet/concepts/ips-and-inet#plavayushchiy_ip_adres)

|`delete-floating-ip`
|Удален Floating IP-адрес
|===
