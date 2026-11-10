# {heading(ivkcs_monitoring_user дереккөзі)[id=ivkcs_monitoring_user]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`ivkcs_monitoring_user` дереккөзі {linkto(#tab_attributes)[text=%number кестеде]} келтірілген атрибуттарды қайтарады. Атрибуттар мониторинг агентінің (Telegraf) output-плагинін бұлттық платформаның Cloud Monitoring жүйесіне метрикалар жіберу үшін баптауға мүмкіндік береді (толығырақ — [Бұлттық платформаның Cloud Monitoring жүйесімен интеграция](../../../ib_cloud_monitoring) бөлімінде).

{caption({counter(table)[id=numb_tab_attributes]} кесте — ivkcs_monitoring_user дереккөзінің атрибуттары)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="1,3,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Мәні

|
`user_id`
|Бұлттық платформаның Keycloak жүйесіндегі сервистік пайдаланушы идентификаторы
|
Провайдерден

|
`password`
|Бұлттық платформаның Keycloak жүйесіндегі сервистік пайдаланушының құпиясөзі. Сезімтал деректерді қамтиды
|
Мониторинг агентін орнату кезінде генерацияланады

|
`project_id`
|Бұлттық платформаның жобасының идентификаторы (OpenStack PID)
|
Провайдерден

|
`auth_url`
|Бұлттық платформадағы авторизация URL-адресі
|
`https://infra.mail.ru/infra/identity/v3/`

|
`namespace`
|Cloud Monitoring сервисіндегі namespace
|
`mcs/vm`

|
`endpoint`
|Метрикаларды Cloud Monitoring жүйесіне жіберу үшін арналған URL-адрес
|
`monitoring.mcs.mail.ru:443`
|===
{/caption}

{caption(`ivkcs_monitoring_user` дереккөзінің мысалы)[align=left;position=above]}
```hcl
data "ivkcs_monitoring_user" "write" {}
```
{/caption}