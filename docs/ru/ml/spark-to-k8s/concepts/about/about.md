{include(/ru/_includes/_spark.md)[tags=intro]}

## Возможности сервиса

- Развертывание кластера Spark внутри Kubernetes.
- Автоматическая настройка master-узлов разворачиваемых кластеров.
- Использование [Docker Registry](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-registry) от VK Cloud с предустановленным образом Spark.
- Горизонтальное и вертикальное масштабирование кластера с поддержкой автоматического масштабирования.
- Разграничение доступов с помощью токенов и ролевой модели.
- Удаление кластера или перевод его в спящий режим по расписанию.
- Отслеживание истории выполнения заданий Spark с помощью Spark History Server.
- Анализ производительности, поиск ошибок и мониторинг состояния кластера сервисами [Cloud Logging](/ru/monitoring-services/logging), [Cloud Alerting](/ru/monitoring-services/alerting), [Cloud Monitoring](/ru/monitoring-services/monitoring).
- Хранение объектов в хранилище [VK Object Storage](/ru/storage/s3) с поддержкой S3.
- Управление кластером, запуск и отладка приложений с помощью [Python-библиотеки Cloud ML Platform](/ru/ml/spark-to-k8s/ml-platform-library).
