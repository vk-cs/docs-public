{include(/kz/_includes/_translated_by_ai.md)}

Cloud Spark сервисінің данасын жасау немесе өңдеу кезінде оның параметрлерін баптай аласыз.
Олар Cloud Spark данасының тапсырмаларды қалай орындайтынын және басқа сервистермен қалай өзара әрекеттесетінін анықтайды.
Оларға мыналар жатады:

* Apache Spark нұсқасы: Spark тапсырмаларын орындау кезінде функционалдылыққа, өнімділікке және тұрақтылыққа әсер етеді.
* Қосылым параметрлері: Cloud Spark данасы ақпаратты оқу және жазу үшін қосылатын сервистерді анықтайды.

Бұл параметрлерді [VK Cloud жеке кабинеті](https://kz.cloud.vk.com/app/) арқылы немесе Terraform арқылы орнатуға болады.

## {heading(Spark баптаулары)[id=parameters_spark_settings]}

Spark данасын баптауға арналған параметрлер:

[cols="1,1,2", options="header"]
|===
|Жеке кабинеттегі параметр
|Terraform-тағы параметр
|Сипаттамасы

|Spark нұсқасы
|`sparkproxy_spark_version`
|Тапсырмаларды іске қосу кезінде пайдаланылатын Spark нұсқасы
|===

## {heading(Дереккөздер)[id=parameters_data_sources]}

Spark данасына дереккөздерді қосуға арналған параметрлер:

[cols="1,1,2", options="header"]
|===
|Жеке кабинеттегі параметр
|Terraform-тағы параметр
|Сипаттамасы

|`S3 VK Cloud`
|`s3_int`
|{linkto(#parameters_s3_int)[text=Қосылым]} сол жобадағы {var(s3)} бұлттық қоймасына

|`Iceberg Metastore VK Cloud`
|`iceberg_int`
|{linkto(#parameters_iceberg_int)[text=Қосылым]} Cloud Iceberg Metastore бұлттық қоймасына

|`S3 внешний`
|`s3_ext`
|{linkto(#parameters_s3_ext)[text=Қосылым]} сыртқы бұлттық S3 қоймасына

|`Iceberg Metastore внешний`
|`iceberg_ext`
|{linkto(#parameters_iceberg_ext)[text=Қосылым]} сыртқы бұлттық Iceberg Metastore қоймасына

|`PostgreSQL`
|`postgresql`
|{linkto(#parameters_postgresql)[text=Қосылым]} PostgreSQL дерекқорына
|===

## {heading(VK Object Storage-ке қосылу)[id=parameters_s3_int]}

`S3 VK Cloud` дереккөзін Spark данасына қосуға арналған параметрлер:

[cols="1,1,2", options="header"]
|===
|Жеке кабинеттегі параметр
|Terraform-тағы параметр
|Сипаттамасы

|Ішкі S3 қосылымының атауы
|`name`
|Жеке кабинетте көрсетілетін {var(s3)} жүйесіне қосылым атауы

|S3 URL
|`s3_endpoint`
|S3 қоймасының домені. Мысал: `https://hb.ru-msk.vkcloud-storage.ru`

|Аймақ
|`s3_region`
|S3 қоймасы орналасқан [аймақ](/kz/tools-for-using-services/account/concepts/regions)

|Бакет
|`s3_bucket`
|{var(s3)} бакетінің бірегей атауы

|S3 бакетіндегі жол
|`s3_folder`
|Объектілерді ұйымдастыру және топтастыру үшін бакет ішіндегі логикалық құрылым. Мысалдар: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|S3 қоймасына қол жеткізу кілтінің идентификаторы

|Secret Key
|`s3_secret_key`
|S3 қоймасына қол жеткізуге арналған құпия кілт
|=== 

## {heading(Cloud Iceberg Metastore-ге қосылу)[id=parameters_iceberg_int]}

`Iceberg Metastore VK Cloud` дереккөзін Spark данасына қосуға арналған параметрлер:

[cols="1,1,2", options="header"]
|===
|Жеке кабинеттегі параметр
|Terraform-тағы параметр
|Сипаттамасы

|Ішкі Iceberg Metastore қосылымының атауы
|`name`
|Жеке кабинетте көрсетілетін Cloud Iceberg Metastore-ге қосылым атауы

|S3 VK Cloud ішіндегі бакет атауы
|`s3_bucket`
|{var(s3)} бакетінің бірегей атауы. Бұл бакет тек қолданбалардың ішкі деректерін сақтау үшін пайдаланылады

|Iceberg Metastore S3 бакетіндегі жол
|`s3_folder`
|Объектілерді ұйымдастыру және топтастыру үшін бакет ішіндегі логикалық құрылым. Мысалдар: `logs`, `logsfolder`

|Iceberg дерекқорының атауы
|`db_name`
|Spark қосылатын Iceberg Metastore дерекқорының атауы

|Iceberg ДҚ хостының атауы
|`hostname`
|`<ХОСТ>:<ПОРТ>` форматындағы Iceberg Metastore дерекқорының хосты мен порты. Мысалдар: `localhost:5432`, `127.0.0.1:5432`

|Iceberg пайдаланушысының аты
|`username`
|Spark-ті Iceberg Metastore-ге қосуға арналған тіркелгі логині

|Пайдаланушы құпиясөзі
|`password`
|Spark-ті Iceberg Metastore-ге қосуға арналған тіркелгі құпиясөзі

|Spark қосылатын каталог атауы
|`catalog`
|Әдепкі бойынша қосылатын директория. Spark баптауларында `spark.sql.defaultCatalog=<ДИРЕКТОРИЯ>` ретінде пайдаланылады
|=== 

## {heading(Сыртқы S3 қоймасына қосылу)[id=parameters_s3_ext]}

`S3 внешний` дереккөзін Spark данасына қосуға арналған параметрлер:

[cols="1,1,2", options="header"]
|===
|Жеке кабинеттегі параметр
|Terraform-тағы параметр
|Сипаттамасы

|Сыртқы S3 қосылымының атауы
|`name`
|Жеке кабинетте көрсетілетін сыртқы S3-ке қосылым атауы

|S3 URL
|`s3_endpoint`
|S3 қоймасының домені

|Аймақ
|`s3_region`
|S3 қоймасы орналасқан аймақ

|Бакет
|`s3_bucket`
|Бакеттің бірегей атауы

|S3 бакетіндегі жол
|`s3_folder`
|Объектілерді ұйымдастыру және топтастыру үшін бакет ішіндегі логикалық құрылым. Мысалдар: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|S3 қоймасына қол жеткізу кілтінің идентификаторы

|Secret Key
|`s3_secret_key`
|S3 қоймасына қол жеткізуге арналған құпия кілт
|===

## {heading(Сыртқы Iceberg Metastore-ге қосылу)[id=parameters_iceberg_ext]}

`Iceberg Metastore внешний` дереккөзін Spark данасына қосуға арналған параметрлер:

[cols="1,1,2", options="header"]
|===
|Жеке кабинеттегі параметр
|Terraform-тағы параметр
|Сипаттамасы

|Сыртқы Iceberg Metastore-ге қосылым атауы
|`name`
|Жеке кабинетте көрсетілетін сыртқы Iceberg Metastore-ге қосылым атауы

|S3 URL
|`s3_endpoint`
|S3 қоймасының домені

|S3 аймағы
|`s3_region`
|S3 қоймасы орналасқан аймақ

|S3 сервисіңіздегі бакет атауы
|`s3_bucket`
|S3 бакетінің бірегей атауы

|S3 бакетіндегі жол
|`s3_folder`
|Объектілерді ұйымдастыру және топтастыру үшін бакет ішіндегі логикалық құрылым. Мысалдар: `logs`, `logsfolder`

|Access Key
|`s3_access_key`
|S3 қоймасына қол жеткізу кілтінің идентификаторы

|Secret Key
|`s3_secret_key`
|S3 қоймасына қол жеткізуге арналған құпия кілт

|Iceberg дерекқорының атауы
|`db_name`
|Spark қосылатын Iceberg Metastore дерекқорының атауы

|Iceberg ДҚ хостының атауы
|`hostname`
|`<ХОСТ>:<ПОРТ>` форматындағы Iceberg Metastore дерекқорының хосты мен порты. Мысалдар: `localhost:5432`, `127.0.0.1:5432`

|Iceberg пайдаланушысының аты
|`username`
|Spark-ті Iceberg Metastore-ге қосуға арналған тіркелгі логині

|Пайдаланушы құпиясөзі
|`password`
|Spark-ті Iceberg Metastore-ге қосуға арналған тіркелгі құпиясөзі

|Spark қосылатын каталог атауы
|`catalog`
|Әдепкі бойынша қосылатын директория. Spark баптауларында `spark.sql.defaultCatalog=<ДИРЕКТОРИЯ>` ретінде пайдаланылады
|===

## {heading(PostgreSQL-ге қосылу)[id=parameters_postgresql]}

`PostgreSQL` дереккөзін Spark данасына қосуға арналған параметрлер:

[cols="1,1,2", options="header"]
|===
|Жеке кабинеттегі параметр
|Terraform-тағы параметр
|Сипаттамасы

|PostgreSQL
|`name`
|Жеке кабинетте көрсетілетін PostgreSQL-ге қосылым атауы

|ДҚ хостының атауы
|`hostname`
|`<ХОСТ>:<ПОРТ>` форматындағы PostgreSQL дерекқорының хосты мен порты. Мысалдар: `localhost:5432`, `127.0.0.1:5432`

|Дерекқор атауы
|`db_name`
|Spark қосылатын PostgreSQL дерекқорының атауы

|Пайдаланушы аты
|`username`
|Spark-ті PostgreSQL-ге қосуға арналған тіркелгі логині

|Пайдаланушы құпиясөзі
|`password`
|Spark-ті PostgreSQL-ге қосуға арналған тіркелгі құпиясөзі

|TLS сертификаты
|`tls_crt`
|Қауіпсіз қосылуға арналған TLS сертификаты
|===
