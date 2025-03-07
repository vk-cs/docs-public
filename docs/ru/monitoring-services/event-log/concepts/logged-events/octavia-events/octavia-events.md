События, которые [сервис балансировки нагрузки](/ru/networks/balancing) передает в Cloud Audit.

[cols="2,3", options="header"]
|===
|Событие
|Описание

|`batch-update-members`
|Выполнено пакетное обновление объектов балансировщика

|`remove-member`
|Удален объект балансировщика

|`remove-pool`
|Удален пул

|`remove-listener`
|Удален прослушиватель

|`create-flavor-profile`
|Создан вариант конфигурации (flavor profile) балансировщика нагрузки

|`update-flavor-profile`
|Обновлен вариант конфигурации балансировщика нагрузки

|`remove-flavor-profile`
|Удален вариант конфигурации балансировщика нагрузки

|`configure-amphora`
|Сконфигурирован инстанс балансировщика нагрузки (Amphora)

|`failover-amphora`
|Инстанс балансировщика нагрузки подключен повторно

|`create-an-l7-policy`
|Создана политика L7

|`update-l7-policy`
|Обновлена политика L7

|`remove-l7-policy`
|Удалена политика L7

|`remove-health-monitor`
|Удален объект мониторинга

|`reset-quota`
|Квота установлена повторно

|`remove-load-balancer`
|Удален балансировщик нагрузки

|`failover-load-balancer`
|Балансировщик нагрузки подключен повторно

|`create-an-l7-rule`
|Создано правило L7

|`update-l7-rule`
|Обновлено правило L7

|`remove-l7-rule`
|Удалено правило L7

|`create-flavor`
|Создан тип (flavor) балансировщика нагрузки

|`update-flavor`
|Обновлен тип балансировщика нагрузки

|`remove-flavor`
|Удален тип балансировщика нагрузки

|`create-load-balancer`
|Создан балансировщик нагрузки

|`update-load-balancer`
|Обновлен балансировщик нагрузки

|`delete-load-balancer`
|Удален балансировщик нагрузки

|`delete-load-balancer-cascade`
|Выполнено каскадное удаление балансировщика нагрузки

|`create-listener`
|Создан прослушиватель

|`update-listener`
|Обновлен прослушиватель

|`delete-listener`
|Удален прослушиватель

|`create-pool`
|Создан пул

|`update-pool`
|Обновлен пул

|`delete-pool`
|Удален пул

|`create-health-monitor`
|Создан объект мониторинга

|`update-health-monitor`
|Обновлен объект мониторинга

|`delete-health-monitor`
|Удален объект мониторинга

|`create-member`
|В пул добавлен объект

|`update-member`
|Обновлен объект пула

|`delete-member`
|Из пула удален объект

|`create-layer-7-policy`
|Создана политика уровня L7

|`update-layer-7-policy`
|Обновлена политика уровня L7

|`delete-layer-7-policy`
|Удалена политика уровня L7

|`create-layer-7-rule`
|Создано правило уровня L7

|`update-layer-7-rule`
|Обновлено правило уровня L7

|`delete-layer-7-rule`
|Удалено правило уровня L7

|`update-quota`
|Обновлена квота

|`delete-quota`
|Удалена квота
|===
