# {heading(Spark тапсырмасын жасау және іске қосудың мысалы)[id=run_jobs]}

{include(/kz/_includes/_translated_by_ai.md)}

Нұсқаулықта Пи санын есептеуге арналған скрипт мысалында Cloud Spark сервисінде Spark тапсырмаларын қалай жасау және іске қосу көрсетілген. Барлық әрекеттер қадамдарға бөлінген:

1. {linkto(#run_jobs_install_client)[text=Spark-клиентті орнату]}.
1. {linkto(#run_jobs_env)[text=Ортаны дайындау]}.
1. {linkto(#run_jobs_create_job)[text=Spark тапсырмасының скриптін жасау]}.
1. {linkto(#run_jobs_main)[text=Spark тапсырмасын іске қосуға арналған негізгі скриптті жасау]}.
1. {linkto(#run_jobs_run)[text=Spark тапсырмасын іске қосу]}.

{note:info}

Жұмысты бастамас бұрын {linkto(../create#spark_create)[text=Cloud Spark]} сервисінің данасы жайылғанына көз жеткізіңіз.

{/note}

## {heading(1-қадам. Spark-клиентті орнату)[id=run_jobs_install_client]}

Cloud Spark сервисіне қосылу тек арнайы Spark-клиент арқылы орындалады. Оны орнатудың екі тәсілінің бірін қолданыңыз:

- Егер орнату `pip` арқылы қолжетімді болса, орындаңыз:

  ```bash
     pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
     ```
- Егер `pip` арқылы орнату қолжетімсіз болса, төмендегі сілтемелер бойынша ОС пен Python нұсқасына сәйкес келетін клиентті жүктеп алып, архивтен шығарып, орнатыңыз.

    {cut(Spark-клиентті жүктеуге арналған файлдар)}
    - [CentOS, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-centos.zip)
    - [CentOS, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-centos.zip)
    - [CentOS, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-centos.zip)
    - [РЕД ОС, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-redos.zip)
    - [РЕД ОС, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-redos.zip)
    - [РЕД ОС, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-redos.zip)
    - [РЕД ОС, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-redos.zip)
    - [AlmaLinux, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-almalinux.zip)
    {/cut}


## {heading(2-қадам. Ортаны дайындау)[id=run_jobs_env]}

1. Орта айнымалыларын орнатыңыз:

    ```bash
    AWS_ACCESS_KEY_ID=<ҚОЛЖЕТКІЗУ_КІЛТІ>
    AWS_REGION=<S3_АЙМАҒЫ>
    AWS_SECRET_ACCESS_KEY=<ҚҰПИЯ_КІЛТ>
    BUCKET_NAME=<S3_БАКЕТІНІҢ_АТАУЫ>
    KEYSTONE_PASSWORD=<DATA_PLATFORM_ПАЙДАЛАНУШЫСЫНЫҢ_ҚҰПИЯСӨЗІ>
    KEYSTONE_USERNAME=<DATA_PLATFORM_ПАЙДАЛАНУШЫСЫНЫҢ_ПОШТАСЫ>
    ML_PLATFORM_HOST=<CLOUD_SPARK_МЕКЕНЖАЙЫ>
    S3_ENDPOINT=<S3_ЭНДПОИНТІ>
    ```

1. Кодты іске қосу үшін нұсқаулықтағы скрипттерді көшіретін бөлек директория жасаңыз. Директорияның ішінде:
    1. Скрипт файлдарын орналастырыңыз.
    1. Төмендегі нұсқаулықтағы Spark тапсырмасын орналастыру үшін `/jobs` директориясын жасаңыз.

   Директория құрылымының мысалы:

    ```bash
    └── spark_kafka
       ├── jobs
       │   └── job.py
       └── main.py
    ```

## {heading(3-қадам. Spark тапсырмасын жасау)[id=run_jobs_create_job]}

1. `/jobs` директориясында `.py` кеңейтімі бар файл жасаңыз. Мысалы: `job.py`.
1. Файлда Spark тапсырмасының кодын көрсетіңіз. Мысал ретінде Пи санын есептеу скриптін пайдаланыңыз:

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

## {heading(4-қадам. Spark тапсырмасын іске қосуды басқару)[id=run_jobs_main]}

1. Негізгі директория түбірінде `main.py` файлын жасаңыз.
1. Файлда Spark тапсырмасын іске қосуға арналған негізгі скрипт кодын көрсетіңіз. Мысал ретінде Пи санын есептеу тапсырмасын іске қосу скриптін пайдаланыңыз:

```Python
from mlplatform_client.v2 import BasicAuth, SparkCluster
from mlplatform_client.v2.clients.spark import SparkClient
from mlplatform_client.v2.utils import wait_job_running, wait_job_succeeded

def spark_demo() -> None:
# Кластерді аламыз (1.2.* нұсқасынан бастап)
cluster = SparkCluster(
SparkClient(
host="https://spark.bzzzd23.data.bizmrg.com",
auth=BasicAuth(username=username, password=password),
skip_tls_verify=True,
)
)

    nodes = cluster.top_nodes_info().nodes_usage 

    # Қолданба манифестін қалыптастырамыз 
    job_name = "demo-name" 
    manifest = cluster.jobs.get_default_manifest(job_name) 
    manifest.set_executor_settings({"instances": 1, "cores": 1}) 
    # Қолданба манифестін баптаймыз 
    # manifest.set_spark_conf({"spark.hadoop.fs.s3a.endpoint.region": "RegionOne"}) 
    print("Кластерде іске қосылатын spark-job манифесі:") 
    print(manifest.to_yaml()) 

    # Қолданбаны іске қосамыз 
    job = cluster.jobs.submit_pyjob(manifest, pyfile="jobs/custom_job.py") 
    print("spark-job іске қосылуын күту:") 
    wait_job_running(job, delay=8) 
    print(job.info()) 
    print("spark-job логтары:") 
    print(job.logs()) 
    print("spark-job аяқталуын күту:") 
    wait_job_succeeded(job, delay=8) 
    print("Орындалған spark-job логтары:") 
    logs = job.logs() 
    print(logs) 
    print("spark-pi есебін орындау нәтижесі:") 
    for log in logs.logs.split("\n"): 
        if "Pi is roughly" in log: 
            print("-" * 30) 
            print(log) 
            print("-" * 30) 

    # Барлық іске қосылған қолданбалардың тізімін шығарамыз 
    all_jobs = cluster.jobs.list() 
    print("Барлық қолжетімді spark-job тізімі:") 
    print(all_jobs) 

    # Кластер ресурстарының пайдаланылуы туралы ақпарат аламыз 
    top_nodes = cluster.top_nodes_info() 
    print("Кластер түйіндерінің күйі туралы ақпарат:") 
    print(top_nodes) 

    # spark job жоямыз 
    print(f"{job_name} атаулы spark-job жойылып жатыр") 
    job.delete() 
    print("Spark-job жойылды") 


if __name__ == "__main__":
spark_demo()
```

## {heading(5-қадам. Spark тапсырмасын іске қосу)[id=run_jobs_run]}

Консольге өтіп, негізгі скриптті іске қосыңыз:

```bash
python main.py
```

Нәтижесінде консольде келесі деректер көрсетіледі:

```bash
spark-pi есебін орындау нәтижесі:
------------------------------
Pi is roughly 3.127960
------------------------------
Барлық қолжетімді spark-job тізімі:
job_name: csv-to-iceberg-bb44746b, status: K8sSparkJobStatus.SUBMITTED, created_at: 2025-10-31T14:10:41.600987+00:00 ui_url: https://spark.d6bllks6.data.bizmrg.com/csv-to-iceberg-bb44746b/jobs/
job_name: demo-name, status: K8sSparkJobStatus.SUBMITTED, created_at: 2025-11-12T12:17:47.835379+00:00 ui_url: https://spark.d6bllks6.data.bizmrg.com/demo-name/jobs/
...

Кластер түйіндерінің күйі туралы ақпарат:

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
demo-name атаулы spark-job жойылып жатыр
Spark-job жойылды
```
