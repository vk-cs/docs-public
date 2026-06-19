# {heading(SparkSession арқылы Cloud Spark-ке қосылу кезіндегі қате)[id=spark-session_error]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Мәселе)[id=spark-session_error_problem]}

Cloud Spark-ке `SparkSession` арқылы қосылу жұмыс істемейді. 

Мәселе Cloud Spark-тың Kubernetes кластерлерінде Spark Operator көмегімен жайылтылуына байланысты туындайды. Мұндай сызба Spark master-түйінінің болуын көздемейді, сондықтан Spark-қа `SparkSession` көмегімен қосылу мүмкін емес.

## {heading(Шешім)[id=spark-session_error_solving]}

Cloud Spark-пен жұмыс істеу үшін Spark-тапсырмаларының манифестін және арнайы `mlplatform_client` клиентін пайдаланыңыз. Клиентпен жұмыс істеу туралы толығырақ {linkto(../../instructions/run_jobs_example#run_jobs_install_client)[text=Spark-тапсырмасын жасау және іске қосу мысалы]} нұсқаулығында берілген.