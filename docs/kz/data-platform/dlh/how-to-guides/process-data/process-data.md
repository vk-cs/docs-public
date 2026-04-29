{include(/kz/_includes/_translated_by_ai.md)}

Data Lakehouse базалық архитектурасын өрістеткеннен кейінгі келесі қадам — сервисті деректермен толтыру және оларды талдау. Бұл нұсқаулықта үш түрлі көзден деректерді Data Lakehouse-қа жүктеу және жүктелген деректерді талдау үшін SQL-сұрауларды орындау мысалдары қарастырылады. Деректермен барлық манипуляциялар сыртқы жүйелерге Cloud Trino көмегімен SQL-сұраулар жіберу арқылы орындалады.

Нұсқаулықтың барлық қадамдарын орындағаннан кейін сіз мыналарды білесіз:

- PostgreSQL ДҚ, MySQL ДҚ, сондай-ақ Cloud Trino базалық жеткізіліміне кіретін виртуалды ДҚ сияқты түрлі сыртқы көздерден деректерді Data Lakehouse-қа қалай жүктеу керектігін;
- Data Lakehouse-қа жүктелген деректерді талдау, өңдеу және түрлендіру үшін Cloud Trino көмегімен SQL-сұрауларды қалай орындау керектігін;
- Data Lakehouse-тан деректерді сыртқы ДҚ-ларға қалай экспорттау керектігін;
- Data Lakehouse пен сыртқы ДҚ-ларды қоса алғанда, бірнеше деректер көзіне бір уақытта гибридті аналитикалық SQL-сұрауларды Cloud Trino көмегімен қалай орындау керектігін.

## Дайындық қадамдары

1. PostgreSQL және MySQL сыртқы деректер қорларын дайындаңыз.

 Мысал ретінде мыналар пайдаланылды:

 - еркін құрылымы бар `mydb1` кестесін қамтитын MySQL `table1` ДҚ;
 - еркін құрылымы бар `db1` кестесін қамтитын PostgreSQL `table2` ДҚ.

