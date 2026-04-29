{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдістер Cloud Spark кластерінде тапсырмалардың орындалуын басқаруға мүмкіндік береді:

- тапсырмаларды жасауға, іске қосуға және жоюға;
- кластердің ағымдағы тапсырмаларының тізімін, тапсырма логтарын және тапсырмалар туралы толық ақпаратты алуға;
- кластер оқиғалары, соның ішінде тапсырмалардың орындалуына қатысты оқиғалар туралы ақпаратты алуға.

## get_default_manifest

Cloud Spark кластеріне арналған тапсырма сипаттамасы бар SparkApplication түрінің стандартты манифесінің мысалын алу және қажет болған жағдайда осы тапсырмаға атау беру.

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

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады.
|`job_name`

(міндетті емес)
|`str`
|Cloud Spark кластеріне арналған бірегей тапсырма атауы.

Аргумент болмаған жағдайда әдепкі мән пайдаланылады: `None`.
|===

{note:warn}

Cloud Spark кластеріндегі тапсырма атауы бірегей болуы керек. Бірдей атаулары бар тапсырмаларды іске қосу қате туындатады.

{cut(Тапсырманы қалай қайта атауға болады)}

Python скриптін орындаңыз:

```python
client_manifest.job_name = '<новое имя задания>'
```

Мұнда `client_manifest` — `get_default_manifest` әдісі немесе [get_manifest_from_yaml_file](#get_manifest_from_yaml_file) арқылы алынған SparkApplication түріндегі манифест.

{/cut}

{/note}

### Қайтарылатын мән

SparkApplication түрінің стандартты манифесінің мысалын қамтитын `Manifest` класының нысаны. Әдісті шақыру кезінде берілген `job_name` аргументінің мәні манифестің `metadata.name` өрісінде болады.

### {heading(Әдіс сигнатурасы және пайдалану мысалы)[id=get_default_manifest_additional_info]}

{cut(Әдіс сигнатурасы)}

```python
get_default_manifest(cluster_id: str,
                     job_name: Optional[str] = None,
                     **kwargs
                     ) -> mlplatform_client.core.manifest.Manifest
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   BUCKET_NAME = clusters[0].s3_bucket_name
   JOB_NAME = "pi-spark-job"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   print(client_manifest)
   ```

   Сәтті орындалған жағдайда манифест коды шығарылады.

   Қажет болса, манифест параметрлерінің мәндерін қалаған мәндерге өзгерте аласыз.

{/cut}

### Примеры настройки манифеста

{cut(Cloud Spark кластерінде іске қосу үшін қолданбаның негізгі орындалатын файлын қалай көрсетуге болады)}

Python скриптін орындаңыз:

```python
client_manifest.main_app_file=f"s3a://{BUCKET_NAME}/spark-files/new_main_file.py"
```

Бұл мысалда бакеттегі файлдың атауы мен жолы көрсетіледі. Бакет атауы `BUCKET_NAME` айнымалысында болады.

{/cut}

{cut(Spark орындаушысының параметрлерін қалай өзгертуге болады)}

Python скриптін орындаңыз:

```python
client_manifest.set_executor_settings(
   {"instances": 2, "cores": 2, "memory": "1024m"})
```

Бұл мысалда мыналар көрсетіледі:

- тапсырманы орындауға қажетті орындаушылар саны;
- әрбір орындаушыға бөлінетін CPU ядроларының саны мен жад көлемі.

{/cut}

{cut(Spark драйверінің параметрлерін қалай өзгертуге болады)}

Python скриптін орындаңыз:

```python
client_manifest.set_driver_settings(
   {"cores": 2, "coreLimit": 3, "memory": "1024m"})
```

Бұл мысалда тапсырманы орындауға қажетті драйвер ресурстарының параметрлері көрсетіледі:

- CPU ядроларының ең аз және ең көп саны;
- жад көлемі.

{/cut}

{cut(Spark драйвері үшін қоршаған орта айнымалысын қалай анықтауға болады)}

Python скриптін орындаңыз:

```python
client_manifest.set_driver_settings(
   {"env": [{"name": "NEW_ENV", "value": "NEW_ENV_VALUE"}]})
```

Бұл мысалда `NEW_ENV` айнымалысының атауы және оның `NEW_ENV_VALUE` мәні көрсетіледі.

{/cut}

{cut(Spark конфигурациясының параметрлерін қалай өзгертуге болады)}

Python скриптін орындаңыз:

```python
client_manifest.set_spark_conf(
   {"spark.driver.extraJavaOptions": "-Divy.cache.dir=/tmp -Divy.home=/tmp"})
```

Бұл мысалда Spark драйверіне кластерде Java-кодты орындауға қажет JVM (Java виртуалды машинасы) қосымша баптаулары беріледі.

{/cut}

{cut(Тапсырманы орындауға қажет jar-файлдарға және басқа қосымша файлдарға әдепкі жолды қалай қайта анықтауға болады)}

Python скриптін орындаңыз:

```python
client_manifest.set_jars([f"s3a://{BUCKET_NAME}/test.jar"])
client_manifest.set_files([f"s3a://{BUCKET_NAME}/dataset.csv"])
```

Бұл мысалда бакеттегі `test.jar` кітапханасына және `dataset.csv` файлына жол көрсетіледі. Бакет атауы `BUCKET_NAME` айнымалысында болады.

{/cut}

{cut(Қолданба коды бар қосымша файлды қалай көрсетуге болады)}

Python скриптін орындаңыз:

```python
client_manifest.add_pyfiles([f"s3a://{BUCKET_NAME}/python_file.py"])
```

Бұл мысалда бакеттегі Python коды бар файлдың атауы мен жолы көрсетіледі. Бакет атауы `BUCKET_NAME` айнымалысында болады.

{/cut}

{cut(Spark драйвері мен орындаушысы үшін қоршаған орта айнымалыларын қалай орнатуға болады)}

Python скриптін орындаңыз:

```python
client_manifest.add_driver_env([{"name": "MY_DRIVER_ENV", "value": "my_env_value"}])
client_manifest.add_executor_env([{"name": "MY_EXECUTOR_ENV", "value": "my_env_value"}])
```

Бұл мысалда мыналар анықталады:

- `"my_env_value"` мәні бар `MY_DRIVER_ENV` драйверінің қоршаған орта айнымалысы;
- `"my_env_value"` мәні бар `MY_EXECUTOR_ENV` орындаушысының қоршаған орта айнымалысы.

{/cut}

{cut(Құпиядан алынған айнымалыларды Spark драйвері мен орындаушысының ортасына қалай қосуға болады)}

Python скриптін орындаңыз:

```python
client_manifest.add_driver_env_from([{"secretRef": {"name": "my-secret"}}])
client_manifest.add_executor_env_from([{"secretRef": {"name": "my-secret"}}])
```

Бұл мысалда Spark драйвері мен орындаушысының ортасына алдын ала жасалған [құпиядан](https://kubernetes.io/docs/concepts/configuration/secret/) `my-secret` атауымен айнымалылар қосылады.

{/cut}

{cut(Spark тапсырмасын қайта іске қосу саясатының параметрлерін қалай орнатуға болады)}

Python скриптін орындаңыз:

```python
client_manifest.set_restart_policy(
   restart_type=K8sSparkJobRestartPolicyType.ON_FAILURE,
   on_failure_retries=3,
   on_failure_retry_interval=20,
   on_submission_failure_retries=5,
   on_submission_failure_retry_interval=20)
```

Бұл мысалда `ON_FAILURE` түріндегі саясат үшін тапсырманы қайта іске қосу параметрлері орнатылады:

- `on_failure_retries`: количество попыток перезапуска при ошибке выполнения задания.
- `on_failure_retries`: тапсырманы орындау қатесі болған кезде қайта іске қосу әрекеттерінің саны.
- `on_submission_failure_retries`: іске қосу кезінде қате туындаса, тапсырманы іске қосу әрекеттерінің саны.
- `on_submission_failure_retries_interval`: іске қосу кезінде қате туындаса, тапсырманы іске қосу әрекеттері арасындағы секундтармен интервал.

{/cut}

Spark баптау параметрлері туралы көбірек ақпарат [ресми құжаттамада](https://spark.apache.org/docs/latest/configuration.html) берілген.

## get_manifest_from_yaml_file

YAML форматындағы файлдан Cloud Spark кластеріне арналған тапсырма сипаттамасы бар SparkApplication түріндегі манифесті алу.

Токеннің қажетті рөлі: `Администратор` немесе `Пользователь`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`yaml_file_path`

(міндетті)
|`str`
|YAML-файлға жол
|===

### Қайтарылатын мән

`Manifest` класының нысаны.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_manifest_from_yaml_file(yaml_file_path: str 
                            ) -> mlplatform_client.core.manifest.Manifest
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   client_manifest = mlp.get_manifest_from_yaml_file(
      yaml_file_path='/home/user/sample-job-manifest.yaml')
   
   print(client_manifest)
   ```

   Сәтті орындалған жағдайда манифест коды шығарылады.

{/cut}

## save_yaml

Манифесті YAML-файлға сақтау.

Токеннің қажетті рөлі: `Администратор` немесе `Пользователь`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`file_path`

(міндетті)
|`str`
|Файлға жол
|===

### Қайтарылатын мән

Қайтарылатын мән жоқ.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
save_yaml(file_path: str) -> None
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   client_manifest = mlp.get_manifest_from_yaml_file(
      yaml_file_path='/home/user/sample-job-manifest.yaml')

   client_manifest.set_driver_settings(
      {"cores": 2, "coreLimit": 3, "memory": "1024m"})

   client_manifest.save_yaml("/home/user/sample-job-manifest.yaml")

   print(client_manifest)
   ```

   Бұл мысалда `/home/user/sample-job-manifest.yaml` файлынан манифест жүктеледі, содан кейін өңделіп, сол файлға қайта сақталады. Сәтті орындалған жағдайда өзгертілген манифест коды шығарылады.

{/cut}

## spark_submit_job

Cloud Spark кластеріне тапсырма жіберу.

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

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады.

|`manifest`

(міндетті)
|`Manifest`
|Тапсырма сипаттамасы бар SparkApplication түріндегі манифесті қамтитын `Manifest` класының нысаны.

Нысанды [get_default_manifest](#get_default_manifest) немесе [get_manifest_from_yaml_file](#get_manifest_from_yaml_file) әдісі арқылы алуға болады.

|`pycode_file_path`

(міндетті емес)
|`str`
|Орындау үшін Cloud Spark кластеріне берілетін Python коды бар файлға жергілікті жол.

Аргумент болмаған жағдайда әдепкі мән пайдаланылады: `None`
|===

### Қайтарылатын мән

Spark тапсырмасы туралы ақпараты бар `K8sSparkJobInfo` класының нысаны.

{include(/kz/_includes/_spark_job_info.md)}

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
spark_submit_job(cluster_id: str,
                 manifest: mlplatform_client.core.manifest.Manifest,
                 pycode_file_path: Optional[str] = None,
                 **kwargs
                ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobInfo
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Егер бұл әлі жасалмаса, Spark тапсырмасының Python коды бар `example.py` файлын жасаңыз.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-1"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   job_info = mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   print(job_info)
   ```

   `pi-spark-job-1` атауы бар Spark тапсырмасы туралы ақпарат шығарылады. Сәтті орындалған жағдайда шығару мысалы:

   ```txt
   job_name: pi-spark-job-1, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job-1/jobs/
   ```

{/cut}

## spark_jobs_list

Cloud Spark кластерінің барлық тапсырмаларының тізімін алу.

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

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады.
|===

### Қайтарылатын мән

Cloud Spark кластері тапсырмалары туралы ақпараты бар `K8sSparkJobInfo` класы нысандарының тізімі.

{include(/kz/_includes/_spark_job_info.md)}

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
spark_jobs_list(cluster_id: str,
                **kwargs
               ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobsInfoList
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id

   jobs_list = mlp.spark_jobs_list(
      cluster_id=CLUSTER_ID)

   print(jobs_list)
   ```

   Cloud Spark кластерінің барлық тапсырмаларының тізімі шығарылады. Сәтті орындалған жағдайда шығару мысалы:

   ```txt
   job_name: pi-spark-job, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job/jobs/
   job_name: pi-spark-job-1, status: SUBMITTED, created_at: 2024-07-04T15:08:08.536636+00:00 ui_url: https://k8s-XXXX.ml.msk.vkcs.cloud/pi-spark-job-1/jobs/
   ```

{/cut}

## spark_job_info

Көрсетілген атауы бар Spark тапсырмасы туралы толық ақпарат алу.

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

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады.

|`job_name`

(міндетті)
|`str`
|Spark тапсырмасының атауы.

Spark тапсырмаларының атауларын [spark_jobs_list](#spark_jobs_list) әдісі арқылы алуға болады.
|===

### Қайтарылатын мән

Spark тапсырмасы туралы толық ақпараты бар `K8sSparkJobInfoDetail` класының нысаны.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
spark_job_info(cluster_id: str,
               job_name: str,
               **kwargs
              ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobInfoDetail
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Егер бұл әлі жасалмаса, Spark тапсырмасының Python коды бар `example.py` файлын жасаңыз.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-2"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   job_detail = mlp.spark_job_info(
      cluster_id=CLUSTER_ID,
      job_name=JOB_NAME)
   
   print(job_detail)
   ```
   `pi-spark-job-2` атауы бар Spark тапсырмасы туралы толық ақпарат шығарылады. Сәтті орындалған жағдайда шығару мысалы:

   ```txt
   job_name: pi-spark-job-2
   status: SUBMITTED
   created_at: 2024-07-04T15:08:08.536636+00:00
   ui_url: https://k8s-3d1b1904fc1576.ml.msk.vkcs.cloud/pi-spark-job-2/jobs/
   pod_status: Succeeded
   pod_status_reason: None
   pod_state: V1ContainerStateTerminated
   pod_state_reason: Completed
   pod_state_reason_message: None
   ```

{/cut}

## spark_job_logs

Көрсетілген атауы бар Spark тапсырмасының логтарын алу.

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

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады.

|`job_name`

(міндетті)
|`str`
|Spark тапсырмасының атауы.

Spark тапсырмаларының атауларын [spark_jobs_list](#spark_jobs_list) әдісі арқылы алуға болады.
|===

### Қайтарылатын мән

Spark тапсырмасының логтары бар `K8sSparkJobLogs` класының нысаны.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
spark_job_logs(cluster_id: str,
               job_name: str: str,
               **kwargs
              ) -> mlplatform_client.serializers.spark_proxy.K8sSparkJobLogs
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Егер бұл әлі жасалмаса, Spark тапсырмасының Python коды бар `example.py` файлын жасаңыз.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-3"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   job_logs = mlp.spark_job_logs(
      cluster_id=CLUSTER_ID,
      job_name=JOB_NAME)
   
   print(job_logs)
   ```
   `pi-spark-job-3` атауы бар Spark тапсырмасының логтары шығарылады.

{/cut}

## describe_spark_job

Көрсетілген атауы бар тапсырманы орындау үшін Cloud Spark кластерінде іске қосылған SparkApplication түріндегі қолданба туралы ақпарат алу.

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

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады.

|`job_name`

(міндетті)
|`str`
|Spark тапсырмасының атауы.

Spark тапсырмаларының атауларын [spark_jobs_list](#spark_jobs_list) әдісі арқылы алуға болады.
|===

### Қайтарылатын мән

Тапсырманы орындау үшін Cloud Spark кластерінде іске қосылған SparkApplication түріндегі қолданба туралы толық ақпараты бар `K8sSparkApplication` класының нысаны.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
describe_spark_job(cluster_id: str,
                   job_name: str,
                   **kwargs
                  ) -> mlplatform_client.serializers.spark_proxy.K8sSparkApplication
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Егер бұл әлі жасалмаса, Spark тапсырмасының Python коды бар `example.py` файлын жасаңыз.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-4"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   app_description = mlp.describe_spark_job(
      cluster_id=CLUSTER_ID,
      job_name=JOB_NAME)
   
   print(app_description)
   ```

   `pi-spark-job-4` Spark тапсырмасын орындау үшін Cloud Spark кластерінде іске қосылған қолданба туралы толық ақпарат шығарылады. Шығарылымның бір бөлігінің мысалы:

   ```txt
   apiVersion: sparkoperator.k8s.io/v1beta2
   events: []
   kind: SparkApplication
   metadata:
   creationTimestamp: '2024-07-05T05:14:20Z'
   generation: 1
   managedFields:
   - apiVersion: sparkoperator.k8s.io/v1beta2
      fieldsType: FieldsV1
      fieldsV1:
         f:spec:
         .: {}
         f:driver:
            .: {}
            f:configMaps: {}
            f:coreLimit: {}
            f:cores: {}
            f:env: {}
            f:envFrom: {}
            f:labels:
   # конец фрагмента 
   ```

{/cut}

## spark_delete_job

Көрсетілген атауы бар Spark тапсырмасын жою.

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

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады.

|`job_name`

(міндетті)
|`str`
|Spark тапсырмасының атауы.

Spark тапсырмаларының атауларын [spark_jobs_list](#spark_jobs_list) әдісі арқылы алуға болады.
|===

### Қайтарылатын мән

Қайтарылатын мән жоқ.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
spark_delete_job(cluster_id: str,
                 job_name: str,
                 **kwargs
                ) -> None
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор`  немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Егер бұл әлі жасалмаса, Spark тапсырмасының Python коды бар `example.py` файлын жасаңыз.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id
   JOB_NAME = "pi-spark-job-5"

   client_manifest = mlp.get_default_manifest(
      cluster_id=CLUSTER_ID, 
      job_name=JOB_NAME)

   mlp.spark_submit_job(
      cluster_id=CLUSTER_ID,
      manifest=client_manifest,
      pycode_file_path="example.py")
   
   mlp.spark_delete_job(
      cluster_id=CLUSTER_ID,
      job_name=JOB_NAME)
   ```

   `pi-spark-job-5` атауы бар Spark тапсырмасы жойылады. Мұны [spark_jobs_list](#spark_jobs_list) әдісі арқылы тексеруге болады.

{/cut}

## spark_events

Cloud Spark кластері оқиғаларының тізімін алу.

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

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады.
|===

### Қайтарылатын мән

Cloud Spark кластері оқиғаларының тізімі бар `K8sSparkEventsList` класының нысаны.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
spark_events(cluster_id: str,
             **kwargs
            ) -> mlplatform_client.serializers.spark_proxy.K8sSparkEventsList
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қатынау токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде қолданбаңыз. Қоршаған орта айнымалыларын, құпиялар қоймаларын немесе сезімтал деректермен жұмыс істеуге арналған басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қатынау токенін жасаңыз](../../authz) `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   clusters = mlp.get_clusters()
   CLUSTER_ID = clusters[0].id

   events = mlp.spark_events(
      cluster_id=CLUSTER_ID)
   
   print(events)
   ```

   Қателерді іздеуге және кластердің ағымдағы күйін бағалауға пайдалануға болатын Cloud Spark кластері оқиғалары туралы ақпарат шығарылады. Шығарылымның бір бөлігінің мысалы:

   ```txt
   2024/07/05 07:09:26 Job=pi-spark-job-5-driver NORMAL Pod Successfully assigned default/pi-spark-job-5-driver to oa-spark-k8s-3-working-group-1
   2024/07/05 07:09:26 Job=pi-spark-job-5-driver WARNING Pod MountVolume.SetUp failed for volume "spark-conf-volume-driver" : configmap "spark-drv-4a7a979081b9ee79-conf-map" not found
   2024/07/05 07:09:28 Job=pi-spark-job-5-driver NORMAL Pod Pulling image "k8s-XXXX.ml.msk.vkcs.cloud/spark-py:3.4.1"
   2024/07/05 07:09:29 Job=pi-spark-job-5-driver NORMAL Pod Successfully pulled image "k8s-XXXX.ml.msk.vkcs.cloud/spark-py:3.4.1" in 591.586938ms (591.59893ms including waiting)
   2024/07/05 07:09:29 Job=pi-spark-job-5-driver NORMAL Pod Created container spark-kubernetes-driver
   # конец фрагмента
   ```

{/cut}
