# {heading(Жергілікті PostgreSQL-ден миграция)[id=dbaas-db-migration]}

{include(/kz/_includes/_translated_by_ai.md)}

VK Cloud сыртқы ДББЖ-ден Cloud Databases сервисіне [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) және [pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html) дамп құралдарының көмегімен миграцияны қолдайды.

Деректерді келесі дереккөзден көшіру қарастырылады:

- дерекқор: PostgreSQL 13 нұсқасы;
- ДБ атауы: `PostgreSQL-7313`;
- IP-мекенжайы: `224.224.209.224`, `5432` порты;
- деректері бар `test-db` ДБ кестесі:

  ```txt
   id | name | number
  ----+------+--------
    1 | a    |  1
    2 | b    |  2
    3 | c    |  3
  ```

Қабылдаушы ретінде VK Cloud жобасында жайылған, {linkto(../../concepts/work-configs#dbaas-work-configs)[text=конфигурация түрі]} Single болатын ДБ инстансы пайдаланылады.

Нұсқаулықтағы барлық әрекеттерді жергілікті машинадан орындау қажет.

{note:warn}

Миграция кезінде дереккөз кластері мен қабылдаушы кластерде мыналар сәйкес келуі тиіс:

- PostgreSQL нұсқасы;
- орнатылған {linkto(../../extensions#dbaas-extensions)[text=кеңейтімдер]}.

{/note}

## {heading(Дайындық қадамдары)[id=dbaas-db-migration-prepare]}

1. VK Cloud-та PostgreSQL ДБ инстансын {linkto(../../instructions/create/create-single-replica#dbaas-create-single-replica)[text=жайыңыз]}:

   - ДББЖ нұсқасы: 13;
   - ДБ инстансының атауы: `PostgreSQL-7313`;
   - конфигурация түрі: Single;
   - сыртқы IP: қосу, мысалда `212.212.12.212` қолданылады;
   - пайдаланушы аты: `user`;
   - пайдаланушы құпиясөзі: `AN0r25e0ae4d626p!`.

1. Жергілікті ДБ-да {linkto(../../extensions#dbaas-extensions)[text=кеңейтімдердің]} орнатылғанын тексеріңіз. Жайылған инстанста дәл сондай кеңейтімдер жиынын орнатыңыз.
1. Дереккөз ДБ-дағы `pg_restore` нұсқасы қабылдаушы ДБ-дағы `pg_dump` нұсқасына сәйкес келетініне көз жеткізіңіз.

## {heading(1. Дереккөз ДБ дампын жасаңыз)[id=dbaas-db-migration-create-dump]}

1. Дереккөз ДБ-ға `postgres` пайдаланушысы атынан қосылыңыз:

   ```sql
   psql -h 224.224.209.224 -p 5432 -U postgres -d PostgreSQL-7313
   ```

1. `PostgreSQL-7313` ДБ-сын «тек оқу» режиміне ауыстырыңыз:

   ```console
   alter database "PostgreSQL-7313" set default_transaction_read_only=on;
   ```

1. `exit` командасының көмегімен ДБ-дан ажыраңыз.
1. Команда арқылы дамп жасаңыз:

   ```console
   pg_dump --host=224.224.209.224 --port=5432 --username=user --format=c --dbname=PostgreSQL-7313 --file=db_dump
   ```

   Операцияның аяқталуын күтіңіз — `db_dump` файлы жасалады.

1. ДБ-ға қайта қосылып, оны «тек оқу» режимінен шығарыңыз:

   ```console
   psql -h 224.224.209.224 -p 5432 -U postgres -d PostgreSQL-7313
   set default_transaction_read_only=off;
   alter database "PostgreSQL-7313" set default_transaction_read_only=off;
   ```

## {heading(2. Дамптан деректерді қабылдаушы ДБ-ға қалпына келтіріңіз)[id=dbaas-db-migration-restore]}

1. (Қосымша) Қабылдаушы ДББЖ-де `PostgreSQL-7313` ДБ-сы жасалғанына көз жеткізіңіз:

   1. `postgres` пайдаланушысы атынан `PostgreSQL-7313` ДБ-сына қосылыңыз:

      ```console
      psql -h 212.212.12.212 -p 5432 -U postgres -d PostgreSQL-7313
      ```

   1. Команданы орындаңыз:

      ```console
      CREATE DATABASE "PostgreSQL-7313";
      ```

      - Егер ДБ бұрын жасалмаған болса, `CREATE DATABASE` хабарламасы пайда болады.
      - Егер ДБ жасалған болса, `ERROR: database "PostgreSQL-7313" already exists` хабарламасы пайда болады.

1. Дереккөз ДБ-ның дампын келесі команда арқылы қалпына келтіріңіз:

   ```console
   pg_restore --host=212.212.12.212 --username=user --dbname=PostgreSQL-7313 --port=5432 --verbose db_dump --single-transaction --no-privileges
   ```

1. Пайда болған жолда `user` пайдаланушысы үшін `AN0r25e0ae4d626p!` құпиясөзін енгізіңіз.

   {cut(Команданың күтілетін шығысы)}

      ```console
       pg_restore: creating TABLE "public.test-db"
       pg_restore: creating SEQUENCE "public.test-db_id_seq"
       pg_restore: creating SEQUENCE OWNED BY "public.test-db_id_seq"
       pg_restore: creating SEQUENCE "public.test-db_number_seq"
       pg_restore: creating SEQUENCE OWNED BY "public.test-db_number_seq"
       pg_restore: creating DEFAULT "public.test-db id"
       pg_restore: processing data for table "public.test-db"
       pg_restore: executing SEQUENCE SET test-db_id_seq
       pg_restore: executing SEQUENCE SET test-db_number_seq
       pg_restore: creating CONSTRAINT "public.test-db test-db_pkey"
       ```

   {/cut}

## {heading(3. VK Cloud-та жүктелген деректерді тексеріңіз)[id=dbaas-db-migration-check-data]}

1. Қабылдаушы инстанстағы `PostgreSQL-7313` ДБ-сына `user` пайдаланушысы атынан қосылыңыз:

   ```console
   psql -h 212.212.12.212 -p 5432 -U user -d PostgreSQL-7313
   ```

1. ДБ кестелерінің тізімін шығарыңыз:

   ```sql
   \dt
   ```

   Деректер сәтті көшірілген болса, `test-db` кестесі көрсетіледі:

   ```txt
   List of relations
    Schema |  Name   | Type  | Owner
   --------+---------+-------+-------
    public | test-db | table | user
   (1 row)
   ```

1. `test-db` кестесінің деректерін келесі команда арқылы шығарыңыз:

   ```sql
   SELECT * FROM public."test-db";
   ```

   Егер деректер сәтті көшірілсе, келесі жолдар көрсетіледі:

   ```txt
    id | name | number
   ----+------+--------
     1 | a    |      1
     2 | b    |      2
     3 | c    |      3
   (3 rows)
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=dbaas-db-migration-delete-resources]}

Жайылған ДБ инстансы {linkto(../../tariffication#dbaas-tariffication)[text=тарифтеледі]} және есептеу ресурстарын тұтынады. Егер ол енді қажет болмаса:

- ДБ инстансын {linkto(../../instructions/manage-instance/postgresql#dbaas-postgresql-disk-delete)[text=жойыңыз]}.
- Қажет болса, ДБ инстансына тағайындалған Floating IP мекенжайын [жойыңыз](../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete).
