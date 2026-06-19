# {heading(Негізгі Spark тапсырмаларымен жұмыс істеу)[id=mlspark-htg-basic]}

{include(/kz/_includes/_translated_by_ai.md)}

Spark тапсырмаларын кластерге әртүрлі тәсілдермен жіберуге болады:

- Тәуелділіктері жоқ Spark қолданбалары үшін қолданба кодын тапсырма манифесіне беру жеткілікті. Бұл тәсіл төменде көрсетіледі.
- Өз жұмысы үшін қосымша артефактілерді қажет ететін Spark қолданбалары үшін қажетті артефактілерді [VK Object Storage](/kz/storage/s3) бакетіне қолмен қосып, тапсырма манифесін өңдеу қажет. Бұл тәсіл {linkto(../submit-advanced-job-clickhouse#mlspark-htg-advanced)[text=ClickHouse-пен жұмыс істеу мысалында]} көрсетілген.

Мысал ретінде π санының жуық мәнін есептейтін қолданба пайдаланылады.

## {heading(Дайындық қадамдары)[id=mlspark-htg-basic-prerequirements]}

1. {linkto(../../ml-platform-library/install#mlspark-library-install)[text=Cloud ML Platform кітапханасын орнатыңыз]}.

1. {linkto(../../ml-platform-library/authz#mlspark-library-authz)[text=Қолжетімділік токенін жасаңыз]}. Бұл токен кітапханамен жұмыс істеу үшін қажет.

   `Администратор` рөлі бар токен де, `Пользователь` рөлі бар токен де жарайды.

   {note:err}

   Қарапайым болу үшін токен мәні Python скрипттерінің мысалдарында көрсетілген.

   Production-ортада жұмыс істегенде токенді скрипттерде ашық түрде орналастырмаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз.

   {/note}

1. {linkto(../../instructions/create#mlspark-instructions-create)[text=Spark кластерін жасаңыз]}.

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. Скриптті орындап, жобадағы Spark кластерлері туралы ақпаратты алыңыз:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<значение токена доступа>"

   mlp = MLPlatform(REFRESH_TOKEN)
   print(mlp.get_clusters())
   ```

   Кластерлер туралы толық ақпарат шығарылады.

1. Жасалған кластердің идентификаторын тауып, жазып алыңыз (`id` өрісінде болады).

## {heading(1. Spark қолданбасының коды бар файлды жасаңыз)[id=mlspark-htg-basic-create-spark-file]}

Бұл қолданба есептеулерді Spark кластерінің тораптары бойынша тарата отырып, Монте-Карло әдісімен π санының жуық мәнін есептейді.

{cut(calculate-pi.py)}

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

{/cut}

## {heading(2. Spark тапсырмасын кластерге жіберіңіз)[id=mlspark-htg-basic-send-to-cluster]}

Скриптті орындап, тапсырманы кластерге жіберіңіз:

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

Жіберілген тапсырма туралы ақпарат шығарылады, мысалы:

```text
Job: pi-spark-job, status: SUBMITTED, created_at: ...
```

Әдепкі бойынша Spark тапсырмасына арналған манифестте Spark қолданбасының жұмысына қажетті файлдардың қайда орналасқаны туралы мәліметтер жоқ.

π санын есептейтін қолданбаның жұмысы үшін [тек бір орындалатын файл](#mlspark-htg-basic-create-spark-file) қажет, ешқандай қосымша артефактілер пайдаланылмайды.

Мұндай қарапайым жағдайда Spark қолданбасының орындалатын файлын {var(s3)} бакетіне орналастырып, содан кейін манифестке қажетті мәліметтерді қосу үшін әдепкі манифестті түзетудің қажеті жоқ.

Тапсырманы кластерге жіберу кезінде орындалатын файлдың атын беру жеткілікті:

```python
spark_job_info = mlp.spark_submit_job(CLUSTER_ID, spark_job_manifest, PY_FILE)
```

Cloud ML Platform кітапханасы көрсетілген файлдағы кодты орындауға болатындай етіп манифестті өзі түзетеді.

## {heading(3. Spark тапсырмасының күйін қадағалаңыз)[id=mlspark-htg-basic-check-jobs]}

1. Тапсырма логтарында π санын есептеу нәтижесі пайда болғанына көз жеткізіңіз. Егер нәтиже шықпаса, логтарды алу үшін скриптті тағы бір рет іске қосыңыз: тапсырма әлі аяқталмаған сәттегі аралық жұмыс логтары шығарылуы мүмкін.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<значение токена доступа>"
   CLUSTER_ID = "<идентификатор кластера>"
   JOB_NAME = "pi-spark-job"

   mlp = MLPlatform(REFRESH_TOKEN)

   logs = mlp.spark_job_logs(CLUSTER_ID, JOB_NAME)
   print(logs)
   ```

   {cut(Тапсырма сәтті орындалған кездегі шығару бөлігінің мысалы)}

   ```text
   Pi is roughly 3.146360
   ```

   {/cut}

1. (Опционалды) Кластердегі оқиғалар туралы ақпарат алыңыз. Ол, мысалы, ақауларды іздеу кезінде кластер мен тапсырмалардың ағымдағы күйін білуге мүмкіндік береді.

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = "<значение токена доступа>"
   CLUSTER_ID = "<идентификатор кластера>"

   mlp = MLPlatform(REFRESH_TOKEN)

   events = mlp.spark_events(CLUSTER_ID)
   print(events)
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mlspark-htg-basic-delete-unused-resources]}

Егер жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Spark кластерін жойыңыз.
1. Осы Spark кластеріне арналған Docker тізілімін жойыңыз.
1. [Қолжетімділік токенін жойыңыз](../../ml-platform-library/authz).
