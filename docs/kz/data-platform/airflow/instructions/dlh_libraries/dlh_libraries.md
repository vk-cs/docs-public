# {heading(DLH-да жұмыс істеуге арналған кітапханалар)[id=dlh_libraries]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

DLH-да (Data Lakehouse) Cloud Airflow-мен жұмыс істеу үшін сәйкес Python-кітапханаларды пайдалану және оларды DAG файлдарына импорттау қажет. Пайдаланушыларға қолжетімді кітапханалардың толық тізімі {linkto(#tab_glossary)[text=%number кестеде]} көрсетілген.

{caption({counter(table)[id=numb_dlh_libraries]} кесте — DLH-да жұмыс істеуге арналған кітапханалар)[align=right;position=above;id=tab_glossary;number={const(numb_dlh_libraries)}]}
[cols="2,1,3", options="header"]
|===
|Атауы
|Нұсқасы
|Сипаттамасы

|acryl-datahub-airflow-plugin
|1.7.0.7
|DAG-тар мен тапсырмалардың метадеректерін, іске қосу тарихын және деректердің шығу тегі туралы ақпаратты жинайтын DataHub-пен жұмыс істеуге арналған плагин. Толығырақ [ресми құжаттамада](https://docs.datahub.com/docs/lineage/airflow)

|airflow-clickhouse-plugin
|1.6.0
|Airflow арқылы тапсырмаларды жасауға және басқаруға арналған операторлар, сенсорлар және басқа да құралдар ұсынатын ClickHouse-пен жұмыс істеуге арналған плагин. ClickHouse-та деректерді өңдеуге және талдауға байланысты жұмыс процестерін автоматтандыруды жеңілдетеді. Толығырақ [ресми құжаттамада](https://github.com/bryzgaloff/airflow-clickhouse-plugin)

|apache-airflow-providers-apache-spark
|5.2.1
|Apache Spark-пен жұмыс істеуге арналған провайдер. Ол Spark-қосымшаларын іске қосатын және басқаратын, Airflow арқылы тапсырмаларды жасауға және басқаруға арналған операторлар, сенсорлар мен хуктарды ұсынады. Толығырақ [ресми құжаттамада](https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/index.html) 

|apache-airflow-providers-postgres
|6.6.0
|Airflow арқылы тапсырмаларды жасауға және басқаруға арналған операторлар, сенсорлар және басқа да құралдар ұсынатын PostgreSQL СУБД-мен жұмыс істеуге арналған плагин. Толығырақ [ресми құжаттамада](https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/index.html)

|apache-airflow-providers-trino
|6.5.0
|Airflow арқылы тапсырмаларды жасауға және басқаруға арналған операторлар, сенсорлар және басқа да құралдар ұсынатын Trino-мен жұмыс істеуге арналған плагин. Trino-да SQL-сұрауларын орындауға байланысты жұмыс процестерін автоматтандыруды жеңілдетеді. Толығырақ [ресми құжаттамада](https://airflow.apache.org/docs/apache-airflow-providers-trino/stable/index.html)

|cx_Oracle
|8.3.0
|Oracle СУБД-мен жұмыс істеуге арналған кітапхана. SQL-сұрауларын орындауға, транзакциялармен жұмыс істеуге және Oracle-ден деректерді өңдеуге мүмкіндік береді. Толығырақ [ресми құжаттамада](https://cx-oracle.readthedocs.io/en/8.3.0/)

|dbt-core
|1.8.8
|SQL көмегімен аналитикалық қоймаларда деректер түрлендірулерін орындауға арналған dbt фреймворкімен жұмыс істеуге арналған кітапхана. Аналитикалық модельдерді жасауға, тестілеуге және құжаттандыруға мүмкіндік береді. Толығырақ [ресми құжаттамада](https://docs.getdbt.com/docs/about-dbt-install)

|dbt-trino
|1.8.5
|dbt-нің Trino-мен жұмыс істеуіне арналған адаптер. Аналитикалық модельдер құру үшін Trino-да деректер түрлендірулерін орындауға мүмкіндік береді. Толығырақ [ресми құжаттамада](https://docs.getdbt.com/reference/warehouse-setups/trino-setup)

|mlplatform-client-on-prem
|1.3.4
|Cloud Spark кластерімен жұмыс істеу әдістерін ұсынатын Cloud ML Platform негізіндегі {var(data-p)} кітапханасы. Толығырақ [ресми құжаттамада](https://cloud.vk.ru/docs/ru/ml/spark-to-k8s/ml-platform-library/library-reference)

|polars
|1.38.1
|Деректердің үлкен көлемдерін жедел өңдеу қажет болатын тапсырмаларда кестелік деректерді өңдеуге арналған кітапхана. Толығырақ [ресми құжаттамада](https://docs.pola.rs)

|pyiceberg
|0.11.1
|Iceberg кестелерін басқаруға және деректермен операциялар орындауға мүмкіндік беретін Apache Iceberg-пен жұмыс істеуге арналған кітапхана. Толығырақ [ресми құжаттамада](https://py.iceberg.apache.org/)

|===
{/caption}