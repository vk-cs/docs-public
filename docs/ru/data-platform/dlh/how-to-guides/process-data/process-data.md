После развертывания базовой архитектуры Data Lakehouse следующий шаг — наполнение сервиса данными и их анализ. В этой инструкции рассматриваются примеры загрузки в Data Lakehouse данных из трех различных источников и выполнения SQL-запросов для анализа загруженных данных. Все манипуляции с данными выполняются путем SQL-запросов во внешние системы с помощью Cloud Trino.

Пройдя все шаги инструкции, вы узнаете:

- как загружать в Data Lakehouse данные из различных внешних источников: БД PostgreSQL, БД MySQL, а также из виртуальной БД из базовой поставки Cloud Trino;
- как при помощи Cloud Trino выполнять SQL-запросы для анализа, обработки и трансформации данных, загруженных в Data Lakehouse;
- как выгружать данные из Data Lakehouse во внешние БД;
- как при помощи Cloud Trino выполнять гибридные аналитические SQL-запросы одновременно к нескольким источникам данных, включая Data Lakehouse и внешние БД.

## Подготовительные шаги

1. Подготовьте внешние базы данных PostgreSQL и MySQL.

   В качестве примера использованы:

    - БД MySQL `mydb1`, содержащая таблицу `table1` с произвольной структурой;
    - БД PostgreSQL `db1`, содержащая таблицу `table2` с произвольной структурой.

