VK Cloud поддерживает установку плагинов OpenSearch на уже развернутые инстансы БД:

- `analysis-icu`

    Подключает Lucene ICU — модуль расширенной поддержки Unicode. Модуль использует библиотеки [ICU](https://icu.unicode.org/) и позволяет анализировать азиатские языки, преобразовывать регистр Unicode, поддерживает сопоставление и транслитерацию.

- `analysis-kuromoji`

    Подключает Lucene Kuromoji — модуль анализа японского языка.

- `analysis-nori`

    Подключает Lucene Nori — модуль анализа корейского языка.

- `analysis-stempel`

    Подключает Lucene Stempel — модуль анализа польского языка.

- `analysis-ukrainian`

    Подключает Lucene UkrainianMorfologikAnalyzer — модуль анализа украинского языка. Модуль использует библиотеку [Morfologik project](https://github.com/morfologik/morfologik-stemming).

- `analysis-phonetic`

    Добавляет фонетические фильтры для анализа токенов с использованием Soundex, Metaphone и других алгоритмов.

- `analysis-smartcn`

    Подключает Lucene Smart Chinese — модуль анализа текстов на китайском или смеси китайского и английского языков. Расширение разбивает текст на предложения, а затем каждое предложение на слова для лучшей сегментации слов на упрощенном китайском.

- `discovery-azure-classic`

    Определяет исходные адреса хостов для обнаружения одинаковых адресов, используя [API Azure Classic](https://learn.microsoft.com/en-us/rest/api/azure/).

- `discovery-ec2`

    Позволяет искать узлы кластера на AWS EC2, соответствующие требованиям мастера. Расширение использует API AWS.

- `discovery-gce`

    Определяет исходные адреса хостов для обнаружения одинаковых адресов, используя [API GCE](https://cloud.google.com/compute/docs/reference/rest/v1).

- `ingest-attachment`

    Позволяет извлекать вложенные файлы. Расширение использует библиотеку [Apache Tika](https://tika.apache.org/).

- `mapper-annotated-text`

    Позволяет индексировать текст, содержащий разметку для аннотаций.

- `mapper-murmur3`

    Позволяет вычислять хеш значений полей по индексному времени и сохранять значения полей в индексе.

- `mapper-size`

    Позволяет индексировать несжатый размер документов `_source` и записывать его в байтах в метаданных `_size`.

- `repository-azure`

    Позволяет использовать [Azure](https://azure.microsoft.com/ru-ru) для хранения данных.

- `repository-gcs`

    Позволяет использовать [Google Cloud Storage](https://cloud.google.com/) для хранения данных.

- `repository-hdfs`

    Позволяет использовать [Hadoop Distributed File System (HDFS)](https://hadoop.apache.org/) для хранения данных.

- `repository-s3`

    Позволяет использовать [S3](https://aws.amazon.com/ru/s3/) для хранения данных.

- `store-smb`

    Предоставляет возможность интеграции SMB-серверов с поисковыми функциями OpenSearch.

- `transport-nio`

    Реализует транспортный слой, используя NIO-подход. [NIO Transport](https://activemq.apache.org/nio-transport-reference) обеспечивает асинхронную неблокирующую обработку ввода-вывода, что повышает производительность и масштабируемость системы.

Подробнее о работе с расширениями и плагинами в VK Cloud в статье [Управление расширениями](../../instructions/managing-extensions/).
