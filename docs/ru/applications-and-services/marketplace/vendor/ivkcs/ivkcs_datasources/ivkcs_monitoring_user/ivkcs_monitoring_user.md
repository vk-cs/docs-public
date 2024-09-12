# {heading(Источник данных ivkcs_monitoring_user)[id=ivkcs_monitoring_user]}

Источник данных `ivkcs_monitoring_user` возвращает атрибуты, приведенные в {linkto(#tab_attributes)[text=таблице %number]}. Атрибуты позволяют настроить output-плагин агента мониторинга (Telegraf), чтобы отправлять метрики в Cloud Monitoring (подробнее — в разделе [Интеграция с Cloud Monitoring облачной платформы](../../../ib_cloud_monitoring)).

{caption(Таблица {counter(table)[id=numb_tab_attributes]} — Атрибуты источника данных ivkcs_monitoring_user)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="1,3,2", options="header"]
|===
|Имя
|Описание
|Значение

|
`user_id`
|Идентификатор сервисного пользователя в Keycloak облачной платформы
|
От провайдера

|
`password`
|Пароль сервисного пользователя в Keycloak облачной платформы. Содержит чувствительные данные
|
Генерируется при установке агента мониторинга

|
`project_id`
|Идентификатор проекта (OpenStack PID) облачной платформы
|
От провайдера

|
`auth_url`
|URL-адрес авторизации в облачной платформе
|
`https://infra.mail.ru:5000/v3/`

|
`namespace`
|Namespace в сервисе Cloud Monitoring
|
`mcs/vm`

|
`endpoint`
|URL-адрес для отправки метрик в Cloud Monitoring
|
`monitoring.mcs.mail.ru:443`
|===
{/caption}

{caption(Пример источника данных `ivkcs_monitoring_user`)[align=left;position=above]}
```hcl
data "ivkcs_monitoring_user" "write" {}
```
{/caption}
