# {heading(Пример создания и запуска Spark-задачи)[id=run_jobs]}

В инструкции показано как создавать и запускать Spark-задачи в Cloud Spark на примере скрипта для расчета числа Пи. Все действия разделены на шаги:

1. {linkto(#run_jobs_install_client)[text=Установка Spark-клиента]}.
1. {linkto(#run_jobs_env)[text=Подготовка окружения]}.
1. {linkto(#run_jobs_create_job)[text=Создание скрипта Spark-задачи]}.
1. {linkto(#run_jobs_main)[text=Создание основного скрипта для запуска Spark-задачи]}.
1. {linkto(#run_jobs_run)[text=Запуск Spark-задачи]}.

{note:info}
Перед началом работы убедитесь, что экземпляр сервиса {linkto(../create#spark_create)[text=Cloud Spark]} развернут.
{/note}

## {heading(Шаг 1. Установка Spark-клиента)[id=run_jobs_install_client]}

Подключение к Cloud Spark выполняется только через специальный Spark-клиент. Используйте один из двух способов для его установки:

- Если доступна установка через pip, выполните:

  ```bash
  pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
  ```

- Если недоступна установка через pip, скачайте, распакуйте и установите клиент, соответствующий вашей ОС и версии Python, по ссылкам ниже.

  {cut(Файлы для загрузки Spark-клиента)}

  - [CentOS, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-centos.zip)
  - [CentOS, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-centos.zip)
  - [CentOS, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-centos.zip)
  - [РЕД ОС, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-redos.zip)
  - [РЕД ОС, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-redos.zip)
  - [РЕД ОС, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-redos.zip)
  - [РЕД ОС, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-redos.zip)
  - [AlmaLinux, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-almalinux.zip)

  {/cut}


## {heading(Шаг 2. Подготовка окружения)[id=run_jobs_env]}

1. Задайте переменные окружения:
    
   ```bash
   AWS_ACCESS_KEY_ID=<КЛЮЧ_ДОСТУПА>
   AWS_REGION=<РЕГИОН_S3>
   AWS_SECRET_ACCESS_KEY=<СЕКРЕТНЫЙ_КЛЮЧ>
   BUCKET_NAME=<НАЗВАНИЕ_БАКЕТА_S3>
   KEYSTONE_PASSWORD=<ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ_DATA_PLATFORM>
   KEYSTONE_USERNAME=<ПОЧТА_ПОЛЬЗОВАТЕЛЯ_DATA_PLATFORM>
   ML_PLATFORM_HOST=<АДРЕС_CLOUD_SPARK>
   S3_ENDPOINT=<ЭНДПОИНТ_S3>
   ```

1. Создайте отдельную директорию для запуска кода, в которую будете копировать скрипты из инструкции. Внутри директории:
  1. Разместите файлы скриптов.
  1. Создайте директорию `/jobs`, в которую будете размещать Spark-задачу из инструкции ниже.

   Пример структуры директории:

   ```bash
   └── spark_kafka
      ├── jobs
      │   └── job.py
      └── main.py
   ```

## {heading(Шаг 3. Создание Spark-задачи)[id=run_jobs_create_job]}

1. В директории `/jobs` создайте файл с расширением `.py`. Пример: `job.py`.
1. Укажите код Spark-задачи в файле. Для примера используйте скрипт расчета числа Пи:

   ```Python
   import sys 
   from operator import add
   from random import random
   
   from pyspark.sql import SparkSession
   
   
   """ Usage: pi [partitions]"""
   spark = SparkSession.builder.appName("PythonPi").getOrCreate()
   
   partitions = int(sys.argv[1]) if len(sys.argv) > 1 else 2
   n = 100000 * partitions
   
   
   def f(_: int) -> float:
   x, y = random() * 2 - 1, random() * 2 - 1  # noqa: S311
   return 1 if x**2 + y**2 <= 1 else 0
   
   
   count = spark.sparkContext.parallelize(range(1, n + 1), partitions).map(f).reduce(add)
   print("Pi is roughly %f" % (4.0 * count / n))
   
   spark.stop()
   ```

## {heading(Шаг 4. Управление запуском Spark-задачи)[id=run_jobs_main]}

1. В корне основной директории создайте файл `main.py`.
1. Укажите код основного скрипта для запуска Spark-задачи в файле. Для примера используйте скрипт для запуска задачи по расчету числа Пи:

   ```Python
   from mlplatform_client.v2 import BasicAuth, SparkCluster
   from mlplatform_client.v2.clients.spark import SparkClient
   from mlplatform_client.v2.utils import wait_job_running, wait_job_succeeded
    
   def spark_demo() -> None:
   # Получаем кластер (с версии 1.2.*)
   cluster = SparkCluster(
   SparkClient(
   host="https://spark.bzzzd23.data.bizmrg.com",
   auth=BasicAuth(username=username, password=password),
   skip_tls_verify=True,
   )
   )
   
       nodes = cluster.top_nodes_info().nodes_usage 
       
       # Формируем манифест приложения 
       job_name = "demo-name" 
       manifest = cluster.jobs.get_default_manifest(job_name) 
       manifest.set_executor_settings({"instances": 1, "cores": 1}) 
       # Настраиваем манифест приложения 
       # manifest.set_spark_conf({"spark.hadoop.fs.s3a.endpoint.region": "RegionOne"}) 
       print("Манифест spark-job, который запустится на кластере:") 
       print(manifest.to_yaml()) 
       
       # Запускаем приложение 
       job = cluster.jobs.submit_pyjob(manifest, pyfile="jobs/custom_job.py") 
       print("Ожидание запуска spark-job:") 
       wait_job_running(job, delay=8) 
       print(job.info()) 
       print("Логи spark-job:") 
       print(job.logs()) 
       print("Ожидание завершения spark-job:") 
       wait_job_succeeded(job, delay=8) 
       print("Логи выполненной spark-job:") 
       logs = job.logs() 
       print(logs) 
       print("Результат выполнение расчёта spark-pi:") 
       for log in logs.logs.split("\n"): 
           if "Pi is roughly" in log: 
               print("-" * 30) 
               print(log) 
               print("-" * 30) 
       
       # Выводим список всех запущенных приложений 
       all_jobs = cluster.jobs.list() 
       print("Список всех доступных spark-job:") 
       print(all_jobs) 
       
       # Получаем информацию об использовании ресурсов кластера 
       top_nodes = cluster.top_nodes_info() 
       print("Информация по состоянию нод кластера:") 
       print(top_nodes) 
       
       # Удаляем spark job 
       print(f"Удаляем spark-job с именем {job_name}") 
       job.delete() 
       print("Spark-job удалена") 
   
   
   if __name__ == "__main__":
   spark_demo()
   ```

## {heading(Шаг 5. Запуск Spark-задачи)[id=run_jobs_run]}

Перейдите в консоль и запустите основной скрипт:

```bash
python main.py
```

В качестве результата в консоли отобразятся следующие данные:

```bash
Результат выполнение расчёта spark-pi:
------------------------------
Pi is roughly 3.127960
------------------------------
Список всех доступных spark-job:
job_name: csv-to-iceberg-bb44746b, status: K8sSparkJobStatus.SUBMITTED, created_at: 2025-10-31T14:10:41.600987+00:00 ui_url: https://spark.d6bllks6.data.bizmrg.com/csv-to-iceberg-bb44746b/jobs/
job_name: demo-name, status: K8sSparkJobStatus.SUBMITTED, created_at: 2025-11-12T12:17:47.835379+00:00 ui_url: https://spark.d6bllks6.data.bizmrg.com/demo-name/jobs/
...

Информация по состоянию нод кластера:

---------------
MagnumClusterNodesUsageInfo:
---------------
╭─────────────────────────────────────┬─────────────┬─────────────┬───────────────┬────────────────┬────────────────┬──────────────────╮
│ NAME                                │ CPU USAGE   │ CPU TOTAL   │ CPU USAGE %   │ MEMORY USAGE   │ MEMORY TOTAL   │ MEMORY USAGE %   │
├─────────────────────────────────────┼─────────────┼─────────────┼───────────────┼────────────────┼────────────────┼──────────────────┤
│ dp-xntsz8kr-authservice-d6bllks6-0  │ 46.84m      │ 1.93        │ 2.4%          │ 977.17M        │ 1.39G          │ 68.9%            │
│ dp-xntsz8kr-default-group-0         │ 168.12m     │ 5.92        │ 2.8%          │ 1.66G          │ 5.60G          │ 29.5%            │
│ dp-xntsz8kr-master-0                │ 240.67m     │ 5.92        │ 4.1%          │ 3.48G          │ 5.60G          │ 62.2%            │
│ dp-xntsz8kr-sparkconnect-d6bllks6-0 │ 60.09m      │ 9.9         │ 0.6%          │ 3.12G          │ 10.90G         │ 28.6%            │
│ dp-xntsz8kr-sparkhistory-d6bllks6-0 │ 53.47m      │ 1.93        │ 2.8%          │ 1.13G          │ 2.47G          │ 45.7%            │
│ dp-xntsz8kr-sparkproxy-d6bllks6-0   │ 55.27m      │ 1.93        │ 2.9%          │ 1.20G          │ 1.39G          │ 86.3%            │
╰─────────────────────────────────────┴─────────────┴─────────────┴───────────────┴────────────────┴────────────────┴──────────────────╯
Удаляем spark-job с именем demo-name
Spark-job удалена
```