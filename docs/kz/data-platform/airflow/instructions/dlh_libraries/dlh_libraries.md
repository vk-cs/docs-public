# {heading(DLH-пен жұмыс істеуге арналған кітапханалар)[id=dlh_libraries]}

{include(/kz/_includes/_translated_by_ai.md)}

DLH (Data Lakehouse) жүйесінде Cloud Airflow-пен жұмыс істеу үшін тиісті Python кітапханаларын пайдаланып, оларды DAG файлдарына импорттау қажет. Пайдаланушыларға қолжетімді кітапханалардың толық тізімі {linkto(#tab_glossary)[text=%number кестесінде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_dlh_libraries]} — DLH-пен жұмыс істеуге арналған кітапханалар)[align=right;position=above;id=tab_glossary;number={const(numb_dlh_libraries)}]}
[cols="2,1,3", options="header"]
|===
|Атауы
|Нұсқасы
|Сипаттамасы

|airflow-clickhouse-plugin
|1.4.0
|Airflow арқылы тапсырмаларды құруға және басқаруға арналған операторларды, сенсорларды және басқа құралдарды ұсынатын ClickHouse-пен жұмыс істеуге арналған плагин. ClickHouse-та деректерді өңдеу және талдауға байланысты жұмыс процестерін автоматтандыруды жеңілдетеді. Толығырақ [ресми құжаттамада](https://github.com/bryzgaloff/airflow-clickhouse-plugin)

|apache-airflow-providers-apache-spark
|4.9.0
|Apache Spark-пен жұмыс істеуге арналған провайдер. Ол Airflow арқылы Spark қолданбаларын іске қосатын және бақылайтын тапсырмаларды құруға және басқаруға арналған операторларды, сенсорларды және хуктарды ұсынады. Толығырақ [ресми құжаттамада](https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/index.html) 

|apache-airflow-providers-postgres
|5.6.0
|Airflow арқылы тапсырмаларды құруға және басқаруға арналған операторларды, сенсорларды және басқа құралдарды ұсынатын PostgreSQL ДҚБЖ-мен жұмыс істеуге арналған плагин. Толығырақ [ресми құжаттамада](https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/index.html)

|apache-airflow-providers-trino
|5.7.2
|Airflow арқылы тапсырмаларды құруға және басқаруға арналған операторларды, сенсорларды және басқа құралдарды ұсынатын Trino-пен жұмыс істеуге арналған плагин. Trino-да SQL сұрауларын орындауға байланысты жұмыс процестерін автоматтандыруды жеңілдетеді. Толығырақ [ресми құжаттамада](https://airflow.apache.org/docs/apache-airflow-providers-trino/stable/index.html)

|cx-Oracle
|8.3.0
|Oracle ДҚБЖ-мен жұмыс істеуге арналған кітапхана. SQL сұрауларын орындауға, транзакциялармен жұмыс істеуге және Oracle-дан алынған деректерді өңдеуге мүмкіндік береді. Толығырақ [ресми құжаттамада](https://cx-oracle.readthedocs.io/en/8.3.0/)

|dbt-core
|1.8.7
|SQL көмегімен аналитикалық қоймаларда деректерді түрлендіруді орындауға арналған dbt фреймворкімен жұмыс істеуге арналған кітапхана. Аналитикалық модельдерді жасауға, тестілеуге және құжаттауға мүмкіндік береді. Толығырақ [ресми құжаттамада](https://docs.getdbt.com/docs/about-dbt-install)

|dbt-trino
|1.8.5
|dbt-ның Trino-мен жұмыс істеуіне арналған адаптер. Аналитикалық модельдерді құру үшін Trino-да деректерді түрлендіруді орындауға мүмкіндік береді. Толығырақ [ресми құжаттамада](https://docs.getdbt.com/reference/warehouse-setups/trino-setup)

|mlplatform-client-on-prem
|1.1.13
|Cloud Spark кластерімен жұмыс істеу әдістерін ұсынатын Cloud ML Platform негізіндегі {var(data-p)} кітапханасы. Толығырақ [ресми құжаттамада](https://cloud.vk.com/docs/kz/ml/spark-to-k8s/ml-platform-library/library-reference)

|polars
|0.20.31
|Деректердің үлкен көлемдерін жылдам өңдеу қажет болатын тапсырмаларда кестелік деректерді өңдеуге арналған кітапхана. Толығырақ [ресми құжаттамада](https://docs.pola.rs)

|pyiceberg
|0.7.1
|Apache Iceberg-пен жұмыс істеуге арналған кітапхана, ол Iceberg кестелерін басқаруға және деректермен операцияларды орындауға мүмкіндік береді. Толығырақ [ресми құжаттамада](https://py.iceberg.apache.org/)

|===
{/caption}
