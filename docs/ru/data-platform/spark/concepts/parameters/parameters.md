При создании или редактировании экземпляра сервиса Cloud Spark вы можете настроить его параметры.
Они определяют, как экземпляр Cloud Spark выполняет задачи и взаимодействует с другими сервисами.
К ним относятся:

* Версия Apache Spark: влияет на функциональность, производительность и стабильность при выполнении задач Spark.
* Параметры подключений: определяют сервисы, к которым будет подключаться экземпляр Cloud Spark для чтения и записи информации.

Задать эти параметры можно через [личный кабинет VK Cloud](https://msk.cloud.vk.com/app/) или через Terraform.

## {heading(Настройки Spark)[id=parameters_spark_settings]}

Параметры для настройки экземпляра Spark:

[cols="1,1,2", options="header"]
|===
|Параметр в личном кабинете
|Параметр в Terraform
|Описание

|Версия Spark
|`sparkproxy_spark_version`
|Версия Spark, используемая при запуске задач
|===

## {heading(Источники данных)[id=parameters_data_sources]}

Параметры для добавления источников данных в экземпляр Spark:

[cols="1,1,2", options="header"]
|===
|Параметр в личном кабинете
|Параметр в Terraform
|Описание

|`S3 VK Cloud`
|`s3_int`
|{linkto(#parameters_s3_int)[text=Подключение]} к облачному хранилищу Cloud Storage в том же проекте

|`Iceberg Metastore VK Cloud`
|`iceberg_int`
|{linkto(#parameters_iceberg_int)[text=Подключение]} к облачному хранилищу Cloud Iceberg Metastore

|`S3 внешний`
|`s3_ext`
|{linkto(#parameters_s3_ext)[text=Подключение]} к внешнему облачному S3-хранилищу

|`Iceberg Metastore внешний`
|`iceberg_ext`
|{linkto(#parameters_iceberg_ext)[text=Подключение]} к внешнему облачному хранилищу Iceberg Metastore

|`PostgreSQL`
|`postgresql`
|{linkto(#parameters_postgresql)[text=Подключение]} к базе данных PostgreSQL
|===

## {heading(Подключение к Cloud Storage)[id=parameters_s3_int]}

Параметры для подключения источника данных `S3 VK Cloud` к экземпляру Spark:

[cols="1,1,2", options="header"]
|===
|Параметр в личном кабинете
|Параметр в Terraform
|Описание

|Имя внутреннего подключения S3
|`name`
|Имя подключения к Cloud Storage, отображаемое в личном кабинете

|S3 URL
|`s3_endpoint`
|Домен S3-хранилища. Пример: `https://hb.ru-msk.vkcloud-storage.ru`

|Регион
|`s3_region`
|[Регион](/ru/tools-for-using-services/account/concepts/regions) расположения S3-хранилища

|Бакет
|`s3_bucket`
|Уникальное имя бакета Cloud Storage

|Путь в бакете S3
|`s3_folder`
|Логическая структура внутри бакета для организации и группировки объектов. Примеры: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|Идентификатор ключа доступа к S3-хранилищу

|Secret Key
|`s3_secret_key`
|Секретный ключ для доступа к S3-хранилищу
|=== 

## {heading(Подключение к Cloud Iceberg Metastore)[id=parameters_iceberg_int]}

Параметры для подключения источника данных `Iceberg Metastore VK Cloud` к экземпляру Spark:

[cols="1,1,2", options="header"]
|===
|Параметр в личном кабинете
|Параметр в Terraform
|Описание

|Имя внутреннего подключения Iceberg Metastore
|`name`
|Имя подключения к Cloud Iceberg Metastore, отображаемое в личном кабинете

|Имя бакета в S3 VK Cloud
|`s3_bucket`
|Уникальное имя бакета Cloud Storage, который используется только для хранения внутренних данных приложений

|Путь в бакете Iceberg Metastore S3
|`s3_folder`
|Логическая структура внутри бакета для организации и группировки объектов. Примеры: `logs`, `logsfolder`

|Имя базы данных Iceberg
|`db_name`
|Имя базы данных Iceberg Metastore, к которой подключается Spark

|Имя хоста БД Iceberg
|`hostname`
|Хост и порт базы данных Iceberg Metastore в формате `<ХОСТ>:<ПОРТ>`. Примеры: `localhost:5432`, `127.0.0.1:5432`

|Имя пользователя Iceberg
|`username`
|Логин учетной записи для подключения Spark к Iceberg Metastore

|Пароль пользователя
|`password`
|Пароль учетной записи для подключения Spark к Iceberg Metastore

|Имя каталога, к которому будет подключен Spark
|`catalog`
|Директория для подключения по умолчанию. Используется в настройках Spark `spark.sql.defaultCatalog=<ДИРЕКТОРИЯ>`
|=== 

## {heading(Подключение к внешнему S3-хранилищу)[id=parameters_s3_ext]}

Параметры для подключения источника данных `S3 внешний` к экземпляру Spark:

[cols="1,1,2", options="header"]
|===
|Параметр в личном кабинете
|Параметр в Terraform
|Описание

|Имя внешнего подключения S3
|`name`
|Имя подключения к внешнему S3, отображаемое в личном кабинете

|S3 URL
|`s3_endpoint`
|Домен S3-хранилища

|Регион
|`s3_region`
|Регион расположения S3-хранилища

|Бакет
|`s3_bucket`
|Уникальное имя бакета

|Путь в бакете S3
|`s3_folder`
|Логическая структура внутри бакета для организации и группировки объектов. Примеры: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|Идентификатор ключа доступа к S3-хранилищу

|Secret Key
|`s3_secret_key`
|Секретный ключ для доступа к S3-хранилищу
|===

## {heading(Подключение к внешнему Iceberg Metastore)[id=parameters_iceberg_ext]}

Параметры для подключения источника данных `Iceberg Metastore внешний` к экземпляру Spark:

[cols="1,1,2", options="header"]
|===
|Параметр в личном кабинете
|Параметр в Terraform
|Описание

|Имя внешнего подключения к Iceberg Metastore
|`name`
|Имя подключения к внешнему Iceberg Metastore, отображаемое в личном кабинете

|S3 URL
|`s3_endpoint`
|Домен S3-хранилища

|Регион S3
|`s3_region`
|Регион расположения S3-хранилища

|Имя бакета в вашем S3 сервисе
|`s3_bucket`
|Уникальное имя бакета S3

|Путь в бакете S3
|`s3_folder`
|Логическая структура внутри бакета для организации и группировки объектов. Примеры: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|Идентификатор ключа доступа к S3-хранилищу

|Secret Key
|`s3_secret_key`
|Секретный ключ для доступа к S3-хранилищу

|Имя базы данных Iceberg
|`db_name`
|Имя базы данных Iceberg Metastore, к которой подключается Spark

|Имя хоста БД Iceberg
|`hostname`
|Хост и порт базы данных Iceberg Metastore в формате `<ХОСТ>:<ПОРТ>`. Примеры: `localhost:5432`, `127.0.0.1:5432`

|Имя пользователя Iceberg
|`username`
|Логин учетной записи для подключения Spark к Iceberg Metastore

|Пароль пользователя
|`password`
|Пароль учетной записи для подключения Spark к Iceberg Metastore

|Имя каталога, к которому будет подключен Spark
|`catalog`
|Директория для подключения по умолчанию. Используется в настройках Spark `spark.sql.defaultCatalog=<ДИРЕКТОРИЯ>`
|===

## {heading(Подключение к PostgreSQL)[id=parameters_postgresql]}

Параметры для подключения источника данных `PostgreSQL` к экземпляру Spark:

[cols="1,1,2", options="header"]
|===
|Параметр в личном кабинете
|Параметр в Terraform
|Описание

|PostgreSQL
|`name`
|Имя подключения к PostgreSQL, отображаемое в личном кабинете

|Имя хоста БД
|`hostname`
|Хост и порт базы данных PostgreSQL в формате `<ХОСТ>:<ПОРТ>`. Примеры: `localhost:5432`, `127.0.0.1:5432`

|Имя базы данных
|`db_name`
|Имя базы данных PostgreSQL, к которой подключается Spark

|Имя пользователя
|`username`
|Логин учетной записи для подключения Spark к PostgreSQL

|Пароль пользователя
|`password`
|Пароль учетной записи для подключения Spark к PostgreSQL

|Сертификат TLS
|`tls_crt`
|Сертификат TLS для безопасного подключения
|===