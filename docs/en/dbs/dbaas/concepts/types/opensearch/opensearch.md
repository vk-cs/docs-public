# {heading(OpenSearch)[id=dbaas-opensearch]}

{include(/en/_includes/_translated_by_ai_en.md)}

[OpenSearch](https://opensearch.org/) is an open-source software suite licensed under Apache 2.0 that simplifies data ingestion, search, visualization, and analysis. OpenSearch uses the [Apache Lucene](https://lucene.apache.org/) engine for its operation. Working with data in OpenSearch is organized the same way as in Elasticsearch: data is stored as JSON documents, to which metadata is added. Documents and metadata, in turn, are stored in indexes.

OpenSearch is effective when full-text data search is required. For example, it can be used as a backend for applications such as online stores that need "Wikipedia-like" search functionality. Another popular use case is log analytics.

For more details, see the [official OpenSearch documentation](https://opensearch.org/docs/latest/).

The list of OpenSearch versions supported in {var(cloud)} is available when {linkto(../../../instructions/create#dbaas-create)[text=creating]} an instance of this database.

## {heading(What's next?)[id=dbaas-opensearch-whats-next]}

- {linkto(../../../concepts/architecture#dbaas-architecture)[text=Learn about]} the OpenSearch cluster architecture.
- {linkto(../../../instructions/create#dbaas-create)[text=Create]} a database instance.
- {linkto(../../../connect#dbaas-connect)[text=Connect]} to the database.