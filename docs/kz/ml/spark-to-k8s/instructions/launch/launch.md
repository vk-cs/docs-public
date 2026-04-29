{include(/kz/_includes/_translated_by_ai.md)}

[Құрылған](/kz/ml/spark-to-k8s/instructions/create) Cloud Spark кластерінде тапсырманы іске қосу үшін:

1. Cloud ML Platform кітапханасында [авторизациядан өтіңіз](../../ml-platform-library/authz).

    {cut(Python скриптінің мысалы)}

    ```python
    from mlplatform_client import MLPlatform

    REFRESH_TOKEN = '<ЗНАЧЕНИЕ_ТОКЕНА_ДОСТУПА>'
    mlp = MLPlatform(REFRESH_TOKEN)
    ```

    {/cut}

1. `job_manifest` манифестін келесі тәсілдердің бірімен жасаңыз:

    - [get_default_manifest](../../ml-platform-library/library-reference/spark-jobs#get_default_manifest) әдісі арқылы стандартты манифест алыңыз.
    - YAML-файлдан манифесті [get_manifest_from_yaml_file](../../ml-platform-library/library-reference/spark-jobs#get_manifest_from_yaml_file) әдісі арқылы жүктеңіз.

1. (Опционалды) Файлдарды немесе тәуелділіктерді сақтау үшін қосымша бакеттер [жасаңыз](/kz/storage/s3/instructions/buckets/create-bucket).

    {note:info}

    Әдепкі бойынша Cloud Spark кластері аты `s3_bucket_name` параметрінде көрсетілген бакетке қолжетімділікке ие. Бұл атауды [get_clusters](../../ml-platform-library/library-reference/clusters#get_clusters) әдісі арқылы немесе VK Cloud жеке кабинетінің **ML Platform → Spark в k8s** бөлімінде Cloud Spark кластері қасиеттері бетінде алуға болады.

    {/note}

1. (Опционалды) Қосымша жасалған бакеттерге Cloud Spark кластеріне [қолжетімділік беріңіз](../../instructions/buckets).
1. (Опционалды) Spark тапсырмасын орындау үшін қажет файлдар мен тәуелділіктерді бакеттерге [жүктеңіз](/kz/storage/s3/instructions/objects/upload-object).

    {cut(Python скриптінің мысалы)}

    ```python
    job_manifest.set_jars([f"s3a://<ИМЯ_БАКЕТА>/spark-files/test.jar"])
    job_manifest.set_files([f"s3a://<ИМЯ_БАКЕТА>/datasets/dataset.csv"])
    job_manifest.add_pyfiles([f"s3a://<ИМЯ_БАКЕТА>/spark-files/python_file.py"])
    ```

    {/cut}

1. (Опционалды) `job_manifest` манифестін тапсырма талаптарына сәйкес баптаңыз:

    - Айнымалыларды жасаңыз.

      {cut(Python скриптінің мысалы)}

      ```python
      #Получить список кластеров Cloud Spark
      clusters = mlp.get_clusters()

      #Задать значения для часто используемых переменных
      CLUSTER_ID = clusters[0].id
      BUCKET_NAME = clusters[0].s3_bucket_name
      JOB_NAME = "sample-spark-job"
        
      #Задать переменные окружения для драйвера Spark
      job_manifest.add_driver_env(
          [{"name": "S3_INPUT_PATH", "value": "s3a://{BUCKET_NAME}/input"},
           {"name": "S3_OUTPUT_PATH", "value": "s3a://{BUCKET_NAME}/output"}])

      #Задать переменные окружения для исполнителя Spark
      job_manifest.add_executor_env(
          [{"name": "S3_INPUT_PATH", "value": "s3a://{BUCKET_NAME}/input"},
           {"name": "S3_OUTPUT_PATH", "value": "s3a://{BUCKET_NAME}/output"}])

      ```

      {/cut}

    - Spark орындаушысының баптауларын өзгертіңіз.

      {cut(Python скриптінің мысалы)}

      ```python
      job_manifest.set_executor_settings(
        {"instances": 2, "cores": 2, "memory": "1024m"})
      ```

      {/cut}

    - Spark драйверінің баптауларын өзгертіңіз.

      {cut(Python скриптінің мысалы)}

      ```python
      job_manifest.set_driver_settings(
        {"coreLimit": "100m", "cores": 2, "memory": "1024m"})
      ```

      {/cut}

    Манифесті баптаудың көбірек мысалдары [get_default_manifest-signature](../../ml-platform-library/library-reference/spark-jobs#get_default_manifest_additional_info) әдісінің сипаттамасында келтірілген.

1. Spark тапсырмасын кластерге [spark_submit_job](../../ml-platform-library/library-reference/spark-jobs#spark_submit_job) әдісі арқылы жіберіңіз. Қолданба коды бар файлға жолды көрсету үшін тәсілдердің бірін пайдаланыңыз:

    {tabs}
    
    {tab(Локальный файл)}
    `spark_submit_job` әдісінің `pycode_file_path` аргументінде Python қолданбасы файлына жергілікті жолды көрсетіңіз.

    Python скриптінің мысалы:

    ```python
    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest, pycode_file_path="<ИМЯ_ПРИЛОЖЕНИЯ>.py")
    ```

    {/tab}
    
    {tab(Файл в Docker-образе)}
        
    Қолданба манифестінің `main_app_file` өрісінде Cloud Spark кластерінің Docker-образына кірістірілген қолданба файлына жолды көрсетіңіз.

    Python скриптінің мысалы:

    ```python
    job_manifest.main_app_file="local:///opt/spark/examples/src/main/python/<ИМЯ_ПРИЛОЖЕНИЯ>.py"
    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    {/tab}
    
    {tab(Файл в бакете)}
    
    Қолданба манифестінің `main_app_file` өрісінде бакетке жүктелген қолданба файлына жолды көрсетіңіз.

    Әртүрлі тілдерге арналған скрипт мысалы:

    {tabs}
    
    {tab(Scala)}
        
    ```scala
    job_manifest.spec_type = "Scala"
    job_manifest.main_class = "org.apache.spark.examples.<имя главного класса>"
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<ИМЯ_ПРИЛОЖЕНИЯ>.jar"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    {/tab}
    
    {tab(Java)}
    
    ```java
    job_manifest.spec_type = "Java"
    job_manifest.main_class = "org.apache.spark.examples.<имя главного класса>"
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<ИМЯ_ПРИЛОЖЕНИЯ>.java"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    {/tab}
    
    {tab(Python)}
    
    ```python
    job_manifest.main_app_file = f"s3a://{BUCKET_NAME}/spark-files/<ИМЯ_ПРИЛОЖЕНИЯ>.py"

    mlp.spark_submit_job(cluster_id=CLUSTER_ID, manifest=job_manifest)
    ```

    {/tab}

    {/tabs}

    Мұнда `spark-files` — қолданба коды бар файлдар бұрын жүктелген бакет директориясы.

    {/tab}

    {/tabs}

{note:info}

Spark тапсырмаларын іске қосудың толық мысалдары [Spark тапсырмаларымен базалық жұмыс](../../how-to-guides/submit-basic-job-pi) және [Spark тапсырмаларымен кеңейтілген жұмыс](../../how-to-guides/submit-advanced-job-clickhouse) бөлімдерінде келтірілген.

{/note}
