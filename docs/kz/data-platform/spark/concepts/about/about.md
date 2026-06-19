# {heading(Қызмет туралы)[id=spark_info]}

{include(/kz/_includes/_translated_by_ai.md)}

{include(../../../_includes/_spark.md)[tags=intro]}

## {heading(Қызмет мүмкіндіктері)[id=capabilities]}

- Kubernetes ішінде Spark кластерін өрістету.
- Өрістетілетін кластерлердің master-түйіндерін автоматты түрде баптау.
- Spark History Server көмегімен Spark тапсырмаларының орындалу тарихын қадағалау.

{ifdef(public)}
- [Cloud Logging](/kz/monitoring-services/logging), [Cloud Alerting](/kz/monitoring-services/alerting), [Cloud Monitoring](/kz/monitoring-services/monitoring) сервистері арқылы өнімділікті талдау, қателерді іздеу және кластер күйін мониторингтеу.
{/ifdef}

- S3 қолдауы бар {ifdef(public)} [VK Object Storage](/kz/storage/s3) {/ifdef} қоймасында объектілерді сақтау.
- {ifdef(public)} [Cloud ML Platform Python кітапханасы](/kz/ml/spark-to-k8s/ml-platform-library) {/ifdef} {ifdef(data-p, data-p-pdf)} Cloud ML Platform Python кітапханасы {/ifdef} көмегімен кластерді басқару, қолданбаларды іске қосу және жөндеу.
