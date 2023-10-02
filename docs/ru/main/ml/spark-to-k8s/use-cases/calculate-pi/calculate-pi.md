Кластер Spark выполняет задания Spark. Такие задания можно отправить на кластер разными способами. Далее будет продемонстрирован самый простой способ отправки задания, при котором достаточно только передать код приложения Spark. В качестве примера будет использоваться приложение для вычисления приближенного значения числа π.

## Подготовительные шаги

1. Подготовьте окружение для работы с Python любым удобным для вас способом:

   <tabs>
   <tablist>
   <tab>С помощью VK Cloud</tab>
   <tab>Самостоятельно</tab>
   </tablist>
   <tabpanel>

   [Создайте инстанс JupyterHub](/ru/ml/mlplatform/jupyterhub/start/create) на платформе VK Cloud. Он уже содержит в себе настроенные Python 3.x и pip, с которыми можно работать из блокнота JupyterHub (notebook).

   </tabpanel>
   <tabpanel>

   1. Установите Python 3.x и pip.
   1. При необходимости настройте виртуальное окружение (virtual environment) для Python.

   Например, можно воспользоваться [conda](https://conda.io/projects/conda/en/latest/index.html) или выполнить установку и настройку вручную.

   </tabpanel>
   </tabs>

1. Установите библиотеку ML Platform для Python:

   1. Загрузите [файл с библиотекой](https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz).

      По приведенной ссылке всегда доступна самая актуальная версия библиотеки.

   1. Установите пакеты из загруженного файла:

      <tabs>
      <tablist>
      <tab>Блокнот JupyterHub</tab>
      <tab>pip</tab>
      </tablist>
      <tabpanel>

      ```bash
      %pip install mlplatform_client.tar.gz
      ```

      </tabpanel>
      <tabpanel>

      ```bash
      pip install mlplatform_client.tar.gz
      ```

      </tabpanel>
      </tabs>

1. [Создайте токен доступа](../../instructions/tokens#sozdanie_tokena_dostupa), который нужен для работы с библиотекой.

   Подойдет токен как с ролью `Администратор`, так и с ролью `Пользователь`.

   <warn>

   Для упрощения изложения значение токена содержится непосредственно в примерах скриптов Python.

   Значение токена — чувствительная информация. Примите необходимые меры предосторожности при работе с ним, чтобы избежать утечек.

   </warn>

1. [Создайте](../../instructions/create) кластер Spark.

   Параметры кластера выберите на свое усмотрение.

1. Выполните скрипт, чтобы получить информацию о кластерах Spark в проекте:

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

Далее применяется сценарий, в котором задание отправляется на кластер вместе с Python-кодом приложения Spark:

1. С помощью библиотеки ML Platform загружается манифест по умолчанию, описывающий задание.
1. С помощью библиотеки ML Platform на кластер с указанным идентификатором отправляется задание с именем `pi-spark-job`.

   При этом необходимо указать манифест и имя файла с Python-кодом приложения Spark для выполнения на кластере. Библиотека ML Platform сама скорректирует данные манифеста так, чтобы можно было выполнить код из указанного файла. В данном случае нет необходимости вносить исправления в манифест или загружать дополнительные файлы в бакет кластера: для вычисления числа π не требуется указывать дополнительные зависимости, загружать файлы с данными и т. д.

Выполните скрипт, чтобы отправить задание на кластер по указанному сценарию:

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

## 3. Отслеживайте состояние задания Spark

1. Выполните скрипт Python, чтобы получить логи задания:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<значение токена доступа>"
   CLUSTER_ID = "<идентификатор кластера>"
   JOB_NAME = "pi-spark-job"

   mlp = MLPlatform(REFRESH_TOKEN)

   logs = mlp.spark_job_logs(CLUSTER_ID, JOB_NAME)
   print(logs)
   ```

   Этот скрипт выведет логи задания Spark на момент выполнения скрипта.

1. (Опционально) Выполните скрипт Python, чтобы получить события кластера:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<значение токена доступа>"
   CLUSTER_ID = "<идентификатор кластера>"

   mlp = MLPlatform(REFRESH_TOKEN)

   events = mlp.spark_events(CLUSTER_ID)
   print(events)
   ```

   Этот скрипт выведет события кластера Spark на момент выполнения скрипта. Информация о событиях необходима для понимания текущего состояния кластера и заданий, а также при поиске проблем.

1. Изучите логи: в них будет содержаться результат вычисления числа π. Может потребоваться запустить скрипт для получения логов несколько раз, чтобы увидеть результат вычислений: между запуском задания и его завершением должно пройти некоторое время. Пример вывода:

   ```text
   Pi is roughly 3.146360
   ```

   Такой вывод свидетельствует об успешном выполнении задания по вычислению числа π.

## Удалите неиспользуемые ресурсы

Если созданные ресурсы вам больше не нужны, удалите их:

1. Удалите кластер Spark.
1. Удалите реестр Docker для этого кластера Spark.
1. [Удалите токен доступа](../../instructions/tokens#udalenie_tokena_dostupa).
