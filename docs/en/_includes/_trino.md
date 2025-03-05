{includetag(open)}

1. [Go to](https://msk.cloud.vk.com/app) the VK Cloud management console.
1. Go to **Data Platform** → **Экземпляры сервисов**.
1. Click on the name of the desired instance.

{/includetag}
{includetag(connect)}

1. Select the source:

   - `PostgreSQL` — connection to the PostgreSQL database.
   - `Greenplum` — connection to the Greenplum database.
   - `Clickhouse` — connection to the Clickhouse database.
   - `Apache Iceberg with S3 VK Cloud` — connection to Cloud Storage in the same project.
   - `Apache Iceberg with external S3` — connection to external S3 object storage.
1. Configure the connection parameters to the source:

   <tabs>
   <tablist>
   <tab>PostgreSQL, Greenplum, Clickhouse</tab>
   <tab>S3 VK Cloud</tab>
   <tab>External S3</tab>
   </tablist>
   <tabpanel>
   
   - **Name**: name of the connection.
   - **Db_name**: name of the database to which Trino will connect.
   - **Hostname**: the address of the server to connect to. Example: `postgresql-primary.postgresqlcluster-gttxnz96.svc:5432`.
   - **Username**: database user account name.
   - **Password**: database user account password.
   - **Tls_crt**: path to the TLS certificate file. Using TLS certificate helps to protect data during transmission and increase connection security.
      
   </tabpanel>
   <tabpanel>
      
   - **Name**: name of the connection.
   - **S3_bucket**: name of the Cloud Storage buckets to which Trino will connect.
   - **S3_folder**: the name of the directory in the Cloud Storage buckets to which Trino will connect.
   - **Parquet.small-file-threshold**: the threshold file size. A smaller file can be handled in a special way (e.g. merged with other files) to improve performance and reduce the number of files in the storage.
   
   </tabpanel>
   <tabpanel>

   - **Name**: name of the connection.
   - **S3_access_key**: the public key to access the storage.
   - **S3_secret_key**: private key to access the storage.
   - **S3_endpoint**: The URL of your S3 vault.
   - **S3_bucket**: the name of the S3 bucket to which Trino will connect.
   - **S3_folder**: the name of the directory in the S3 bucket to which Trino will connect.
   - **S3_region**: the region in which your S3 repository is located.
   - **Parquet.small-file-threshold**: the threshold file size. A smaller file can be treated in a special way (e.g. merged with other files) to improve performance and reduce the number of files in the repository.
      
   </tabpanel>
   </tabs>

{/includetag}
{includetag(password)}

Password requirements:

- Can only contain upper and lower case Latin letters, numbers, and special characters `!`, `?`, `%`, `#`, `/`, `(`, `)`, `+`, `-`,`*`, `$`.
- Must be at least 16 characters long.
- Must contain at least one upper and one lower case letter of the Latin alphabet, at least one digit and one special character.

{/includetag}