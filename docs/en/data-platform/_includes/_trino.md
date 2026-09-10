{includetag(open)} 

{ifdef(public)}
1. [Go to](https://msk.cloud.vk.ru/app/) the management console {var(cloud)}.
{/ifdef}

1. Go to **Data Platform → Service instances**.
1. Click the name of the required instance.

{/includetag}

{includetag(connect)}

1. Select the source:

   - `PostgreSQL` — connection to a PostgreSQL database.
   - `Greenplum` — connection to a Greenplum database.
   - `Clickhouse` — connection to a ClickHouse database.
   - `MySQL` — connection to a MySQL database.
   - `MariaDB` — connection to a MariaDB database.
   {ifndef(public)}
   - `MS SQL` — connection to an MS SQL database.
   - `Oracle DB` — connection to an Oracle database.
   {/ifndef}
   - `Redis` — connection to a Redis database.
   - `Iceberg c хранением данных на S3 VK Cloud` — connection to {var(s3)} in the same project.
   - `Iceberg c хранением данных на внешнем S3` — connection to an external S3 object storage.
   - `Hive Metastore c хранением данных на HDFS` — connection to a Hive Metastore server with HDFS storage.
   - `Hive Metastore c хранением данных на внешнем S3` — connection to a Hive Metastore server with S3 storage.
   - `Hive Metastore c хранением данных на VK Cloud S3` — connection to a Hive Metastore server with {ifdef(public)} [VK Object Storage](/ru/storage/s3/concepts/about){/ifdef}{ifndef(public)} {var(s3)}{/ifndef} storage.

1. Configure the connection parameters for the source:

   {tabs}

   {tab(PostgreSQL, Greenplum)}

   - **Name**: connection name.
   - **hostname:port**: server address for the connection.
   - **Login**: login of the database user account on behalf of which Cloud Trino will connect to the source.
   - **Database name**: name of the database that Trino will connect to.
   - **Password**: password of the database user account.
   - **TLS certificate**: certificate for a secure connection to the database when using TLS encryption. Attach a certificate file or specify its content in PEM format in the text field.
   - **Catalog name**: name of the logical structure for accessing and managing metadata, working with tables and schemas. If the catalog does not exist in the database, it will be created automatically.
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.

   {/tab}

   {tab(Clickhouse)}

   - **Name**: connection name.
   - **hostname:port**: server address for the connection.
   - **Login**: login of the database user account on behalf of which Cloud Trino will connect to the source.
   - **Database name**: name of the database that Trino will connect to.
   - **Password**: password of the database user account.
   - **TLS certificate**: certificate for a secure connection to the database when using TLS encryption. Attach a certificate file or specify its content in PEM format in the text field. To use a secure connection, enable the **Enable SSL** option.
   - **Catalog name**: name of the logical structure for accessing and managing metadata, working with tables and schemas. If the catalog does not exist in the database, it will be created automatically.
   - **compress**: enable the option to apply compression when exchanging data with the server. Typically used with low bandwidth or high latency responses from the ClickHouse server. Disabled by default. 
   - **Enable SSL**: enable the option to use a secure SSL/TLS connection to the ClickHouse server. When enabled, you must specify a value in the **TLS certificate** field.
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.

   {/tab}
   
   {tab(MySQL, MariaDB)}

   - **Name**: connection name.
   - **hostname:port**: server address for the connection.
   - **Login**: login of the database user account on behalf of which Cloud Trino will connect to the source.
   - **Password**: password of the database user account.
   - **Catalog name**: name of the logical structure for accessing and managing metadata, working with tables and schemas. If the catalog does not exist in the database, it will be created automatically.
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.

   {/tab}
   {ifndef(public)}
   {tab(MS SQL, Oracle DB)}

   - **Name**: connection name.
   - **hostname:port**: server address for the connection.
   - **Login**: login of the database user account on behalf of which Cloud Trino will connect to the source.
   - **Database name**: name of the database that Trino will connect to.
   - **Password**: password of the database user account.
   - **Catalog name**: name of the logical structure for accessing and managing metadata, working with tables and schemas. If the catalog does not exist in the database, it will be created automatically.
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.

   {/tab}
   {/ifndef}
   {tab(Redis)}

   - **Name**: connection name.
   - **hostname:port**: server address for the connection.
   - **Login**: login of the database user account on behalf of which Cloud Trino will connect to the source.
   - **Table name**: database table name.
   - **Password**: password of the database user account.
   - **catalog**: name of the logical structure for unified access and management of metadata.
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.

   {/tab}

   {tab(Iceberg Metastore ({var(s3)}))}

   - **Name**: connection name.
   - **hostname:port of Iceberg Metastore service**: server address for the connection.
   - **Iceberg Metastore service login**: login of the Iceberg Metastore user account.
   - **Iceberg Metastore service password**: password of the Iceberg Metastore user account.
   - **Metastore database name in JDBC catalog**: name of the database used as Iceberg Metastore in the JDBC catalog.
   - **Catalog name**: name of the logical structure for accessing and managing metadata.
   - **Use Bloom filter**: option to use a Bloom filter to speed up data reading. 
   - **Ignore statistics**: option to skip statistics in Parquet files when reading data.
   - **Percentage of Parquet files to validate**: percentage of Parquet files that will be checked after writing.
   - **Size of pages to write**: maximum size of pages written by the Parquet writer.
   - **Number of pages to write**: maximum number of values per page written by the Parquet writer.
   - **Size of row groups to write**: maximum size of row groups written by the Parquet writer.
   - **Number of rows processed during write**: maximum number of rows in a batch processed by the Parquet writer.
   - **Number of rows processed at once during read**: maximum number of rows in a batch that can be read.
   - **Maximum size of small files**: maximum file size considered small. A smaller file can be processed to improve performance and reduce the number of files in storage. For example, it can be merged with other files.
   - **Enable Java Vector API (SIMD)**: option to support Java Vector API (SIMD) for fast Parquet file decoding.
   - **Bucket**: name of the {var(s3)} bucket that Trino will connect to.
   - **Path to files in bucket**: name of the directory in the {var(s3)} bucket that Trino will connect to.
   - **Allow register_table procedure**: option to register existing tables in the Iceberg Metastore catalog.
   - **Allow add_files procedure**: option to add files to existing tables in the Iceberg Metastore catalog.
   {ifndef(public)}
   - **Use TLS certificate validation**: option to validate the TLS certificate and match the domain name in the certificate to the Cloud Iceberg Metastore service address. Enabled by default. Disable the option to connect to a third-party Iceberg JDBC catalog. The TLS connection will be preserved.
   - **TLS certificate (Transport Layer Security)**: CA certificate for connecting to a third-party Iceberg JDBC catalog. Attach a certificate file or specify its content in PEM format in the text field.
   {/ifndef}
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.

   {/tab}

   {tab(Iceberg Metastore (S3))}

   - **Name**: connection name.
   - **hostname:port of Iceberg Metastore service**: server address for the connection.
   - **Iceberg Metastore service login**: login of the Iceberg Metastore user account.
   - **Region**: region where the S3 storage is located.
   - **Access Key**: public key for S3 storage access.
   - **Secret Key**: private key for S3 storage access.
   - **S3 URL**: URL address of the S3 storage.
   - **Iceberg Metastore service password**: password of the Iceberg Metastore user account.
   - **Metastore database name in JDBC catalog**: name of the database used as Iceberg Metastore in the JDBC catalog.
   - **Bucket**: name of the {var(s3)} bucket that Trino will connect to.
   - **Path to files in bucket**: name of the directory in the {var(s3)} bucket that Trino will connect to.
   - **Catalog name**: name of the logical structure for accessing and managing metadata.
   - **Use Bloom filter**: option to use a Bloom filter to speed up data reading.
   - **Ignore statistics**: option to skip statistics in Parquet files when reading data.
   - **Percentage of Parquet files to validate**: percentage of Parquet files that will be checked after writing.
   - **Size of pages to write**: maximum size of pages written by the Parquet writer.
   - **Number of pages to write**: maximum number of values per page written by the Parquet writer.
   - **Size of row groups to write**: maximum size of row groups written by the Parquet writer.
   - **Number of rows processed during write**: maximum number of rows in a batch processed by the Parquet writer.
   - **Number of rows processed at once during read**: maximum number of rows in a batch that can be read.
   - **Maximum size of small files**: maximum file size considered small. A smaller file can be processed to improve performance and reduce the number of files in storage. For example, it can be merged with other files.
   - **Enable Java Vector API (SIMD)**: option to support Java Vector API (SIMD) for fast Parquet file decoding.
   - **Allow register_table procedure**: option to register existing tables in the Iceberg Metastore catalog.
   - **Allow add_files procedure**: option to add files to existing tables in the Iceberg Metastore catalog.
   {ifndef(public)}
   - **Use TLS certificate validation**: option to validate the TLS certificate and match the domain name in the certificate to the Cloud Iceberg Metastore service address. Enabled by default. Disable the option to connect to a third-party Iceberg JDBC catalog. The TLS connection will be preserved.
   - **TLS certificate (Transport Layer Security)**: CA certificate for connecting to a third-party Iceberg JDBC catalog. Attach a certificate file or specify its content in PEM format in the text field.
   {/ifndef}
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.

   {/tab}

   {tab(Hive Metastore (HDFS))}

   - **Name**: connection name.
   - **hostname:port of Hive Metastore Thrift service**: key/value pair in the format `<FQDN>:<PORT>` or `<IP-ADDRESS>:<PORT>`. Specify the data for the Hive Metastore Thrift service.
   - **Keytab file in base64 format of Cloud Trino service principal**: content of the Keytab file, re-encoded to base64 format. 

     To connect to a Hive Metastore cluster with HDFS storage, Kerberos Credentials are used. Contact the Hive Metastore administrator to create a new client principal and obtain a Keytab file for it. This file must be re-encoded to base64 format.

     {cut(How to get the base64 value)}

     {tabs}
      
     {tab(macOS)}

     Run the command:

     ```bash
     base64 -i <PATH_TO_KEYTAB_FILE>
     ```

     {/tab}

     {tab(Linux)}

     Run the command:

     ```bash
     base64 -w 0 <PATH_TO_KEYTAB_FILE>
     ```

     {/tab}

     {tab(Windows)}

     In PowerShell, run the command:

     ```ps
     [Convert]::ToBase64String([IO.File]::ReadAllBytes("<PATH_TO_KEYTAB_FILE>"))
     ```

     {/tab}

     {/tabs}

     {/cut}

   - **Catalog name in Hive Metastore**: request from the Hive Metastore administrator. To get a list of catalogs in Hive Metastore, use the query:

     ```sql
     SHOW CATALOGS;
     ```

     The same catalog name is used in Cloud Trino for queries to the Hive Metastore connection.

   - **hostname:port of KDC service**: key/value pair in the format `<FQDN>:<PORT>` or `<IP-ADDRESS>:<PORT>`. Specify the data for the KDC (Key Distribution Center) service.
   - **Hive Metastore service principal name**: name of the principal under which Hive Metastore operates.
   - **Client principal name**: name of the principal used to create the Keytab file.
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.
   - **Enable User Impersonation**: enable the option to execute queries to Hive Metastore on behalf of the user who initiated the query in Cloud Trino.
   - **Write to external Hive tables**: enable the option to allow Cloud Trino to write to external tables connected to Hive Metastore. When disabled, only writing to managed tables is available.

   {/tab}

   {tab(Hive Metastore (S3))}

   - **Name**: connection name.
   - **Region**: region where the S3 storage is located.
   - **Access Key**: public key for S3 storage access.
   - **Secret Key**: private key for S3 storage access.
   - **S3 URL**: URL address of the S3 storage.
   - **hostname:port of Hive Metastore Thrift service**: key/value pair in the format `<FQDN>:<PORT>` or `<IP-ADDRESS>:<PORT>`. Specify the data for the Hive Metastore Thrift service.
   - **Keytab file in base64 format of Cloud Trino service principal**: content of the Keytab file, re-encoded to base64 format.

     To connect to a Hive Metastore cluster with S3 storage, not only S3 Credentials but also Kerberos data are used. Contact the Hive Metastore administrator to create a new client principal and obtain a Keytab file for it. This file must be re-encoded to base64 format.

     {cut(How to get the base64 value)}

     {tabs}
      
     {tab(macOS)}

     Run the command:

     ```bash
     base64 -i <PATH_TO_KEYTAB_FILE>
     ```

     {/tab}

     {tab(Linux)}

     Run the command:

     ```bash
     base64 -w 0 <PATH_TO_KEYTAB_FILE>
     ```

     {/tab}

     {tab(Windows)}

     In PowerShell, run the command:

     ```ps
     [Convert]::ToBase64String([IO.File]::ReadAllBytes("<PATH_TO_KEYTAB_FILE>"))
     ```

     {/tab}

     {/tabs}

     {/cut}

   - **Bucket**: name of the bucket in S3 storage.
   - **Catalog name in Hive Metastore**: request from the Hive Metastore administrator. To get a list of catalogs in Hive Metastore, use the query:

     ```sql
     SHOW CATALOGS;
     ```

     The same catalog name is used in Cloud Trino for queries to the Hive Metastore connection.

   - **hostname:port of KDC service**: key/value pair in the format `<FQDN>:<PORT>` or `<IP-ADDRESS>:<PORT>`. Specify the data for the KDC (Key Distribution Center) service.
   - **Hive Metastore service principal name**: name of the principal under which Hive Metastore operates.
   - **Client principal name**: name of the principal used to create the Keytab file.
   - **Use Bloom filter**: enable the option to use a Bloom filter when reading Parquet files.
   - **Ignore statistics**: enable the option to ignore statistics in Parquet files when reading data.
   - **Percentage of Parquet files to validate**: percentage of Parquet files that will be checked after writing.
   - **Size of pages to write**: maximum size of a single Parquet page.
   - **Number of pages to write**: maximum number of values on a single Parquet page.
   - **Size of row groups to write**: maximum block size when writing a Parquet file.
   - **Number of rows processed during write**: number of records that will be collected into a batch before writing them to a Parquet file in a single operation.
   - **Number of rows processed at once during read**: maximum number of rows read at once from a single block.
   - **Maximum size of small files**: value that determines which file size is considered small.
   - **Enable Java Vector API (SIMD)**: enable the option to use vectorized decoding when reading Parquet files.
   - **Allow register_table procedure**: enable the option to allow registering existing Apache Iceberg format tables in Hive Metastore. When calling the function in an SQL query, specify the full path to the metadata file.
   - **Allow add_files procedure**: enable the option to allow adding new data files (e.g., Parquet files) to an existing Apache Iceberg format table.
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.
   - **Enable User Impersonation**: enable the option to execute queries to Hive Metastore on behalf of the user who initiated the query in Cloud Trino.

   {/tab}

   {tab(Hive Metastore ({var(s3)}))}

   - **Name**: connection name.
   - **hostname:port of Hive Metastore Thrift service**: key/value pair in the format `<FQDN>:<PORT>` or `<IP-ADDRESS>:<PORT>`. Specify the data for the Hive Metastore Thrift service.
   - **Keytab file in base64 format of Cloud Trino service principal**: content of the Keytab file, re-encoded to base64 format.

     To connect to a Hive Metastore cluster with {var(s3)} storage, Kerberos Credentials are used. Contact the Hive Metastore administrator to create a new client principal and obtain a Keytab file for it. This file must be re-encoded to base64 format.

     {cut(How to get the base64 value)}

     {tabs}
      
     {tab(macOS)}

     Run the command:

     ```bash
     base64 -i <PATH_TO_KEYTAB_FILE>
     ```

     {/tab}

     {tab(Linux)}

     Run the command:

     ```bash
     base64 -w 0 <PATH_TO_KEYTAB_FILE>
     ```

     {/tab}

     {tab(Windows)}

     In PowerShell, run the command:

     ```ps
     [Convert]::ToBase64String([IO.File]::ReadAllBytes("<PATH_TO_KEYTAB_FILE>"))
     ```

     {/tab}

     {/tabs}

     {/cut}

   - **Catalog name in Hive Metastore**: request from the Hive Metastore administrator. To get a list of catalogs in Hive Metastore, use the query:

     ```sql
     SHOW CATALOGS;
     ```

     The same catalog name is used in Cloud Trino for queries to the Hive Metastore connection.

   - **hostname:port of KDC service**: key/value pair in the format `<FQDN>:<PORT>` or `<IP-ADDRESS>:<PORT>`. Specify the data for the KDC (Key Distribution Center) service.
   - **Hive Metastore service principal name**: name of the principal under which Hive Metastore operates.
   - **Client principal name**: name of the principal used to create the Keytab file.
   - **Use Bloom filter**: enable the option to use a Bloom filter when reading Parquet files.
   - **Ignore statistics**: enable the option to ignore statistics in Parquet files when reading data.
   - **Percentage of Parquet files to validate**: percentage of Parquet files that will be checked after writing.
   - **Size of pages to write**: maximum size of a single Parquet page.
   - **Number of pages to write**: maximum number of values on a single page.
   - **Size of row groups to write**: maximum block size when writing a Parquet file.
   - **Number of rows processed during write**: number of records that will be collected into a batch before writing them to a Parquet file in a single operation.
   - **Number of rows processed at once during read**: maximum number of rows read at once from a single block.
   - **Maximum size of small files**: value that determines which file size is considered small.
   - **Enable Java Vector API (SIMD)**: enable the option to use vectorized decoding when reading Parquet files.
   - **Bucket**: name of the {var(s3)} bucket.
   - **Path to files in bucket**: directory in the {var(s3)} bucket.
   - **Allow register_table procedure**: enable the option to allow registering existing Apache Iceberg format tables in Hive Metastore. When calling the function in an SQL query, specify the full path to the metadata file.
   - **Allow add_files procedure**: enable the option to allow adding new data files (e.g., Parquet files) to an existing Apache Iceberg format table.
   - **Save record in connection catalog**: enable the option to save connection data. This allows adding connections to other Cloud Trino service instances without re-entering the data.
   - **Enable User Impersonation**: enable the option to execute queries to Hive Metastore on behalf of the user who initiated the query in Cloud Trino.

   {/tab}

   {/tabs}

{/includetag}

{includetag(password)}

Password requirements:

- can only contain digits, characters `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `\`, `]`, `^`, `_`, `` ` ``, `{`, `|`, `}`, `~`, uppercase and lowercase Latin letters;
- must be at least 16 characters long;
- must contain at least one uppercase and one lowercase Latin letter, at least one digit, and at least one special character.

{/includetag}