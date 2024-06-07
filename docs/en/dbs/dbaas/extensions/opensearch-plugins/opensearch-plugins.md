VK Cloud allows the installation of OpenSearch plugins on already deployed database instances:

- `analysis-icu`

    The plugin makes available Lucene ICU, an advanced Unicode support module. The module uses the [ICU](https://icu.unicode.org/) libraries and allows you to analyze Asian languages, convert Unicode case, supports collation and transliteration.

- `analysis-kuromoji`

    The plugin makes available  Lucene Kuromoji, a Japanese language analysis module.

- `analysis-nori`

    The plugin makes available  Lucene Nori, a Korean language analysis module.

- `analysis-stempel`

    InclThe plugin makes available udes Lucene Stempel, a Polish language analysis module.

- `analysis-ukrainian`

    The plugin makes available Lucene UkrainianMorfologikAnalyzer, a module for analyzing the Ukrainian language. The module uses the [Morfologik project](https://github.com/morfologik/morfologik-stemming) library.

- `analysis-phonetic`

    The plugin adds phonetic filters for token analysis using Soundex, Metaphone and other algorithms.

- `analysis-smartcn`

    The plugin connects Lucene Smart Chinese, a module for analyzing texts in Chinese or mixed in Chinese and English. The extension breaks text into sentences and then each sentence into words for better word segmentation in Simplified Chinese.

- `discovery-azure-classic`

    The plugin makes available to discover source host addresses for duplicate address detection using [Azure Classic API](https://learn.microsoft.com/en-us/rest/api/azure/).

- `discovery-ec2`

    The plugin allows you to search for cluster nodes on AWS EC2 that meet the master's requirements. The plugin uses the AWS API.

- `discovery-gce`

    The plugin makes available to discover source host addresses for duplicate address detection using [GCE API](https://cloud.google.com/compute/docs/reference/rest/v1).

- `ingest-attachment`

    The plugin allows to extract attached files. The plugin uses the [Apache Tika](https://tika.apache.org/) library.

- `mapper-annotated-text`

    The plugin allows to index text that contains markup for annotations.

- `mapper-murmur3`

    The plugin allows to calculate a hash of field values by index time and store field values in the index.

- `mapper-size`

    The plugin allows to index the uncompressed size of `_source` documents and record it in the `_size` metadata in bytes.

- `repository-azure`

    The plugin allows to store data with [Azure](https://azure.microsoft.com/ru-ru).

- `repository-gcs`

    The plugin allows to store data with [Google Cloud Storage](https://cloud.google.com/).

- `repository-hdfs`

    The plugin allows to store data with [Hadoop Distributed File System (HDFS)](https://hadoop.apache.org/).

- `repository-s3`

    The plugin allows to store data with [S3](https://aws.amazon.com/ru/s3/).

- `store-smb`

    The plugin makes available to integrate SMB servers with OpenSearch search functions.

- `transport-nio`

    The plugin implements a transport layer using the NIO approach. [NIO Transport](https://activemq.apache.org/nio-transport-reference) provides asynchronous, non-blocking I/O processing, which improves system performance and scalability.

Read more about working with extensions and plugins in VK Cloud in [Managing extensions](../../service-management/managing-extensions/).
