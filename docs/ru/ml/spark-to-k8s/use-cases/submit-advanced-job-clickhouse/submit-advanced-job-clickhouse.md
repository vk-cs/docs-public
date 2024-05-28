Задания Spark можно отправлять на кластер разными способами:

- Для приложений Spark, у которых нет зависимостей, достаточно передать код приложения в манифесте задания. Этот подход показан [на примере вычисления числа π](../submit-basic-job-pi).
- Для приложений Spark, которые требуют дополнительные артефакты для своей работы, необходимо вручную добавить нужные артефакты в бакет [Cloud Storage](/ru/base/s3) и отредактировать манифест задания. Этот подход будет показан далее.

Для примера будет использоваться приложение, которое выполняет SQL-запрос к ClickHouse, развернутому в виде инстанса [Cloud Databases](/ru/dbs/dbaas).

## Подготовительные шаги

1. [Установите библиотеку](../../ml-platform-library/install), если это еще не сделано.
1. [Создайте токен доступа](../../ml-platform-library/authz) с ролью `Администратор`, если это еще не сделано. Этот токен нужен для работы с библиотекой.

   <err>

   Для простоты значение токена указано в примерах скриптов Python.

   При работе в production-среде не размещайте токен в скриптах в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными.

   </err>

1. [Создайте](../../instructions/create) кластер Cloud Spark.

   Параметры кластера выберите на свое усмотрение.

1. Получите информацию о кластерах Spark в проекте, выполнив скрипт:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'

   mlp = MLPlatform(REFRESH_TOKEN)
   print(mlp.get_clusters())
   ```

   Будет выведена подробная информация о кластерах.

1. Найдите и запишите идентификатор созданного кластера (содержится в поле `id`).

1. [Создайте инстанс ClickHouse](/ru/dbs/dbaas/instructions/create/create-single-replica), который:

   - использует самую новую из доступных версий;
   - использует конфигурацию Single;
   - имеет внешний IP-адрес и доступен из интернета;
   - имеет настроенного пользователя `user_spark`;
   - настроен на работу с новой базой данных `db_spark`.

   Запишите пароль пользователя, он понадобится позже.

1. Узнайте IP-адрес, назначенный созданному инстансу ClickHouse:

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится инстанс БД.
   1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
   1. Нажмите на имя инстанса и перейдите на вкладку **Информация**.
   1. Запишите внешний IP-адрес инстанса.

## 1. Создайте файл с кодом приложения Spark

Создайте файл `query-clickhouse.py` со следующим содержимым:

```python
import os
from pyspark.sql import SparkSession

CLICKHOUSE_IP = os.environ.get('CH_IP')
CLICKHOUSE_PORT = 8123
CLICKHOUSE_DB = 'db_spark'
CLICKHOUSE_USER = os.environ.get('CH_USER')
CLICKHOUSE_USER_PASSWORD = os.environ.get('CH_PASSWORD')
CLICKHOUSE_JDBC_DRIVER = os.environ.get('CH_DRIVER_JAR')

spark = SparkSession \
    .builder \
    .appName('PythonSparkClickHouse') \
    .config('spark.driver.extraClassPath', f'./{CLICKHOUSE_JDBC_DRIVER}') \
    .getOrCreate()

print("Reading ClickHouse table")

data_frame = spark.read.format('jdbc') \
    .option('url', f'jdbc:clickhouse://{CLICKHOUSE_IP}:{CLICKHOUSE_PORT}/{CLICKHOUSE_DB}') \
    .option('user', CLICKHOUSE_USER) \
    .option('password', CLICKHOUSE_USER_PASSWORD) \
    .option('query', 'SELECT * FROM system.build_options') \
    .option('driver', 'com.clickhouse.jdbc.ClickHouseDriver') \
    .load()

data_frame.show();
print("Finished reading ClickHouse table")