1. [Өрістетіңіз](../../quick-start) Data Lakehouse сервисінің базалық архитектурасын.

 Мысал ретінде өрістету барысында [Cloud Trino-ны баптау](../../quick-start#create_trino_instance) кезінде мыналар жасалды:

 - S3 қоймасына `s3db1` қосылымы;
 - PostgreSQL `pgdb1` ДҚ-на `db1` қосылымы;
 - MySQL `mysqldb1` ДҚ-на `mydb1` қосылымы.

 Cloud Trino өрістетілгеннен кейін конфигурацияға автоматты түрде үлкен көлемдегі синтетикалық деректер жиынтықтарын генерациялау және тестілеу үшін виртуалды ДҚ-ларға екі қосылым қосылады: [tpcds](https://trino.io/docs/current/connector/tpcds.html) және [tpch](https://trino.io/docs/current/connector/tpch.html). Мысалда tpcds қосылымы, ал виртуалды ДҚ-ға сұраулар үшін ондағы қолжетімді деректер схемаларының бірі — `sf10` қолданылады.

 PostgreSQL ДҚ-ға сұраулар үшін мысалда стандартты `public` деректер схемасы қолданылады.

1. Cloud Trino-ға сұраулар жіберу үшін компьютеріңізге кез келген SQL-клиентті орнатыңыз. Бұдан әрі барлық сұраулар SQL-клиентте орындалады.

## 1. S3 қоймасында деректер схемаларын жасаңыз

1. MySQL және PostgreSQL сыртқы ДҚ-ларынан деректерді жүктеу үшін `sch1` схемасын жасаңыз:

 ```sql

 CREATE SCHEMA s3db1.sch1;

 ```

1. Есептеу нәтижелерін сақтау үшін `sch2` деректер схемасын жасаңыз:

 ```sql

 CREATE SCHEMA s3db1.sch2;

 ```

1. Виртуалды ДҚ-дан деректерді жүктеу үшін пайдаланылатын деректер схемасын көрсетіңіз:

 ```sql

 CREATE SCHEMA s3db1.sf10;

 ```

Күтілетін нәтиже: SQL-клиентте жаңа деректер схемаларының сәтті жасалғаны туралы хабарлама көрсетіледі.

S3 қоймасының әрбір схемасы туралы ақпарат Cloud Iceberg Metastore сервисінде осы схемада бірінші кесте жасалғанға дейін (`CREATE TABLE` командасы арқылы) сақталады.

Бірінші кесте жасалғаннан кейін Cloud Iceberg Metastore S3 қоймасында директория жасап, онда мына ақпаратты сақтайды:

- PARQUET форматындағы кестелік деректер;
- JSON форматындағы метадеректер;
- қосымша файлдар, статистика және т.б.

## 2. Сыртқы деректер қорларынан деректерді S3 қоймасына жүктеңіз

1. MySQL сыртқы ДҚ-ның `table1` кестесінен деректерді сұратып, оларды S3 қоймасының `table1_from_mysql` схемасындағы `sch1` жаңа кестесіне жүктеңіз:

 ```sql

 CREATE TABLE s3db1.sch1.table1_from_mysql AS
 SELECT * FROM mysqldb1.mydb1.table1; 

 ```

1. PostgreSQL сыртқы ДҚ-ның `table2` кестесінен деректерді сұратып, оларды S3 қоймасының `table2_from_pg` схемасындағы `sch1` жаңа кестесіне жүктеңіз:

 ```sql

 CREATE TABLE s3db1.sch1.table2_from_pg AS
 SELECT * FROM pgdb1.public.table2;

 ```

Күтілетін нәтиже: SQL-клиентте жаңа кестелердің сәтті жасалғаны туралы хабарлама көрсетіледі.

## 3. Виртуалды ДҚ кестелерінен деректерді S3 қоймасына жүктеңіз

Виртуалды ДҚ-ның (`customer`, `store`, `store_sales`, `store_returns`) бірнеше кестесінен деректерді сұратып, оларды S3 қоймасының `sf10` схемасындағы аттас жаңа кестелерге жүктеңіз:

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

Күтілетін нәтиже: SQL-клиентте жаңа кестелердің сәтті жасалғаны туралы хабарлама көрсетіледі.

## 4. S3 қоймасына аналитикалық сұрау орындаңыз

Талдаудың мақсаты — қайтару деңгейі күмәнді түрде жоғары (сатып алуларынан көп) клиенттерді анықтау, бұл алаяқтықты немесе тауар сапасына қатысты мәселелерді көрсетуі мүмкін.

Талдау үшін деректер алдыңғы қадамда S3 қоймасының `sf10` схемасына жүктелді:

- `customer` кестесі — клиенттер туралы деректер;
- `store` кестесі — дүкендер туралы деректер;
- `store_sales` және `store_returns` кестелері — сатылымдар мен қайтарулар туралы деректер.

Талдау жүргізу үшін SQL-сұрауды орындаңыз:

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

Cloud Trino SQL-сұрауды келесі ретпен орындайды:

1. SQL-сұрауды орындау жоспарын құрастырады.
1. Iceberg Metastore сервисінің API-і арқылы бұрын виртуалды ДҚ-дан ақпарат жазылған `sf10` схемасындағы S3 қоймасының кестелеріне қол жеткізеді.
1. Орындау жоспарына сәйкес деректерді оқиды және өңдейді: сұрауда көрсетілген сүзгілер мен топтастыру критерийлерін қолданады, агрегаттарды есептейді және т.б.
1. Деректерді өңдеу нәтижесінде SQL-сұрауға сәйкес келетін байланысқан объектілері бар клиенттер тізімін қалыптастырады.
1. Нәтижелік деректер іріктемесін S3 қоймасының `analysis_from_s3` схемасындағы `sch2` жаңа кестесі түрінде жазады.

Күтілетін нәтиже: SQL-клиентте қайтару деңгейі күмәнді түрде жоғары және ең үлкен жеңілдіктер алған клиенттер туралы 10 жазба көрсетіледі.

## 5. Деректерді S3 қоймасынан сыртқы деректер қорларына экспорттаңыз

1. S3 қоймасының `customer` схемасындағы `sf10` кестесінен деректерді сұратып, оларды MySQL сыртқы ДҚ-дағы аттас жаңа кесте түрінде сақтаңыз.

 ```sql

 CREATE TABLE mysqldb1.mydb1.customer AS
 SELECT * FROM s3db1.sf10.customer;

 ```

1. S3 қоймасының `store` схемасындағы `sf10` кестесінен деректерді сұратып, оларды PostgreSQL сыртқы ДҚ-дағы аттас жаңа кесте түрінде сақтаңыз.

 ```sql

 CREATE TABLE pgdb1.public.store AS
 SELECT * FROM s3db1.sf10.store;

 ```

Күтілетін нәтиже: SQL-клиентте жаңа кестелердің сәтті жасалғаны туралы хабарлама көрсетіледі.

## 6. Бірнеше деректер көзіне бір уақытта аналитикалық сұрау орындаңыз

Талдаудың мақсаты — қайтару деңгейі күмәнді түрде жоғары (сатып алуларынан көп) клиенттерді анықтау, бұл алаяқтықты немесе тауар сапасына қатысты мәселелерді көрсетуі мүмкін.

Талдауға арналған деректер бір уақытта үш көзден алынады:

- клиенттер туралы деректер — MySQL сыртқы ДҚ-дағы `customer` кестесінен;
- дүкендер туралы деректер — PostgreSQL сыртқы ДҚ-дағы `store` кестесінен;
- сатылымдар мен қайтарулар туралы деректер — S3 қоймасының `store_sales` схемасындағы `store_returns` және `sf10` кестелерінен.

Талдау жүргізу үшін SQL-сұрауды орындаңыз:

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

Cloud Trino SQL-сұрауды келесі ретпен орындайды:

1. SQL-сұрауды орындау жоспарын құрастырады.
1. Iceberg Metastore сервисінің API-і арқылы бұрын виртуалды ДҚ-дан ақпарат жазылған `sf10` схемасындағы S3 қоймасының кестелеріне қол жеткізеді.
1. MySQL ДҚ-ның `customer` кестесінен және PostgreSQL ДҚ-ның `store` кестесінен деректерді алу үшін тікелей сыртқы ДҚ-ларға сұраулар жібереді.
1. Орындау жоспарына сәйкес деректерді оқиды және өңдейді: сұрауда көрсетілген сүзгілер мен топтастыру критерийлерін қолданады, агрегаттарды есептейді және т.б.
1. Деректерді өңдеу нәтижесінде SQL-сұрауға сәйкес келетін байланысқан объектілері бар клиенттер тізімін қалыптастырады.
1. Нәтижелік деректер іріктемесін S3 қоймасының `analysis_from_s3` схемасындағы `sch2` жаңа кестесі түрінде жазады.

Күтілетін нәтиже: SQL-клиентте қайтару деңгейі күмәнді түрде жоғары және ең үлкен жеңілдіктер алған клиенттер туралы 10 жазба көрсетіледі.

## Пайдаланылмайтын ресурстарды жойыңыз

Бұрын өрістетілген Data Lakehouse сервисінің инфрақұрылымы есептеу ресурстарын тұтынады және тарифтеледі. Егер ол сізге енді қажет болмаса, оны жойыңыз.
