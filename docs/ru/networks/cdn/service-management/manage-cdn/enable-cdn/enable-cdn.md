Oпция **Доступ к контенту конечным пользователям** влияет на доступность CDN-ресурса:

- Если опция отключена, то CDN-ресурс переходит в состояние `Приостановлен` и контент не доставляется [потребителям](../../../concepts/about/).
- Если опция включена, то CDN-ресурс переходит в состояние `Активен` и контент доставляется потребителям.

Чтобы включить CDN-ресурс:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open-cdn.md)}

1. Перейдите на вкладку **Основные настройки**.
1. Включите опцию **Доступ к контенту конечным пользователям**.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
<tabpanel>

{include(/ru/_includes/_api_cdn_create_change.md)}

В теле запроса в параметре `active` пропишите значение:

- `true` — ресурс активен, контент передается;
- `false` — ресурс приостановлен, контент не передается.

Пример запроса для приостановки CDN-ресурса:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "active": false
}'
```

</tabpanel>
</tabs>
