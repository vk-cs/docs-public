Рекомендуется периодически обновлять версии PostgreSQL и PostgresPro для инстансов БД. В новых версиях добавлены новые возможности и исправлены ошибки.

Перед обновлением инстанса БД будет автоматически сделана его резервная копия.

<warn>

В момент обновления инстанс БД будет недоступен. Планируйте обновление заранее.

</warn>

Чтобы обновить инстанс БД PostgreSQL или PostgresPro:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Раскройте меню нужного инстанса и выберите пункт **Обновить БД**.
1. Выберите нужную версию из списка.
1. Нажмите кнопку **Изменить версию**.

</tabpanel>
<tabpanel>

1. [Получите URL для использования API сервиса Trove](/ru/manage/tools-for-using-services/rest-api/endpoints#prosmotr_spiska_endpointov).

   URL имеет вид `https://<эндпоинт API>/<идентификатор проекта>/`.

1. [Получите токен](/ru/manage/tools-for-using-services/rest-api/case-keystone-token) для авторизации запросов к API.

1. Выполните обновление. Процедура обновления зависит от [конфигурации](../../concepts/work-configs/):

   <tabs>
   <tablist>
   <tab>Single и Master-Replica</tab>
   <tab>Кластер</tab>
   </tablist>
   <tabpanel>

   1. Получите список инстансов БД:

      <tabs>
      <tablist>
      <tab>cURL (Linux bash \ macOS zsh)</tab>
      <tab>cURL (Windows PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      curl \
        --request GET \
        --url https://<эндпоинт API>/<идентификатор проекта>/instances \
        --header 'X-Auth-Token: <токен>'
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      curl `
        --request GET `
        --url https://<эндпоинт API>/<идентификатор проекта>/instances `
        --header 'X-Auth-Token: <токен>'
      ```

      </tabpanel>
      </tabs>

   1. Из ответа на запрос к API определите идентификатор инстанса с ролью `Master`. В конфигурации **Master-Replica** обновление всех инстансов выполняется путем обновления инстанса БД с ролью `Master`. Выполнить обновление только для инстансов с ролью `Replica` невозможно.

      Чтобы определить идентификатор такого инстанса:

      1. Найдите инстанс с нужным именем в поле `instances[].name`.
      1. Убедитесь, что это инстанс PostgreSQL, PostgresPro Standard, PostgresPro Enterprise или PostgresPro Enterprise 1C:

         ```json
         {
           "instances": [
             {
               "id": "<идентификатор инстанса>",
               "name": "<имя инстанса>",
               ...
               "datastore": {
                 "type": "<один из типов СУБД: postgresql, postgrespro, postgrespro_enterprise, postgrespro_enterprise_1c>",
                 "version": "<версия СУБД>"
               },
               ...
             },
           ...]
         }
         ```

      1. Проверьте наличие поля `instances[].replica_of`:

         - Если такое поле есть, то это инстанс с ролью `Replica`, и значение в поле — нужный идентификатор инстанса с ролью `Master`.
         - Если такого поля нет, то это инстанс с ролью `Master`. Запишите идентификатор этого инстанса из поля `instances[].id`.

   1. Из ответа на запрос к API определите версию, на которую можно выполнить обновление. Для этого посмотрите сведения об инстансе с ролью `Master`. Для инстансов с ролью `Replica` информация о возможностях обновления не предоставляется.

      ```json
      {
        "instances": [
          {
            "id": "<идентификатор инстанса с ролью Master>",
            ...
            "datastore": {
              ...,
              "version": "<версия СУБД>"
            },
            ...
            "upgrade_info": {
              "major_version": "<версия, на которую можно обновиться>",
              "minor_versions": []
            },
          },
        ...]
      }
      ```

      Обновление можно выполнить на указанную в поле `instances[].upgrade_info.major_version` версию. Если в поле — пустое значение, то инстанс БД уже использует самую актуальную версию и обновление не требуется.

      При обновлении инстанса БД на несколько версий вперед невозможно пропустить промежуточные версии:

      - можно выполнить обновление PostgreSQL 10 → 11 → 12 → 13 → 14;
      - нельзя выполнить обновление PostgreSQL 10 → 14;

   1. Из ответа на запрос к API найдите все реплики для инстанса с ролью `Master` и, если они есть, получите их идентификаторы. Идентификаторы необходимы, чтобы отслеживать ход обновления для реплик.

      Выполните поиск по идентификатору инстанса с ролью `Master`:

      - Если найдены упоминания этого идентификатора в полях `instances[].replica_of`, то инстансы, в которых есть поля с такими значениями — реплики. Запишите их идентификаторы.

        ```json
        {
           "instances": [
             {
               "id": "<идентификатор инстанса c ролью Replica>",
               ...,
               "replica_of": "<идентификатор инстанса с ролью Master>",
               ...
             },
           ...]
        }
        ```

      - Если упоминания этого идентификатора в полях `instances[].replica_of` не найдены, то реплик нет, и инстанс с таким идентификатором — в конфигурации **Single**. Дополнительных действий не требуется.

   1. Запустите процесс обновления:

      <tabs>
      <tablist>
      <tab>cURL (Linux bash \ macOS zsh)</tab>
      <tab>cURL (Windows PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      curl \
        --request PATCH \
        --url https://<эндпоинт API>/<идентификатор проекта>/instances/<идентификатор инстанса с ролью Master> \
        --header 'X-Auth-Token: <токен>' \
        --data '{
            "instance":
      	    {
      		    "datastore_version": "<версия, на которую нужно обновиться>"
      	    }
         }'
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      curl `
        --request PATCH `
        --url https://<эндпоинт API>/<идентификатор проекта>/instances/<идентификатор инстанса с ролью Master> `
        --header 'X-Auth-Token: <токен>' `
        --data '{
            \"instance\":
      	    {
      		    \"datastore_version\": \"<версия, на которую нужно обновиться>\"
      	    }
         }'
      ```

      </tabpanel>
      </tabs>

      Начнется обновление, процесс может занять длительное время.

   1. Периодически проверяйте ход обновления для отдельных инстансов с ролью `Master` или `Replica` (при наличии):

      <tabs>
      <tablist>
      <tab>cURL (Linux bash \ macOS zsh)</tab>
      <tab>cURL (Windows PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      curl \
        --request GET \
        --url https://<эндпоинт API>/<идентификатор проекта>/instances/<идентификатор инстанса> \
        --header 'X-Auth-Token: <токен>'
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      curl `
        --request GET `
        --url https://<эндпоинт API>/<идентификатор проекта>/instances/<идентификатор инстанса> `
        --header 'X-Auth-Token: <токен>'
      ```

      </tabpanel>
      </tabs>

      Во время обновления значение поля `instance.status` будет последовательно изменяться на `BACKUP`, `UPGRADE`.

      После завершения обновления:

      - В поле `instance.status` значение изменится на `ACTIVE`.
      - В поле `instance.last_task_result` появится информация о результате последней выполненной операции. Значение при успешном обновлении — `MAJOR_UPGRADE_COMPLETED`.

   </tabpanel>
   <tabpanel>

   1. Получите список кластеров БД:

      <tabs>
      <tablist>
      <tab>cURL (Linux bash \ macOS zsh)</tab>
      <tab>cURL (Windows PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      curl \
        --request GET \
        --url https://<эндпоинт API>/<идентификатор проекта>/clusters \
        --header 'X-Auth-Token: <токен>'
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      curl `
        --request GET `
        --url https://<эндпоинт API>/<идентификатор проекта>/clusters `
        --header 'X-Auth-Token: <токен>'
      ```

      </tabpanel>
      </tabs>

   1. Из ответа на запрос к API определите идентификатор кластера, который нужно обновить, и версию, до которой можно обновить кластер:

      ```json
      {
        "clusters": [
          {
            "id": "<идентификатор кластера>",
            "name": "<имя кластера>",
            ...
            "datastore": {
              "type": "<один из типов СУБД: postgresql, postgrespro_enterprise, postgrespro_enterprise_1c>",
              "version": "<версия СУБД>"
            },
            ...
            "upgrade_info": {
              "major_version": "<версия, на которую нужно обновиться>",
              "minor_versions": []
            },
            ...
          },
        ...]
      }
      ```

      Обновление можно выполнить на указанную в поле `clusters[].upgrade_info.major_version` версию. Если в поле — пустое значение, то кластер БД уже использует самую актуальную версию и обновление не требуется.

      При обновлении кластера БД на несколько версий вперед невозможно пропустить промежуточные версии:

      - можно выполнить обновление PostgreSQL 10 → 11 → 12 → 13 → 14;
      - нельзя выполнить обновление PostgreSQL 10 → 14;

   1. Запустите процесс обновления кластера БД:

      <tabs>
      <tablist>
      <tab>cURL (Linux bash \ macOS zsh)</tab>
      <tab>cURL (Windows PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      curl \
        --request POST \
        --url https://<эндпоинт API>/<идентификатор проекта>/clusters/<идентификатор кластера> \
        --header 'Content-Type: application/json' \
        --header 'X-Auth-Token: <токен>' \
        --data '{
      	    "datastore_upgrade":
      		    {
      			    "datastore_version": "<версия, на которую можно обновиться>"
      		    }
          }'
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      curl \
        --request POST `
        --url https://<эндпоинт API>/<идентификатор проекта>/clusters/<идентификатор кластера> `
        --header 'Content-Type: application/json' `
        --header 'X-Auth-Token: <токен>' `
        --data '{
      	    \"datastore_upgrade\":
      		    {
      			    \"datastore_version\": \"<версия, на которую можно обновиться>\"
      		    }
          }'
      ```

      </tabpanel>
      </tabs>

      Начнется обновление, процесс может занять длительное время.

   1. Периодически проверяйте ход обновления, запрашивая подробную информацию об обновляемом кластере БД:

      <tabs>
      <tablist>
      <tab>cURL (Linux bash \ macOS zsh)</tab>
      <tab>cURL (Windows PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      curl \
        --request GET \
        --url https://<эндпоинт API>/<идентификатор проекта>/clusters/<идентификатор кластера> \
        --header 'X-Auth-Token: <токен>'
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      curl `
        --request GET `
        --url https://<эндпоинт API>/<идентификатор проекта>/clusters/<идентификатор кластера> `
        --header 'X-Auth-Token: <токен>'
      ```

      </tabpanel>
      </tabs>

      Во время обновления:

      - В поле `cluster.task.name` будет значение `UPGRADING_CLUSTER`.
      - В поле `cluster.instances[].status` инстансы кластера будут последовательно изменять свой статус на `BACKUP`, `UPGRADE`.

      После завершения обновления:

      - В поле `cluster.task.name` будет значение `NONE`.
      - В поле `cluster.last_task_result` появится информация о результате последней выполненной операции. Значение при успешном обновлении — `MAJOR_UPGRADE_COMPLETED`.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>
