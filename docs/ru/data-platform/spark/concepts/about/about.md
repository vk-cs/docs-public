# {heading(О сервисе)[id=spark_info]}

{include(../../../_includes/_spark.md)[tags=intro]}

## {heading(Возможности сервиса)[id=capabilities]}

- Развертывание кластера Spark внутри Kubernetes.
- Автоматическая настройка master-узлов разворачиваемых кластеров.
- Отслеживание истории выполнения заданий Spark с помощью Spark History Server.

{ifdef(public)}
- Анализ производительности, поиск ошибок и мониторинг состояния кластера сервисами [Cloud Logging](/ru/monitoring-services/logging), [Cloud Alerting](/ru/monitoring-services/alerting), [Cloud Monitoring](/ru/monitoring-services/monitoring).
{/ifdef}
  
- Хранение объектов в хранилище {ifdef(public)} [VK Object Storage](/ru/storage/s3) {/ifdef} с поддержкой S3.
- Управление кластером, запуск и отладка приложений с помощью {ifdef(public)} [Python-библиотеки Cloud ML Platform](/ru/ml/spark-to-k8s/ml-platform-library) {/ifdef} {ifdef(data-p, data-p-pdf)} Python-библиотеки Cloud ML Platform {/ifdef}.
