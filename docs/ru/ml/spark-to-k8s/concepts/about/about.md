Apache Spark — фреймворк для обработки больших данных. Он состоит из API-интерфейсов на Java, Scala, Python и R, а также инструментов обработки [Spark SQL](https://spark.apache.org/docs/latest/sql-programming-guide.html) для SQL, [Pandas API](https://spark.apache.org/docs/latest/api/python/getting_started/quickstart_ps.html), [MLlib](https://spark.apache.org/docs/latest/ml-guide.html) для машинного обучения, [GraphX](https://spark.apache.org/docs/latest/graphx-programming-guide.html) для обработки графиков и [Structured Streaming](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html) для потоковой обработки. Чаще всего Spark используется в составе Hadoop-кластера.

Cloud Spark — решение на базе [Apache Spark Operator](https://github.com/GoogleCloudPlatform/spark-on-k8s-operator) и [PaaS Kubernetes](/ru/kubernetes/k8s) от VK Cloud. Оно позволяет развернуть Spark внутри Kubernetes с помощью образа из Docker Registry, без использования Hadoop-кластера.

## Для каких задач подходит сервис

- Распределенная обработка больших данных.
- Чтение данных из объектного хранилища с их дальнейшим экспортом в БД для обработки (ClickHouse, Greenplum, PostgreSQL). Также возможна передача данных из БД в объектное хранилище.
- Распределенное обучение ML-моделей с использованием больших данных.
- Графовые вычисления с применением компонента [GraphX](https://spark.apache.org/docs/latest/graphx-programming-guide.html).

## Возможности сервиса

- Развертывание кластера Spark внутри Kubernetes.
- Автоматическая настройка master-узлов разворачиваемых кластеров.
- Использование [Docker Registry](ru/kubernetes/k8s/operations/addons/advanced-installation/install-advanced-registry) от VK Cloud с предустановленным образом Spark.
- Горизонтальное и вертикальное масштабирование кластера с поддержкой автоматического масштабирования.
- Разграничение доступов с помощью токенов и ролевой модели.
- Удаление кластера или перевод его в спящий режим по расписанию.
- Отслеживание истории выполнения заданий Spark с помощью Spark History Server.
- Анализ производительности, поиск ошибок и мониторинг состояния кластера сервисами [Cloud Logging](/ru/monitoring-services/logging), [Cloud Alerting](/ru/monitoring-services/alerting), [Cloud Monitoring](/ru/monitoring-services/monitoring).
- Хранение объектов в хранилище [Cloud Storage](ru/storage/s3) с поддержкой S3.
- Управление кластером, запуск и отладка приложений с помощью [Python-библиотеки Cloud ML Platform](ru/ml/spark-to-k8s/ml-platform-library).
