# {heading(Подключение к экземпляру сервиса)[id=opensearch_connect]}

Подключиться к экземпляру сервиса OpenSearch можно с помощью веб-интерфейса, curl и сторонних клиентов.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Подключение через веб-интерфейс)[id=opensearch_connect-ui]}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса.
1. На странице экземпляра перейдите на вкладку **Общая информация**.
1. Перейдите по ссылке, указанной в поле **Opensearch UI**.

   {include(../../../_includes/_connect.md)[tags=browser-warning]}

1. В зависимости от браузера: 

   {include(../../../_includes/_connect.md)[tags=browsers-action]}
   
1. Введите логин и пароль учетной записи OpenSearch.
1. Нажмите **Log In**.

## {heading(Подключение через curl)[id=opensearch_connect-curl]}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса.
1. На странице экземпляра перейдите на вкладку **Общая информация**.
1. Скопируйте URL-адрес, указанный в поле **Opensearch API**.
1. Откройте терминал.
1. Выполните команду:

   ```console
   curl --insecure -u <ЛОГИН>:<ПАРОЛЬ> <OPENSEARCH_API_URL>
   ```

   Здесь:
   
   - `<ЛОГИН>` — логин учетной записи OpenSearch;
   - `<ПАРОЛЬ>` — пароль учетной записи OpenSearch;
   - `<OPENSEARCH_API_URL>` — скопированный URL-адрес Opensearch API.

   {include(../../../_includes/_connect.md)[tags=curl-insecure]}
