# {heading(Миграция из локальной PostgreSQL)[id=dbaas-db-migration]}

{var(cloud)} поддерживает миграцию из внешних СУБД в сервис Cloud Databases с помощью инструментов дампа [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) и [pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html).

Будет рассмотрена миграция данных из источника:

- база данных: PostgreSQL версии 13;
- имя БД: `PostgreSQL-7313`;
- IP-адрес: `224.224.209.224`, порт `5432`;
- таблица БД `test-db` с данными:

  ```txt
   id | name | number
  ----+------+--------
    1 | a    |  1
    2 | b    |  2
    3 | c    |  3
  ```

Приемником станет инстанс БД с {linkto(../../concepts/work-configs#dbaas-work-configs)[text=типом конфигурации]} Single, развернутый в проекте {var(cloud)}.

Все действия инструкции необходимо выполнить с локальной машины.

{note:warn}
При миграции у кластера-источника и кластера-приемника должны совпадать:

- версия PostgreSQL;
- установленные {linkto(../../extensions#dbaas-extensions)[text=расширения]}.
{/note}

## {heading(Подготовительные шаги)[id=dbaas-db-migration-prepare]}

1. {linkto(../../instructions/create/create-single-replica#dbaas-create-single-replica)[text=Разверните]} в {var(cloud)} инстанс БД PostgreSQL:

   - версия СУБД: 13;
   - название инстанса БД: `PostgreSQL-7313`;
   - тип конфигурации: Single;
   - внешний IP: добавить, в примере будет использоваться `212.212.12.212`;
   - имя пользователя: `user`;
   - пароль пользователя: `AN0r25e0ae4d626p!`.

1. Проверьте, установлены ли {linkto(../../extensions#dbaas-extensions)[text=расширения]} на локальной БД. Установите тот же набор расширений в развернутом инстансе.
1. Убедитесь, что версия `pg_restore` БД-источника совпадает с версией `pg_dump` БД-приемника.

## {heading(1. Создайте дамп БД-источника)[id=dbaas-db-migration-create-dump]}

1. Подключитесь к БД-источнику под пользователем `postgres`:

   ```sql
   psql -h 224.224.209.224 -p 5432 -U postgres -d PostgreSQL-7313
   ```

1. Переведите БД `PostgreSQL-7313` в режим «только чтение»:

   ```console
   alter database "PostgreSQL-7313" set default_transaction_read_only=on;
   ```

1. Отключитесь от БД с помощью команды `exit`.
1. Создайте дамп с помощью команды:

   ```console
   pg_dump --host=224.224.209.224 --port=5432 --username=user --format=c --dbname=PostgreSQL-7313 --file=db_dump
   ```

   Дождитесь завершения операции — будет создан файл `db_dump`.

1. Повторно подключитесь к БД и выведите ее из режима «только чтение»:

   ```console
   psql -h 224.224.209.224 -p 5432 -U postgres -d PostgreSQL-7313
   set default_transaction_read_only=off;
   alter database "PostgreSQL-7313" set default_transaction_read_only=off;
   ```

## {heading(2. Восстановите данные из дампа в БД-приемник)[id=dbaas-db-migration-restore]}

1. (Опционально) Убедитесь, что в СУБД-приемнике создана БД `PostgreSQL-7313`:

   1. Подключитесь к БД `PostgreSQL-7313` под пользователем `postgres`:

      ```console
      psql -h 212.212.12.212 -p 5432 -U postgres -d PostgreSQL-7313
      ```

   1. Выполните команду:

      ```console
      CREATE DATABASE "PostgreSQL-7313";
      ```

      - Если БД не была создана ранее, появится сообщение `CREATE DATABASE`.
      - Если БД создана, появится сообщение `ERROR: database "PostgreSQL-7313" already exists`.

1. Восстановите дамп БД-источника с помощью команды:

   ```console
   pg_restore --host=212.212.12.212 --username=user --dbname=PostgreSQL-7313 --port=5432 --verbose db_dump --single-transaction --no-privileges
   ```

1. В появившейся строке введите пароль `AN0r25e0ae4d626p!` для пользователя `user`.

   {cut(Ожидаемый вывод команды)}

      ```console
       pg_restore: creating TABLE "public.test-db"
       pg_restore: creating SEQUENCE "public.test-db_id_seq"
       pg_restore: creating SEQUENCE OWNED BY "public.test-db_id_seq"
       pg_restore: creating SEQUENCE "public.test-db_number_seq"
       pg_restore: creating SEQUENCE OWNED BY "public.test-db_number_seq"
       pg_restore: creating DEFAULT "public.test-db id"
       pg_restore: creating DEFAULT "public.test-db number"
       pg_restore: processing data for table "public.test-db"
       pg_restore: executing SEQUENCE SET test-db_id_seq
       pg_restore: executing SEQUENCE SET test-db_number_seq
       pg_restore: creating CONSTRAINT "public.test-db test-db_pkey"
       ```

   {/cut}

## {heading(3. Проверьте загруженные данные в {var(cloud)})[id=dbaas-db-migration-check-data]}

1. Подключитесь к БД `PostgreSQL-7313` в инстансе-приемнике под пользователем `user`:

   ```console
   psql -h 212.212.12.212 -p 5432 -U user -d PostgreSQL-7313
   ```

1. Выведите список таблиц БД:

   ```sql
   \dt
   ```

   При успешной миграции данных отобразится таблица `test-db`:

   ```txt
   List of relations
    Schema |  Name   | Type  | Owner
   --------+---------+-------+-------
    public | test-db | table | user
   (1 row)
   ```

1. Выведите данные таблицы `test-db` с помощью команды:

   ```sql
   SELECT * FROM public."test-db";
   ```

   Если данные перенесены успешно, будут выведены строки:

   ```txt
    id | name | number
   ----+------+--------
     1 | a    |      1
     2 | b    |      2
     3 | c    |      3
   (3 rows)
   ```

## {heading(Удалите неиспользуемые ресурсы)[id=dbaas-db-migration-delete-resources]}

Развернутый инстанс БД {linkto(../../tariffication#dbaas-tariffication)[text=тарифицируется]} и потребляет вычислительные ресурсы. Если он вам больше не нужен:

- {linkto(../../instructions/manage-instance/postgresql#dbaas-postgresql-disk-delete)[text=Удалите]} инстанс БД.
- При необходимости [удалите](../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete) Floating IP-адрес, назначенный инстансу БД.