1. [Разверните](../../quick-start) базовую архитектуру сервиса Data Lakehouse.

    В качестве примера в процессе развертывания при [настройке Cloud Trino](../../quick-start#create_trino_instance) созданы:

    - подключение `s3db1` к хранилищу S3 VK Cloud;
    - подключение `pgdb1` к БД PostgreSQL `db1`;
    - подключение `mysqldb1` к БД MySQL `mydb1`.

    После развертывания Cloud Trino в конфигурацию автоматически добавляются два подключения к виртуальным БД для генерации наборов синтетических данных большого объема и тестирования: [tpcds](https://trino.io/docs/current/connector/tpcds.html) и [tpch](https://trino.io/docs/current/connector/tpch.html). В примере используется подключение tpcds, а для запросов к виртуальной БД — одна из доступных в ней схем данных `sf10`.

    Для запросов к БД PostgreSQL в примере используется стандартная схема данных `public`.

1. Установите на ваш компьютер любой SQL-клиент для отправки запросов в Cloud Trino. Далее все запросы выполняются в SQL-клиенте.

## 1. Создайте схемы данных в хранилище S3

1. Создайте схему `sch1` для загрузки данных из внешних БД MySQL и PostgreSQL:

    ```sql

    CREATE SCHEMA s3db1.sch1;

    ```

1. Создайте схему данных `sch2` для хранения результатов вычислений:

    ```sql

    CREATE SCHEMA s3db1.sch2;

    ```

1. Укажите схему данных, которая будет использоваться для загрузки данных из виртуальной БД:

    ```sql

    CREATE SCHEMA s3db1.sf10;

    ```

Ожидаемый результат: в SQL-клиенте отображается сообщение об успешном создании новых схем данных.

Информация о каждой схеме хранилища S3 хранится в сервисе Cloud Iceberg Metastore, пока не создана первая таблица в этой схеме (через команду `CREATE TABLE`).

Как только будет создана первая таблица, Cloud Iceberg Metastore создаст в хранилище S3 директорию и сохранит в ней информацию:

- табличные данные в формате PARQUET;
- метаданные в формате JSON;
- дополнительные файлы, статистика и т.д.

## 2. Загрузите данные из внешних баз данных в хранилище S3

1. Запросите данные из таблицы `table1` внешней БД MySQL и загрузите их в новую таблицу `table1_from_mysql` в схеме `sch1` хранилища S3:

    ```sql

    CREATE TABLE s3db1.sch1.table1_from_mysql AS
    SELECT * FROM mysqldb1.mydb1.table1; 

    ```

1. Запросите данные из таблицы `table2` внешней БД PostgreSQL и загрузите их в новую таблицу `table2_from_pg` в схеме `sch1` хранилища S3:

    ```sql

    CREATE TABLE s3db1.sch1.table2_from_pg AS
    SELECT * FROM pgdb1.public.table2;

    ```

Ожидаемый результат: в SQL-клиенте отображается сообщение об успешном создании новых таблиц.

## 3. Загрузите данные из таблиц виртуальной БД в хранилище S3

Запросите данные из нескольких таблиц виртуальной БД (`customer`, `store`, `store_sales`, `store_returns`) и загрузите их в одноименные новые таблицы в схеме `sf10` хранилища S3:

```sql

CREATE TABLE s3db1.sf10.customer AS 
	SELECT * FROM tpcds.sf10.customer

CREATE TABLE s3db1.sf10.store AS 
	SELECT * FROM tpcds.sf10.store

CREATE TABLE s3db1.sf10.store_sales AS 
	SELECT * FROM tpcds.sf10.store_sales

CREATE TABLE s3db1.sf10.store_returns AS 
	SELECT * FROM tpcds.sf10.store_returns

```

Ожидаемый результат: в SQL-клиенте отображается сообщение об успешном создании новых таблиц.

## 4. Выполните аналитический запрос к хранилищу S3

Цель анализа — выявление клиентов с подозрительно высоким уровнем возвратов (больше, чем их покупки), что может указывать на мошенничество или проблемы с качеством товаров.

Данные для анализа загружены в схему `sf10` хранилища S3 на предыдущем шаге:

- таблица `customer` — данные о клиентах;
- таблица `store` — данные о магазинах;
- таблицы `store_sales` и `store_returns` — данные о продажах и возвратах.

Для проведения анализа выполните SQL-запрос:

```sql

CREATE TABLE s3db1.sch2.analysis_from_s3 AS
 WITH sales AS (
   SELECT c.c_customer_sk
    ,c.c_first_name
    ,c.c_last_name
    ,c.c_email_address
    ,SUM(ss.ss_coupon_amt) AS coupon
    ,SUM(ss.ss_sales_price) AS salesprice
    ,SUM(ss.ss_ext_discount_amt) AS discount
   FROM s3db1.sf10.customer c
   JOIN s3db1.sf10.store_sales ss ON ss.ss_customer_sk = c.c_customer_sk
   JOIN s3db1.sf10.store s ON s.s_store_sk = ss.ss_store_sk
   GROUP BY c.c_customer_sk
    ,c.c_first_name
    ,c.c_last_name
    ,c.c_email_address
   )
  ,storereturns AS (
   SELECT c.c_customer_sk
    ,SUM(sr.sr_return_amt) AS returnamout
    ,SUM(sr.sr_fee) AS fee
   FROM s3db1.sf10.customer c
   JOIN s3db1.sf10.store_returns sr ON sr.sr_customer_sk = c.c_customer_sk
   JOIN s3db1.sf10.store s ON s.s_store_sk = sr.sr_store_sk
   GROUP BY c.c_customer_sk
   )
SELECT ss.c_customer_sk
 ,ss.c_first_name
 ,ss.c_last_name
 ,ss.c_email_address
 ,ss.salesprice
 ,ss.discount
 ,sr.returnamout
 ,sr.fee
FROM sales ss
JOIN storereturns sr ON ss.c_customer_sk = sr.c_customer_sk
WHERE ss.salesprice < sr.returnamout
ORDER BY ss.discount DESC limit 10

```

Cloud Trino выполняет SQL-запрос в следующем порядке:

1. Составляет план выполнения SQL-запроса.
1. Через API сервиса Iceberg Metastore получает доступ к таблицам хранилища S3 в схеме `sf10`, куда ранее была записана информация из виртуальной БД.
1. В соответствии с планом выполнения читает и обрабатывает данные: применяет указанные в запросе фильтры и критерии группировки, вычисляет агрегаты и т.д.
1. В результате обработки данных формирует список клиентов со связанными объектами, который удовлетворяет SQL-запросу.
1. Записывает результирующую выборку данных в виде новой таблицы `analysis_from_s3` в схеме `sch2` хранилища S3.

Ожидаемый результат: в SQL-клиенте отображаются 10 записей о клиентах с подозрительно высоким уровнем возвратов, получивших наибольшие скидки.

## 5. Выгрузите данные из хранилища S3 во внешние базы данных

1. Запросите данные из таблицы `customer` в схеме `sf10` хранилища S3 и сохраните их в виде одноименной новой таблицы во внешней БД MySQL.

    ```sql

    CREATE TABLE mysqldb1.mydb1.customer AS
        SELECT * FROM s3db1.sf10.customer;

    ```

1. Запросите данные из таблицы `store` в схеме `sf10` хранилища S3 и сохраните их в виде одноименной новой таблицы во внешней БД PostgreSQL.

    ```sql

    CREATE TABLE pgdb1.public.store AS
        SELECT * FROM s3db1.sf10.store;

    ```

Ожидаемый результат: в SQL-клиенте отображается сообщение об успешном создании новых таблиц.

## 6. Выполните аналитический запрос одновременно к нескольким источникам данных

Цель анализа — выявление клиентов с подозрительно высоким уровнем возвратов (больше, чем их покупки), что может указывать на мошенничество или проблемы с качеством товаров.

Данные для анализа извлекаются одновременно из трех источников:

- данные о клиентах — из таблицы `customer` во внешней БД MySQL;
- данные о магазинах — из таблицы `store` во внешней БД PostgreSQL;
- данные о продажах и возвратах — из таблиц `store_sales` и `store_returns` в схеме `sf10` хранилища S3.

Для проведения анализа выполните SQL-запрос:

```sql
CREATE TABLE s3db1.sch2.analysis_hybrid AS
 WITH sales AS (
   SELECT c.c_customer_sk
    ,c.c_first_name
    ,c.c_last_name
    ,c.c_email_address
    ,SUM(ss.ss_coupon_amt) AS coupon
    ,SUM(ss.ss_sales_price) AS salesprice
    ,SUM(ss.ss_ext_discount_amt) AS discount
   FROM mysqldb1.mydb1.customer c
   JOIN s3db1.sf10.store_sales ss ON ss.ss_customer_sk = c.c_customer_sk
   JOIN pgdb1.public.store s ON s.s_store_sk = ss.ss_store_sk
   GROUP BY c.c_customer_sk
    ,c.c_first_name
    ,c.c_last_name
    ,c.c_email_address
   )
  ,storereturns AS (
   SELECT c.c_customer_sk
    ,SUM(sr.sr_return_amt) AS returnamout
    ,SUM(sr.sr_fee) AS fee
   FROM mysqldb1.mydb1.customer c
   JOIN s3db1.sf10.store_returns sr ON sr.sr_customer_sk = c.c_customer_sk
   JOIN pgdb1.public.store s ON s.s_store_sk = sr.sr_store_sk
   GROUP BY c.c_customer_sk
   )
SELECT ss.c_customer_sk
 ,ss.c_first_name
 ,ss.c_last_name
 ,ss.c_email_address
 ,ss.salesprice
 ,ss.discount
 ,sr.returnamout
 ,sr.fee
FROM sales ss
JOIN storereturns sr ON ss.c_customer_sk = sr.c_customer_sk
WHERE ss.salesprice < sr.returnamout
ORDER BY ss.discount DESC limit 10

```

Cloud Trino выполняет SQL-запрос в следующем порядке:

1. Составляет план выполнения SQL-запроса.
1. Через API сервиса Iceberg Metastore получает доступ к таблицам хранилища S3 в схеме `sf10`, куда ранее была записана информация из виртуальной БД.
1. Отправляет напрямую во внешние БД запросы на получение данных из таблицы `customer` БД MySQL и таблицы `store` БД PostgreSQL.
1. В соответствии с планом выполнения читает и обрабатывает данные: применяет указанные в запросе фильтры и критерии группировки, вычисляет агрегаты и т.д.
1. В результате обработки данных формирует список клиентов со связанными объектами, который удовлетворяет SQL-запросу.
1. Записывает результирующую выборку данных в виде новой таблицы `analysis_from_s3` в схеме `sch2` хранилища S3.

Ожидаемый результат: в SQL-клиенте отображаются 10 записей о клиентах с подозрительно высоким уровнем возвратов, получивших наибольшие скидки.

## Удалите неиспользуемые ресурсы

Развернутая ранее инфраструктура сервиса Data Lakehouse потребляет вычислительные ресурсы и тарифицируется. Если она вам больше не нужна, удалите ее.
