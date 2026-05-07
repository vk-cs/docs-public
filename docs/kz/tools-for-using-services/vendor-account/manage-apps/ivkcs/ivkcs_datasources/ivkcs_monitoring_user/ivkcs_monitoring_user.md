# {heading(ivkcs_monitoring_user деректер көзі)[id=ivkcs_monitoring_user]}

{include(/kz/_includes/_translated_by_ai.md)}

`ivkcs_monitoring_user` деректер көзі {linkto(#tab_attributes)[text=%number кестеде]} келтірілген атрибуттарды қайтарады. Атрибуттар метрикаларды Cloud Monitoring сервисіне жіберу үшін мониторинг агентінің output-плагинін (Telegraf) баптауға мүмкіндік береді (толығырақ — [Бұлтты платформаның Cloud Monitoring сервисімен интеграция](../../../ib_cloud_monitoring) бөлімінде).

{caption({counter(table)[id=numb_tab_attributes]} кесте — ivkcs_monitoring_user деректер көзінің атрибуттары)[align=right;position=above;id=tab_attributes;number={const(numb_tab_attributes)}]}
[cols="1,3,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Мәні

|
`user_id`
|Бұлтты платформаның Keycloak жүйесіндегі сервистік пайдаланушының идентификаторы
|
Провайдерден

|
`password`
|Бұлтты платформаның Keycloak жүйесіндегі сервистік пайдаланушының құпиясөзі. Сезімтал деректерді қамтиды
|
Мониторинг агентін орнату кезінде генерацияланады

|
`project_id`
|Бұлтты платформаның жоба идентификаторы (OpenStack PID)
|
Провайдерден

|
`auth_url`
|Бұлтты платформадағы авторизацияның URL мекенжайы
|
`https://infra.mail.ru:5000/v3/`

|
`namespace`
|Cloud Monitoring сервисіндегі Namespace
|
`mcs/vm`

|
`endpoint`
|Cloud Monitoring сервисіне метрикаларды жіберуге арналған URL мекенжайы
|
`monitoring.mcs.mail.ru:443`
|===
{/caption}

{caption(`ivkcs_monitoring_user` деректер көзінің мысалы)[align=left;position=above]}
```hcl
data "ivkcs_monitoring_user" "write" {}
```
{/caption}
