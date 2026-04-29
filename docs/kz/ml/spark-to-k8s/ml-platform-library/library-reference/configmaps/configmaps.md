{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдістер Cloud Spark кластерінің жұмысын қамтамасыз ететін Cloud Containers кластерінің [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) (конфигурация карталарымен) жұмыс істеуге мүмкіндік береді. Олар конфигурациялық деректерді: орта айнымалыларын, пәрмен жолы аргументтерін немесе конфигурация файлдарын сақтау үшін пайдаланылады. ConfigMap қолдану нақты орындау ортасына тәуелді конфигурациялық деректер баптауын қолданба кодынан бөлуге мүмкіндік береді. Бұл сіздің Spark қолданбаларыңызды кодты орындау орталары арасында тасымалдауды жеңілдетеді.

{note:warn}

ConfigMap класы сақталатын деректердің құпиялылығы мен шифрлануын қамтамасыз етпейді. Құпия деректермен жұмыс істеу үшін [құпиялармен жұмыс істеу әдістерін](../secrets) немесе үшінші тарап құралдарын пайдаланыңыз.

{/note}

## create_configmap_from_yaml

Берілген манифест негізінде көрсетілген атаулар кеңістігінде ConfigMap жасаңыз. Манифест YAML форматында болуы керек.

Токеннің қажетті рөлі: `Администратор`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады

|`configmap_yaml_path`

(міндетті)
|`str`
|Cloud Spark кластеріне беру керек манифесті бар YAML-файлға жол

|`namespace`

(міндетті емес)
|`str`
|ConfigMap жасау керек атаулар кеңістігінің атауы. Атаулар кеңістігі бар болуы керек, әйтпесе ConfigMap жасалмайды.

Аргумент болмаған жағдайда әдепкі мән пайдаланылады: `default`
|===

### Қайтарылатын мән

Жасалған ConfigMap туралы ақпаратты қамтитын `K8sConfigmap` класының объектісі.

[cols="1,1,4", options="header", width=100%]
|===
|Өріс
|Түрі
|Сипаттамасы

|`data`
|`dict[str,str]`
|`кілт: мән` жұптары түріндегі ConfigMap деректері

|`name`
|`str`
|ConfigMap атауы

|`namespace`
|`str`
|ConfigMap жасалған атаулар кеңістігінің атауы
|===

### Сигнатура метода, примеры манифестов и пример использования метода

{cut(Әдіс сигнатурасы)}

```python
create_configmap_from_yaml(cluster_id: str,
                           configmap_yaml_path: str,
                           namespace: str = 'default',
                           **kwargs
                          ) -> mlplatform_client.serializers.spark_proxy.K8sConfigmap
```

{/cut}

{cut(Cloud Spark кластеріне арналған қолданба коды бар манифест мысалы)}

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: custom-job-py
  namespace: default
data:
  custom_job.py: |
    import sys
    import os

    from random import random
    from operator import add

    from pyspark.sql import SparkSession


    """
        Usage: pi [partitions]
    """
    spark = SparkSession\
        .builder\
        .appName("PythonPi")\
        .getOrCreate()
    spark.sparkContext.setLogLevel('DEBUG')

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

{cut(MongoDB дерекқоры инстансына қол жеткізу баптаулары бар манифест мысалы (mongodb_configmap.yaml))}

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: example-configmap
data:
  # Configuration values can be set as key-value properties
  database: mongodb
  database_uri: mongodb://localhost:27017
  # Or set as complete file contents (even JSON!)
  keys: | 
    image.public.key=771 
    rsa.public.key=42
```

{/cut}

{cut(mongodb_configmap.yaml манифесті үшін әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скрипті мысалында көрсетілген.

production-ортада токендермен ашық түрде жұмыс істемеңіз. Орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Администратор` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap = mlp.create_configmap_from_yaml(
               cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
               configmap_yaml_path='/home/user/mongodb_configmap.yaml',
               namespace='default')
 
   print(configmap)
```

Сәтті орындалған жағдайда жауап көрсетіледі:

```txt
data:
  database: mongodb
  database_uri: mongodb://localhost:27017
  keys: "image.public.key=771 \nrsa.public.key=42"
name: example-configmap
namespace: default      
```

{/cut}

## list_configmaps

Көрсетілген атаулар кеңістігіндегі барлық ConfigMap атауларының тізімін алу.

Тізімдегі жеке ConfigMap туралы егжей-тегжейлі ақпаратты алу үшін [get_configmap_detail](#get_configmap_detail) әдісін пайдаланыңыз.

Токеннің қажетті рөлі: `Администратор` немесе `Пользователь`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады
|`namespace`

(міндетті емес)
|`str`
|Барлық ConfigMap тізімін алу керек атаулар кеңістігінің атауы.

Аргумент болмаған жағдайда әдепкі мән пайдаланылады: `default`
|===

### Қайтарылатын мән

Көрсетілген атаулар кеңістігіндегі барлық ConfigMap атауларының тізімін қамтитын `K8sObjectNamesList[str]` класының объектісі.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
list_configmaps(cluster_id: str,
                namespace: str = 'default',
                **kwargs
               ) -> mlplatform_client.serializers.spark_proxy.K8sObjectNamesList[str]
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скрипті мысалында көрсетілген.

production-ортада токендермен ашық түрде жұмыс істемеңіз. Орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap_names = mlp.list_configmaps(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      namespace='default')

   print(configmap_names)
   ```

   Сәтті орындалған жағдайда `default` атаулар кеңістігіндегі барлық ConfigMap атаулары шығарылады.

{/cut}

## get_configmap_detail

Көрсетілген атауы бар ConfigMap туралы ақпарат алу.

Токеннің қажетті рөлі: `Администратор` немесе `Пользователь`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады
|`configmap_name`

(міндетті)
|`str`
|ConfigMap атауы.

Барлық ConfigMap атауларының тізімін [list_configmaps](#list_configmaps) әдісі арқылы алуға болады
|`namespace`

(міндетті емес)
|`str`
|ConfigMap орналасқан атаулар кеңістігінің атауы.

Аргумент болмаған жағдайда әдепкі мән пайдаланылады: `default`
|===

### Қайтарылатын мән

Көрсетілген атауы бар ConfigMap туралы ақпараты бар `K8sConfigmap` класының объектісі.

[cols="1,1,4", options="header", width=100%]
|===
|Өріс
|Түрі
|Сипаттамасы

|`data`
|`dict[str,str]`
|`кілт: мән` жұптары түріндегі ConfigMap деректері

|`name`
|`str`
|ConfigMap объектісінің атауы

|`namespace`
|`str`
|ConfigMap орналасқан атаулар кеңістігінің атауы
|===

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_configmap_detail(cluster_id: str,
                     configmap_name: str,
                     namespace: str = 'default',
                     **kwargs
                    ) -> mlplatform_client.serializers.spark_proxy.K8sConfigmap
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скрипті мысалында көрсетілген.

production-ортада токендермен ашық түрде жұмыс істемеңіз. Орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap_details = mlp.get_configmap_detail(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      configmap_name='example-configmap',
      namespace='default')

   print(configmap_details)
   ```

   Сәтті орындалған жағдайда `example-configmap` атауы бар ConfigMap туралы ақпарат шығарылады.

{/cut}

## delete_configmap

Көрсетілген атауы бар ConfigMap жою.

Токеннің қажетті рөлі: `Администратор`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады
|`configmap_name`

(міндетті)
|`str`
|ConfigMap атауы.

Барлық ConfigMap атауларының тізімін [list_configmaps](#list_configmaps) әдісі арқылы алуға болады
|`namespace`

(міндетті емес)
|`str`
|ConfigMap орналасқан атаулар кеңістігінің атауы.

Аргумент болмаған жағдайда әдепкі мән пайдаланылады: `default`
|===

### Қайтарылатын мән

Қайтарылатын мән жоқ.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
delete_configmap(cluster_id: str,
                 configmap_name: str,
                 namespace: str = 'default',
                 **kwargs)
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скрипті мысалында көрсетілген.

production-ортада токендермен ашық түрде жұмыс істемеңіз. Орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Администратор` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.delete_configmap(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      configmap_name='example-configmap',
      namespace='default')
   ```

   Көрсетілген атауы бар ConfigMap Cloud Spark кластерінен жойылады. Мұны [list_configmaps](#list_configmaps) әдісі арқылы тексеруге болады.

{/cut}
