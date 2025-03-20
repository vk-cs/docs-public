VK Cloud поддерживает миграцию из внешних СУБД в сервис Cloud Databases с помощью инструментов дампа [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) и [pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html).

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

Приемником станет инстанс БД с [типом конфигурации](../../concepts/work-configs/) Single, развернутый в проекте VK Cloud.

Все действия инструкции необходимо выполнить с локальной машины.

<warn>

При миграции у кластера-источника и кластера-приемника должны совпадать:

- версия PostgreSQL;
- установленные [расширения](../../extensions/).

</warn>

## Подготовительные шаги

1. [Разверните](../../service-management/create/create-single-replica/) в VK Cloud инстанс БД PostgreSQL:

   - версия СУБД: 13;
   - название инстанса БД: `PostgreSQL-7313`;
   - тип конфигурации: Single;
   - внешний IP: добавить, в примере будет использоваться `212.212.12.212`;
   - имя пользователя: `user`;
   - пароль пользователя: `AN0r25e0ae4d626p!`.

1. Проверьте, установлены ли [расширения](../../extensions/) на локальной БД. Установите тот же набор расширений в развернутом инстансе.
1. Убедитесь, что версия `pg_restore` БД-источника совпадает с версией `pg_dump` БД-приемника.

## 1. Создайте дамп БД-источника

1. Подключитесь к БД-источнику под пользователем `postgres`:

   ```sql
   psql -h 224.224.209.224 -p 5432 -U postgres -d PostgreSQL-7313
   ```

1. Переведите БД `PostgreSQL-7313` в режим «только чтение»:

   ```bash
   alter database "PostgreSQL-7313" set default_transaction_read_only=on;
   ```

1. Отключитесь от БД с помощью команды `exit`.
1. Создайте дамп с помощью команды:

   ```bash
   pg_dump --host=224.224.209.224 --port=5432 --username=user --format=c --dbname=PostgreSQL-7313 --file=db_dump
   ```

   Дождитесь завершения операции — будет создан файл `db_dump`.

1. Повторно подключитесь к БД и выведите ее из режима «только чтение»:

   ```bash
   psql -h 224.224.209.224 -p 5432 -U postgres -d PostgreSQL-7313
   set default_transaction_read_only=off;
   alter database "PostgreSQL-7313" set default_transaction_read_only=off;
   ```

## 2. Восстановите данные из дампа в БД-приемник

1. (Опционально) Убедитесь, что в СУБД-приемнике создана БД `PostgreSQL-7313`:

   1. Подключитесь к БД `PostgreSQL-7313` под пользователем `postgres`:

      ```bash
      psql -h 212.212.12.212 -p 5432 -U postgres -d PostgreSQL-7313
      ```

   1. Выполните команду:

      ```bash
      CREATE DATABASE "PostgreSQL-7313";
      ```

      - Если БД не была создана ранее, появится сообщение `CREATE DATABASE`.
      - Если БД создана, появится сообщение `ERROR: database "PostgreSQL-7313" already exists`.

1. Восстановите дамп БД-источника с помощью команды:

   ```bash
   pg_restore --host=212.212.12.212 --username=user --dbname=PostgreSQL-7313 --port=5432 --verbose db_dump --single-transaction --no-privileges
   ```

1. В появившейся строке введите пароль `AN0r25e0ae4d626p!` для пользователя `user`.

   <details>
       <summary>Ожидаемый вывод команды</summary>

      ```bash
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

   </details>

## 3. Проверьте загруженные данные в VK Cloud

1. Подключитесь к БД `PostgreSQL-7313` в инстансе-приемнике под пользователем `user`:

   ```bash
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

## Удалите неиспользуемые ресурсы

Развернутый инстанс БД [тарифицируется](../../tariffication/) и потребляет вычислительные ресурсы. Если он вам больше не нужен:

- [Удалите](../../service-management/manage-instance/postgresql#uvelichenie_razmera_diska_s_dannymi) инстанс БД.
- При необходимости [удалите](/ru/networks/vnet/service-management/floating-ip#udalenie_plavayushchego_ip_adresa_iz_proekta) плавающий IP-адрес, назначенный инстансу БД.
