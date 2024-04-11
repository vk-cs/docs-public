Задания Spark можно отправлять на кластер разными способами:

- Для приложений Spark, у которых нет зависимостей, достаточно передать код приложения в манифесте задания. Этот подход будет показан далее.
- Для приложений Spark, которые требуют дополнительные артефакты для своей работы, необходимо вручную добавить нужные артефакты в бакет [Cloud Storage](/ru/base/s3) и отредактировать манифест задания. Этот подход показан [на примере работы с ClickHouse](../submit-advanced-job-clickhouse/).

Для примера будет использоваться приложение, которое вычисляет приближенное значение числа π.

## Подготовительные шаги

1. [Установите](../../ml-platform-library/install) библиотеку Cloud ML Platform.

1. [Создайте токен доступа](../../ml-platform-library/authz). Этот токен нужен для работы с библиотекой.

   Подойдет токен как с ролью `Администратор`, так и с ролью `Пользователь`.

   <err>

   Для простоты значение токена указано в примерах скриптов Python.

   При работе в production-среде не размещайте токен в скриптах в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными.

   </err>

1. [Создайте](../../instructions/create) кластер Spark.

   Параметры кластера выберите на свое усмотрение.

1. Получите информацию о кластерах Spark в проекте, выполнив скрипт:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<значение токена доступа>"

   mlp = MLPlatform(REFRESH_TOKEN)
   print(mlp.get_clusters())
   ```

   Будет выведена подробная информация о кластерах.

1. Найдите и запишите идентификатор созданного кластера (содержится в поле `id`).

## 1. Создайте файл с кодом приложения Spark

Это приложение вычисляет приближенное значение числа π методом Монте-Карло, распределяя вычисления по узлам кластера Spark.

<details>
<summary>calculate-pi.py</summary>

```python
import sys
from random import random
from operator import add
from pyspark.sql import SparkSession

spark = SparkSession \
    .builder \
    .appName("PythonPi") \
    .getOrCreate()

partitions = int(sys.argv[1]) if len(sys.argv) > 1 else 2
n = 100000 * partitions

def f(_: int) -> float:
    x = random() * 2 - 1
    y = random() * 2 - 1
    return 1 if x ** 2 + y ** 2 <= 1 else 0

count = spark.sparkContext.parallelize(range(1, n + 1), partitions).map(f).reduce(add)
print("Pi is roughly %f" % (4.0 * count / n))

spark.stop()
```

</details>

## 2. Отправьте задание Spark на кластер

Отправьте задание на кластер, выполнив скрипт:

```python
from mlplatform_client import MLPlatform
   
REFRESH_TOKEN = "<значение токена доступа>"
CLUSTER_ID = "<идентификатор кластера>"

PY_FILE = "calculate-pi.py"
JOB_NAME = "pi-spark-job"
   
mlp = MLPlatform(REFRESH_TOKEN)
   
spark_job_manifest = mlp.get_default_manifest(CLUSTER_ID, JOB_NAME)
spark_job_info = mlp.spark_submit_job(CLUSTER_ID, spark_job_manifest, PY_FILE)
   
print(spark_job_info)
```

Будет выведена информация об отправленном задании, например:

```text
Job: pi-spark-job, status: SUBMITTED, created_at: ...
```

Манифест для задания Spark по умолчанию не содержит в себе сведений о том, где расположены файлы, необходимые для работы приложения Spark.

Для работы приложения, которое вычисляет число π, требуется [только один исполняемый файл](#1_sozdayte_fayl_s_kodom_prilozheniya_spark), никаких дополнительных артефактов не используется.

В таком простом случае не нужно размещать исполняемый файл приложения Spark в бакете Object Storage, а затем править манифест по умолчанию, чтобы добавить в манифест необходимые сведения.

Достаточно передать имя исполняемого файла при отправке задания на кластер:

```python
spark_job_info = mlp.spark_submit_job(CLUSTER_ID, spark_job_manifest, PY_FILE)
```

Библиотека Cloud ML Platform сама скорректирует манифест так, чтобы можно было выполнить код из указанного файла.

## 3. Отслеживайте состояние задания Spark

1. Убедитесь, что в логах задания появился результат вычисления числа π. Если результат не появился, запустите скрипт для получения логов еще раз: могут быть выведены промежуточные логи работы на момент, когда задание еще не завершилось.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<значение токена доступа>"
   CLUSTER_ID = "<идентификатор кластера>"
   JOB_NAME = "pi-spark-job"

   mlp = MLPlatform(REFRESH_TOKEN)

   logs = mlp.spark_job_logs(CLUSTER_ID, JOB_NAME)
   print(logs)
   ```

   <details>
   <summary>Пример части вывода при успешном выполнении задания</summary>

   ```text
   Pi is roughly 3.146360
   ```

   </details>

1. (Опционально) Получите информацию о событиях в кластере. Она позволяет узнать текущее состояние кластера и заданий, например при поиске проблем.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<значение токена доступа>"
   CLUSTER_ID = "<идентификатор кластера>"

   mlp = MLPlatform(REFRESH_TOKEN)

   events = mlp.spark_events(CLUSTER_ID)
   print(events)
   ```

## Удалите неиспользуемые ресурсы

Если созданные ресурсы вам больше не нужны, удалите их:

1. Удалите кластер Spark.
1. Удалите реестр Docker для этого кластера Spark.
1. [Удалите токен доступа](../../instructions/tokens#udalenie_tokena_dostupa).
