# {heading(Подключение к экземпляру сервиса)[id=clickhouse_connect]}

Подключиться к экземпляру сервиса Cloud ClickHouse можно с помощью `clickhouse-client` и сторонних клиентов, например DBeaver. В инструкции приведен пример подключения через `clickhouse-client`.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Подключение через clickhouse-client)[id=clickhouse_connect-clickhouse-client]}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса.
1. На странице экземпляра перейдите на вкладку **Общая информация**.
1. Скопируйте URL-адрес, указанный в поле **Строка подключения по TCP с TLS**.
1. Откройте терминал.
1. Выполните команду для подключения к Cloud ClickHouse:

   ```console
   $ clickhouse-client \
      --host=<ХОСТ> \
      --port=<ПОРТ> \
      --user='<ЛОГИН>' \
      --password='<ПАРОЛЬ>' \
      --secure \
      --accept-invalid-certificate
   ```

   Здесь:

   - `<ХОСТ>` — хост из строки подключения по TCP с TLS;
   - `<ПОРТ>` — порт из строки подключения по TCP с TLS;
   - `<ЛОГИН>` — логин учетной записи Cloud ClickHouse;
   - `<ПАРОЛЬ>` — пароль учетной записи Cloud ClickHouse.

   {include(../../../_includes/_connect.md)[tags=curl-insecure]}

## {heading(Проверка подключения)[id=clickhouse_connect-check]}

После подключения выполните тестовый запрос:

```console
$ SELECT version();
```

В результате выполнения запроса вернется версия Cloud ClickHouse.