# {heading(Версия Spark)[id=spark_version]}

В Cloud Spark используется Apache Spark версии 3.5.1.

## {heading(Возможности версии 3.5.1)[id=spark_version_features]}

В Cloud Spark на базе Apache Spark версии 3.5.1 доступны:

- Подключение к кластеру Spark через {linkto(../endpoints#spark-endpoints-connect)[text=эндпоинт Spark Connect]} — работа со Spark из Jupyter Notebook или IDE, выполнение кода построчно.
- Выполнение задач в управляемых контейнерах Sparkjobs, которые развернуты в Kubernetes. Ресурсы контейнеров можно масштабировать.
- Работа с Iceberg-таблицами через подключения к Cloud Iceberg Metastore или внешнему Iceberg Metastore.
- Чтение и запись данных в S3-совместимые хранилища через подключения к {var(s3)} или внешнему S3.
- Подключение к базам данных PostgreSQL.
- Просмотр интерактивных логов выполнения задач в {linkto(../endpoints#spark-endpoints-service)[text=Spark History Server]}.

## {heading(Изменение версии)[id=spark_version_change]}

Версию Spark можно посмотреть и изменить на вкладке **Настройки** экземпляра сервиса или с помощью параметра `sparkproxy_spark_version` в Terraform. Подробнее — в разделе {linkto(../../instructions/manage#spark_settings)[text=Просмотр и изменение версии Spark]}.
