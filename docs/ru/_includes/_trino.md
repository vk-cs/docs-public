{includetag(open)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Data Platform → Экземпляры сервисов**.
1. Нажмите на название нужного экземпляра.

{/includetag}
{includetag(connect)}

1. Выберите источник:

   - `PostgreSQL` — подключение к базе данных PostgreSQL.
   - `Greenplum` — подключение к базе данных Greenplum.
   - `Clickhouse` — подключение к базе данных ClickHouse.
   - `Apache Iceberg с S3 VK Cloud` — подключение к Cloud Storage в том же проекте.
   - `Apache Iceberg с внешним S3` — подключение к внешнему объектному хранилищу S3.
1. Настройте параметры подключения к источнику:

   <tabs>
   <tablist>
   <tab>PostgreSQL, Greenplum, ClickHouse</tab>
   <tab>S3 VK Cloud</tab>
   <tab>Внешний S3</tab>
   </tablist>
   <tabpanel>
   
   - **Название**: имя подключения.
   - **db_name**: имя базы данных, к которой Trino будет подключаться.
   - **hostname**: адрес сервера для подключения. Пример: `postgresql-primary.postgresqlcluster-gttxnz96.svc:5432`.
   - **username**: имя учетной записи пользователя базы данных.
   - **password**: пароль учетной записи пользователя базы данных.
   - **tls_crt**: путь к файлу TLS-сертификата. Использование TLS-сертификата помогает защитить данные при передаче и повысить безопасность подключения.
      
   </tabpanel>
   <tabpanel>
      
   - **Название**: имя подключения.
   - **s3_bucket**: имя бакета Cloud Storage, к которому Trino будет подключаться.
   - **s3_folder**: имя директории в бакете Cloud Storage, к которой Trino будет подключаться.
   - **parquet.small-file-threshold**: пороговый размер файла. Файл меньшего размера может быть обработан особым образом (например, объединен с другими файлами) для улучшения производительности и уменьшения количества файлов в хранилище.
   
   </tabpanel>
   <tabpanel>

   - **Название**: имя подключения.
   - **s3_access_key**: публичный ключ для доступа к хранилищу.
   - **s3_secret_key**: приватный ключ для доступа к хранилищу.
   - **s3_endpoint**: URL-адрес вашего хранилища S3.
   - **s3_bucket**: имя бакета S3, к которому Trino будет подключаться.
   - **s3_folder**: имя директории в бакете S3, к которой Trino будет подключаться.
   - **s3_region**: регион, в котором расположено ваше хранилище S3.
   - **parquet.small-file-threshold**: пороговый размер файла. Файл меньшего размера может быть обработан особым образом (например, объединен с другими файлами) для улучшения производительности и уменьшения количества файлов в хранилище.
      
   </tabpanel>
   </tabs>

{/includetag}
{includetag(password)}

Требования к паролю:

- может содержать только заглавные и строчные латинские буквы, цифры и символы `!`, `?`, `%`, `#`, `/`, `(`, `)`, `+`, `-`,`*`, `$`;
- должен состоять как минимум из 16 символов;
- должен содержать хотя бы одну заглавную и одну строчную букву латинского алфавита, хотя бы одну цифру и один символ.

{/includetag}