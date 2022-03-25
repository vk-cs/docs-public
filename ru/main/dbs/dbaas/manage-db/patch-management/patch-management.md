Чтобы получить доступ к новым возможностям PostgreSQL, необходимо обновлять версии СУБД. Patch Management позволяет обновить Postgres и Postgres Pro с более младшей на более старшую версию. 

Мы предлагаем 3 варианта конфигурации работы с PostgreSQL. Ниже мы рассмотрим подробнее каждые из них.

## Обновление версии СУБД
Для обновления PostgreSQL необходимо использовать утилиту [pg_upgrade](https://postgrespro.ru/docs/postgresql/13/pgupgrade).

<warn>

Перед обновлением будет сделан backup. Запланируйте процедуру обновления заранее, потому что в момент обновления PostgreSQL будет недоступен.

</warn>

<tabs>
<tablist>
<tab>Single instance</tab>
<tab>Mater + replicas</tab>
<tab>Cluster</tab>
</tablist>
<tabpanel>

Выполните API запрос:
``` bash
curl --location --request PATCH '/v1.0/project_id/instances/instance_id' \
--header 'X-Auth-Token:  <токен пользователя>' \
--header 'Content-Type: application/json' \
-d '{
  "instance":{
      "datastore_version": <id новой версии датастора>
  }
}'
```

</tabpanel>
<tabpanel>

Для обновления реплик на сервера будет установлена новая версия PostgreSQL и данные по средствам репликации будут синхронизированы с мастером.

Выполните API запрос:
``` bash
curl --location --request PATCH '/v1.0/project_id/instances/instance_id' \
--header 'X-Auth-Token:  <токен пользователя>' \
--header 'Content-Type: application/json' \
-d '{
  "instance":{
      "datastore_version": <id новой версии датастора>
  }
}'
```
 
</tabpanel>
<tabpanel>
 
Для обновления реплик будет установлена новая версия СУБД и Patroni синхронизирует данные на них.
 
Выполните API запрос:
``` bash
curl --location --request POST '/v1.0/project_id/clusters/cluster_id' \
--header 'X-Auth-Token: <токен пользователя>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "upgrade": [
      {
          "datastore_version": <id новой версии датастора>
      }
  ]
}'
```
 
</tabpanel>
</tabs>