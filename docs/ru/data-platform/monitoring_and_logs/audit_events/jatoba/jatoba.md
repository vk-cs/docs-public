# {heading(Jatoba)[id=jatoba-audit-events]}

VK Data Platform отправляет в сервис аудита события управления экземпляром Jatoba, приведенные в {linkto(#tab_jatoba_audit_events)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_jatoba_audit_events]} — События аудита Jatoba)[align=right;position=above;id=tab_jatoba_audit_events;number={const(numb_tab_jatoba_audit_events)}]}

[cols="2,1,2", options="header"]
|===
|Событие
|Объект события
|Действие пользователя

|`create`
|Кластер
|Создание экземпляра

|`restore-application`
|Кластер
|Восстановление экземпляра из резервной копии

|`update-application-info`
|Кластер
|Изменение имени или описания экземпляра

|`delete-application`
|Кластер
|Удаление экземпляра

|`change-application-scale`
|Кластер
|Изменение CPU, RAM, размера диска или числа узлов в группах `postgres` и `bouncer`

|`application-starlift`
|Кластер
|Обновление версии Jatoba в рамках линейки 6.x

|`kube-api-request`
|Кластер
|Отправка запроса к API Kubernetes для кластера

|`set-cluster-issuer`
|Кластер
|Назначение кластеру компонента DP-Issuer для выпуска сертификатов

|`update-application-settings`
|Настройки кластера
|Изменение настроек Jatoba

|`update-application-maintenance`
|Обслуживание кластера
|Изменение настроек обслуживания

|`update-cluster-inner-ips`
|Сеть кластера
|Восстановление внутренних IP-адресов кластера

|`create-application-backup`
|Резервная копия
|Создание резервной копии вручную

|`delete-application-backup`
|Резервная копия
|Удаление резервной копии

|`create-application-user`
|Пользователь БД
|Создание пользователя

|`update-application-user`
|Пользователь БД
|Изменение пользователя

|`moderate-application-user`
|Пользователь БД
|Блокировка или разблокировка пользователя

|`delete-application-user`
|Пользователь БД
|Удаление пользователя

|`create-grants`
|Права пользователя
|Выдача прав пользователю

|`update-grants-for-users`
|Права пользователя
|Изменение прав пользователя

|`delete-grants-for-users`
|Права пользователя
|Отзыв прав у пользователя

|`update-application-user-access`
|Настройки доступа пользователя
|Настройка доступа пользователя

|`create-application-extensions`
|Расширение Jatoba
|Включение расширения

|`update-application-extensions`
|Расширение Jatoba
|Изменение расширения

|`delete-application-extensions`
|Расширение Jatoba
|Отключение расширения

|`create-application-connections`
|Подключение
|Создание подключения

|`update-application-connections`
|Подключение
|Изменение подключения

|`delete-application-connections`
|Подключение
|Удаление подключения

|`create-connection-store-for-internal-user`
|Запись в каталоге подключений
|Создание записи в каталоге подключений для внутренних пользователей

|`update-connection-store`
|Запись в каталоге подключений
|Изменение записи в каталоге подключений

|`delete-connection-store`
|Запись в каталоге подключений
|Удаление записи в каталоге подключений

|===

{/caption}

Каждое событие содержит следующие поля:

- `subject.user_id` — ID пользователя, который инициировал действие.
- `subject.project_id` — ID проекта.
- `labels.cluster_id` — ID кластера, к которому относится событие.
- `labels.product_name` — название сервиса. Для Jatoba значение `jatoba`.
- `labels.product_version` — версия сервиса.
- `request_id` — ID запроса, связанного с событием.
- `timestamp` — время события.
- `severity` — уровень важности события.
- `status` — статус HTTP-ответа на запрос.
