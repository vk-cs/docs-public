# {heading(OpenSearch)[id=dbaas-opensearch]}

[OpenSearch](https://opensearch.org/) —  это программный комплекс с открытым исходным кодом под лицензией Apache 2.0, который упрощает получение, поиск, визуализацию и анализ данных. OpenSearch использует движок [Apache Lucene](https://lucene.apache.org/) для своей работы. Работа с данными в OpenSearch организована так же, как и в Elasticsearch: данные хранятся в виде JSON-документов, к которым добавляются метаданные. Документы и метаданные, в свою очередь, хранятся в индексах.

OpenSearch эффективен, когда требуется полнотекстовый поиск по данным. Например, его можно использовать в качестве бэкенда для приложений, таких как онлайн-магазины, в которых требуется функциональность поиска «как в Wikipedia». Другое популярное применение — аналитика логов.

Подробнее в [официальной документации OpenSearch](https://opensearch.org/docs/latest/).

Список версий OpenSearch, которые поддерживаются в {var(cloud)}, доступен при {linkto(../../../instructions/create#dbaas-create)[text=создании]} инстанса этой базы данных.

## {heading(Что дальше?)[id=dbaas-opensearch-whats-next]}

- {linkto(../../../concepts/architecture#dbaas-architecture)[text=Познакомьтесь]} с архитектурой кластера OpenSearch.
- {linkto(../../../instructions/create#dbaas-create)[text=Создайте]} инстанс базы данных.
- {linkto(../../../connect#dbaas-connect)[text=Подключитесь]} к базе данных.