spark.stop()
```

Это код приложения Spark, которое подключается к инстансу ClickHouse и запрашивает информацию о сборке ClickHouse (build) с помощью SQL-запроса.

Для упрощения использования этого приложения некоторые параметры подключения задаются с помощью переменных среды окружения:

- Подключение к ClickHouse выполняется по IP-адресу `CH_IP` с помощью драйвера, который хранится в JAR-файле `CH_DRIVER_JAR`. Файл драйвера будет загружен позднее.
- Аутентификация в ClickHouse выполняется с помощью реквизитов `CH_USER` и `CH_PASSWORD`. Такой подход позволяет избежать размещения чувствительных данных непосредственно в коде.

Все упомянутые переменные среды окружения [будут заданы позднее](#3_otpravte_zadanie_spark_na_klaster) при отправке задания Spark на кластер.

## 2. Загрузите необходимые файлы в бакет

1. Определите имя бакета Cloud Storage, который используется кластером:

   1. Получите информацию о кластерах Spark в проекте, выполнив скрипт:

      ```python
      from mlplatform_client import MLPlatform

      REFRESH_TOKEN = '<значение токена доступа>'

      mlp = MLPlatform(REFRESH_TOKEN)
      print(mlp.get_clusters())
      ```

      Будет выведена подробная информация о кластерах.

   1. Найдите необходимую информацию:

      - идентификатор кластера (содержится в поле `id`);
      - имя бакета Cloud Storage (содержится в поле `s3_bucket_name`).

1. [Загрузите](/ru/base/s3/instructions/objects/upload-object#standartnaya_zagruzka) файлы в директорию `spark-files` этого бакета:

   - `query-clickhouse.py` с кодом приложения Spark.
   - [clickhouse-jdbc-0.5.0-shaded.jar](https://repo1.maven.org/maven2/com/clickhouse/clickhouse-jdbc/0.5.0/clickhouse-jdbc-0.5.0-shaded.jar) с JDBC-драйвером для ClickHouse.

     По ссылке размещен shaded-вариант JAR-файла, который включает в себя все необходимые зависимости для драйвера. Это упрощает использование драйвера с приложением Spark и работу с JAR-файлами при отправке задания Spark.

     При необходимости загрузите другую версию драйвера из [репозитория Maven](https://repo1.maven.org/maven2/com/clickhouse/clickhouse-jdbc/). В этом случае в приведенном ниже скрипте замените версию драйвера на нужную.

   <warn>

   При загрузке файлов не изменяйте выбранный по умолчанию ACL (`private`).

   </warn>

При отправке задания Spark будут указаны пути к файлам, загруженным в бакет. Кластер Cloud Spark уже имеет доступ к объектам из этого бакета, дополнительные настройки не нужны.

## 3. Отправьте задание Spark на кластер

1. Создайте файл `clickhouse-secret.yaml` со следующим содержимым:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: clickhouse-secret
   stringData:
     CH_USER: user_spark
     CH_PASSWORD: <пароль пользователя user_spark в ClickHouse>
   ```

   Этот файл описывает секрет Kubernetes, в котором хранятся реквизиты пользователя для подключения к инстансу ClickHouse.

