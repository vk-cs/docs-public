# {heading(Библиотеки для работы в DLH)[id=dlh_libraries]}

Для работы Cloud Airflow в DLH (Data Lakehouse) необходимо использовать соответствующие Python-библиотеки и импортировать их в файлы DAG. Полный перечень доступных для пользователей библиотек перечислен в {linkto(#tab_glossary)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_dlh_libraries]} — Библиотеки для работы в DLH)[align=right;position=above;id=tab_glossary;number={const(numb_dlh_libraries)}]}
[cols="2,1,3", options="header"]
|===
|Название
|Версия
|Описание

|airflow-clickhouse-plugin
|1.4.0
|Плагин для работы с ClickHouse, который предоставляет операторы, сенсоры и другие инструменты для создания и управления задачами через Airflow. Упрощает автоматизацию рабочих процессов, связанных с обработкой и анализом данных в ClickHouse. Подробнее в [официальной документации](https://github.com/bryzgaloff/airflow-clickhouse-plugin)

|apache-airflow-providers-apache-spark
|4.9.0
|Провайдер для работы с Apache Spark. Он предоставляет операторы, сенсоры и хуки для создания и управления задачами через Airflow, которые запускают и контролируют Spark-приложения. Подробнее в [официальной документации](https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/index.html) 

|apache-airflow-providers-postgres
|5.6.0
|Плагин для работы с СУБД PostgreSQL, который предоставляет операторы, сенсоры и другие инструменты для создания и управления задачами через Airflow. Подробнее в [официальной документации](https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/index.html)

|apache-airflow-providers-trino
|5.7.2
|Плагин для работы с Trino, который предоставляет операторы, сенсоры и другие инструменты для создания и управления задачами через Airflow. Упрощает автоматизацию рабочих процессов, связанных с выполнением SQL-запросов в Trino. Подробнее в [официальной документации](https://airflow.apache.org/docs/apache-airflow-providers-trino/stable/index.html)

|cx-Oracle
|8.3.0
|Библиотека для работы с СУБД Oracle. Позволяет выполнять SQL-запросы, работать с транзакциями и обрабатывать данные из Oracle. Подробнее в [официальной документации](https://cx-oracle.readthedocs.io/en/8.3.0/)

|dbt-core
|1.8.7
|Библиотека для работы с фреймворком dbt для выполнения трансформаций данных в аналитических хранилищах с помощью SQL. Позволяет создавать, тестировать и документировать аналитические модели. Подробнее в [официальной документации](https://docs.getdbt.com/docs/about-dbt-install)

|dbt-trino
|1.8.5
|Адаптер для работы dbt с Trino. Позволяет выполнять трансформации данных в Trino для построения аналитических моделей. Подробнее в [официальной документации](https://docs.getdbt.com/reference/warehouse-setups/trino-setup)

|mlplatform-client-on-prem
|1.1.13
|Библиотека {var(data-p)} на основе Cloud ML Platform, которая предоставляет методы для работы с кластером Cloud Spark. Подробнее в [официальной документации](https://cloud.vk.com/docs/ru/ml/spark-to-k8s/ml-platform-library/library-reference)

|polars
|0.20.31
|Библиотека для обработки табличных данных в задачах, где требуется быстрая обработка больших объемов данных. Подробнее в [официальной документации](https://docs.pola.rs)

|pyiceberg
|0.7.1
|Библиотека для работы с Apache Iceberg, которая  позволяет управлять таблицами Iceberg и выполнять операций с данными. Подробнее в [официальной документации](https://py.iceberg.apache.org/)

|===
{/caption}