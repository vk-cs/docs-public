# {heading(Spark нұсқасы)[id=spark_version]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Cloud Spark қызметінде Apache Spark 3.5.1 нұсқасы қолданылады.

## {heading(3.5.1 нұсқасының мүмкіндіктері)[id=spark_version_features]}

Apache Spark 3.5.1 нұсқасы негізіндегі Cloud Spark-та қолжетімді:

- {linkto(../endpoints#spark-endpoints-connect)[text=Spark Connect эндпоинт]} арқылы Spark кластеріне қосу — Jupyter Notebook немесе IDE-ден Sparkпен жұмыс істеу, кодты жол бойынша орындау.
- Kubernetes-те орналастырылған басқарылатын Sparkjobs контейнерлерінде тапсырмаларды орындау. Контейнер ресурстарын масштабтауға болады.
- Cloud Iceberg Metastore немесе сыртқы Iceberg Metastore-ге қосылулар арқылы Iceberg-кестелермен жұмыс істеу.
- {var(s3)} немесе сыртқы S3-ке қосылулар арқылы S3-үйлесімді сақтау ортарына деректерді оқу және жазу.
- PostgreSQL дерекқорларына қосу.
- {linkto(../endpoints#spark-endpoints-service)[text=Spark History Server]}-де тапсырмалардың орындалуының интерактивті логтарын көру.

## {heading(Нұсқаны өзгерту)[id=spark_version_change]}

Spark нұсқасын қызмет данасының **Настройки** қойындысында көруге және өзгертуге болады немесе Terraform-дағы `sparkproxy_spark_version` параметрі арқылы өзгертуге болады. Толығырақ — {linkto(../../instructions/manage#spark_settings)[text=Spark нұсқасын көру және өзгерту]} бөлімінде.