1. Отправьте задание на кластер, выполнив скрипт:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'
   CLUSTER_ID = '<идентификатор кластера>'
   BUCKET_NAME = '<имя бакета, который используется кластером>'
   CLICKHOUSE_IP = '<внешний IP-адрес инстанса ClickHouse>'

   CLICKHOUSE_JDBC_DRIVER = 'clickhouse-jdbc-0.5.0-shaded.jar'
   JOB_NAME = 'clickhouse-spark-job'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   spark_job_manifest = mlp.get_default_manifest(cluster_id=CLUSTER_ID, job_name=JOB_NAME)

   spark_job_manifest.main_app_file = f's3a://{BUCKET_NAME}/spark-files/query-clickhouse.py'
   spark_job_manifest.add_jars([f's3a://{BUCKET_NAME}/spark-files/{CLICKHOUSE_JDBC_DRIVER}'])

   spark_job_manifest.add_driver_env(
       [
           {'name': 'CH_IP', 'value': CLICKHOUSE_IP},
           {'name': 'CH_DRIVER_JAR', 'value': CLICKHOUSE_JDBC_DRIVER}
       ])

   spark_job_manifest.add_executor_env(
       [
           {'name': 'CH_IP', 'value': CLICKHOUSE_IP},
           {'name': 'CH_DRIVER_JAR', 'value': CLICKHOUSE_JDBC_DRIVER}
       ])

   mlp.create_secret_from_yaml(cluster_id=CLUSTER_ID, secret_yaml_path='clickhouse-secret.yaml')
   spark_job_manifest.add_driver_env_from([{"secretRef": {"name": "clickhouse-secret"}}])
   spark_job_manifest.add_executor_env_from([{"secretRef": {"name": "clickhouse-secret"}}])

   spark_job_info = mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=spark_job_manifest)
   print(spark_job_info)
   ```

   Будет выведена информация об отправленном задании, например:

   ```text
   Job: clickhouse-spark-job, status: SUBMITTED, created_at: ...
   ```

   Ранее в бакет, который используется кластером, были загружены файлы, необходимые для работы приложения Spark. Манифест для задания Spark по умолчанию не содержит в себе сведений о том, где расположены необходимые файлы. Поэтому в манифест добавлена недостающая информация:

   - Путь к исполняемому файлу приложения Spark в `spark_job_manifest.main_app_file`;
   - Список путей к JAR-файлам, необходимых приложению (в данном случае нужен один файл с JDBC-драйвером). Для добавления путей к этим файлам используется функция `spark_job_manifest.add_jars()`.

   Также в манифест добавлены значения [необходимых переменных среды окружения](#1_sozdayte_fayl_s_kodom_prilozheniya_spark). Переменные `CH_USER` и `CH_PASSWORD` используются для аутентификации в ClickHouse, поэтому их значения извлекаются из секрета Kubernetes `clickhouse-secret`. Этот секрет был предварительно создан из файла `clickhouse-secret.yaml`.

## 4. Отслеживайте состояние задания Spark

1. Убедитесь, что в логах задания появился результат выполнения SQL-запроса к ClickHouse. Если результат не появился, запустите скрипт для получения логов еще раз: могут быть выведены промежуточные логи работы на момент, когда задание еще не завершилось.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'
   CLUSTER_ID = '<идентификатор кластера>'
   JOB_NAME = 'clickhouse-spark-job'

   mlp = MLPlatform(REFRESH_TOKEN)

   logs = mlp.spark_job_logs(CLUSTER_ID, JOB_NAME)
   print(logs)
   ```

   <details>
   <summary>Пример части вывода при успешном выполнении задания</summary>

   ```text
   ...
   Reading ClickHouse table
   ...

   +--------------------+--------------------+
   |                name|               value|
   +--------------------+--------------------+
   |        VERSION_FULL| ClickHouse 22.8.4.7|
   |    VERSION_DESCRIBE|    v22.8.4.7-stable|
   |     VERSION_INTEGER|            22008004|
   |              SYSTEM|               Linux|
   |     VERSION_GITHASH|baad27bcd2f8f9406...|
   |    VERSION_REVISION|               54465|
   |        VERSION_DATE|                    |
   |          BUILD_TYPE|      RelWithDebInfo|
   |    SYSTEM_PROCESSOR|              x86_64|
   |       CMAKE_VERSION|              3.16.3|
   |          C_COMPILER|   /usr/bin/clang-14|
   |  C_COMPILER_VERSION|              14.0.6|
   |        CXX_COMPILER| /usr/bin/clang++-14|
   |CXX_COMPILER_VERSION|              14.0.6|
   |             C_FLAGS| --gcc-toolchain=...|
   |           CXX_FLAGS| --gcc-toolchain=...|
   |          LINK_FLAGS| --gcc-toolchain=...|
   |BUILD_COMPILE_DEF...|HAS_RESERVED_IDEN...|
   |              STATIC|                  ON|
   |USE_EMBEDDED_COMP...|                   1|
   +--------------------+--------------------+
   only showing top 20 rows

   Finished reading ClickHouse table
   ...
   ```

   </details>

1. (Опционально) Получите информацию о событиях в кластере. Она позволяет узнать текущее состояние кластера и заданий, например при поиске проблем.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'
   CLUSTER_ID = '<идентификатор кластера>'

   mlp = MLPlatform(REFRESH_TOKEN)

   events = mlp.spark_events(CLUSTER_ID)
   print(events)
   ```

## Удалите неиспользуемые ресурсы

Если созданные ресурсы вам больше не нужны, удалите их:

1. Удалите кластер Cloud Spark.
1. Удалите реестр Docker для этого кластера.
1. Удалите [объекты из бакета](/ru/storage/s3/instructions/objects/manage-object#udalenie_obekta) и [сам бакет](/ru/storage/s3/instructions/buckets/manage-bucket#udalenie_baketa), который использовался этим кластером.
1. [Удалите токен доступа](../../ml-platform-library/authz#udalenie_tokena_dostupa).
1. [Удалите инстанс ClickHouse](/ru/dbs/dbaas/instructions/manage-instance/clickhouse#udalenie_instansa_bd).
