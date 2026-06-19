# {heading(О сервисе)[id=lakekeeper_info]}

Lakekeeper — каталог данных (data catalog) для Data Lakehouse, реализованный на основе Apache Iceberg REST Catalog API. Каталог управляет коллекциями таблиц, сгруппированными в пространства имен. Подробнее о Lakekeeper в [официальной документации](https://docs.lakekeeper.io/docs/nightly/concepts/).

Сервис позволяет другим компонентам Data Lakehouse ({linkto(../../../spark/concepts/about#spark_info)[text=Cloud Spark]}, {linkto(../../../trino/concepts/about#trino_info)[text=Cloud Trino]}, {linkto(../../../iceberg-metastore/concepts/about#iceberg_info)[text=Cloud Iceberg Metastore]}) обращаться к данным через единый каталог.

Возможные сценарии использования сервиса:

- Централизованное управление коллекциями таблиц и их метаданными в Data Lakehouse через единый каталог.
- Обеспечение совместимости данных между различными инструментами обработки данных.
- Контроль версионности схем данных и отслеживание изменений.
