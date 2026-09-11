
{includetag(domain-events)}
Доменные события фиксируют изменения состояния ресурсов.

[cols="2,2,1", options="header"]
|===
|Событие
|Описание
|Ресурс

|`complete-checkpoint`
|Завершено создание резервной копии
|`checkpoint`

|`complete-restore`
|Завершено восстановление резервной копии
|`restore`

|`create-checkpoint`
|Запущено создание резервной копии вручную
|`checkpoint`

|`create-checkpoint-from-trigger`
|Запущено создание резервной копии по расписанию
|`checkpoint`

|`create-plan`
|Создан план резервного копирования
|`plan`

|`create-plan-checkpoint`
|Запущено создание резервных копий плана
|`checkpoint` при успехе операции, `plan` при ошибке

|`create-plan-resource`
|Ресурс добавлен в план резервного копирования
|`plan`

|`create-restore`
|Запущено восстановление резервной копии
|`restore`

|`create-trigger`
|Создано расписание резервного копирования
|`trigger`

|`update-trigger`
|Изменено расписание резервного копирования
|`trigger`

|`delete-checkpoint-resource`
|Удален ресурс резервной копии
|`checkpoint_resource`

|`delete-plan`
|Удален план резервного копирования
|`plan`

|`delete-plan-resource`
|Ресурс удален из плана резервного копирования
|`plan`

|`disable-plan-object-lock`
|Для плана отключен Object Lock
|`plan`

|`enable-plan-object-lock`
|Для плана включен Object Lock
|`plan`

|`extend-checkpoint-lock`
|Продлен срок блокировки резервной копии
|`checkpoint`

|`mark-checkpoint-for-deletion`
|Резервная копия помечена для удаления
|`checkpoint`

|`unlock-checkpoint`
|С резервной копии снята блокировка
|`checkpoint`

|`update-plan`
|Изменен план резервного копирования
|`plan`

|`update-plan-object-lock`
|Изменены параметры плана Object Lock
|`plan`
|===
{/includetag}

{includetag(api-events)}
События запросов к API фиксируют чтение данных, а также результаты аутентификации и авторизации.

[cols="2,2,1", options="header"]
|===
|Событие
|Описание
|Ресурс

|`authenticate-api-request`
|Ошибка аутентификации API-запроса
|`api`

|`authorize-api-request`
|Ошибка авторизации API-запроса
|`api`

|`create-default-plan`
|Создан план резервного копирования по умолчанию при запросе
|`plan`

|`get-default-plan`
|Запрошен план резервного копирования по умолчанию
|`plan`

|`get-plan`
|Запрошен конкретный план резервного копирования
|`plan`

|`list-plans`
|Запрошен список планов резервного копирования
|`plan`

|`get-checkpoint`
|Запрошена резервная копия
|`checkpoint`

|`get-checkpoint-consistency-status`
|Запрошен статус консистентности копии
|`checkpoint`

|`get-checkpoint-deleted-status`
|Запрошен статус удаления копии
|`checkpoint`

|`get-checkpoint-metadata`
|Запрошены метаданные копии
|`checkpoint`

|`list-checkpoints`
|Запрошен список резервных копий
|`checkpoint`

|`list-checkpoints-by-plan`
|Запрошены резервные копии, сгруппированные по планам
|`checkpoint`

|`get-trigger`
|Запрошено расписание
|`trigger`

|`list-triggers`
|Запрошен список расписаний
|`trigger`

|`get-plans-statistics`
|Запрошена статистика по планам
|`statistics`

|`get-checkpoints-statistics`
|Запрошена статистика по резервным копиям
|`statistics`

|`get-restores-statistics`
|Запрошена статистика по восстановлениям
|`statistics`

|`get-provider`
|Запрошен провайдер
|`provider`

|`get-resources-in-use`
|Запрошены ресурсы, используемые в планах
|`resources`
|===
{/includetag}
