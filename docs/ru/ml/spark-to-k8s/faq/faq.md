
<details>

<summary>Какая конфигурация используется для master-узла?</summary>

Конфигурацию master-узла определяет режим работы кластера.

- **DEV**: для master-узла будет использоваться виртуальная машина с 2 vCPU и 4 GB RAM.
- **PROD**: для master-узла будет использоваться виртуальная машина с 6 vCPU и 6 GB RAM.

</details>

<details>

<summary>Можно ли подключиться к кластеру с помощью kubectl или библиотеки?</summary>

Чтобы подключиться к кластеру, используйте токены доступа в личном кабинете VK Cloud или библиотеке Cloud ML Platform. Процесс создания токенов подробно описан в разделе [Аутентификация и авторизация](/ru/ml/spark-to-k8s/ml-platform-library/authz).

<err>

Не используйте kubectl для подключения к кластеру Spark и не меняйте напрямую сущности Kubernetes: секреты, пространства имен, Deployments, ConfigMaps, настройки Spark Operator.

Это может привести к неправильной работе приложения.

</err>

</details>

<details>

<summary>Как получить доступ к Spark History Server?</summary>

Воспользуйтесь [инструкцией](/ru/ml/spark-to-k8s/monitoring#ispolzovanie_spark_history_server).

</details>

<details>

<summary>Как получить доступ к бакету?</summary>

По умолчанию у кластера Spark есть доступ к бакету [Cloud Storage](/ru/storage/s3), который автоматически создается вместе с кластером. Чтобы получить доступ к другим бакетам, воспользуйтесь [инструкцией](/ru/ml/spark-to-k8s/service-management/buckets).

</details>

<details>

<summary>Какие сервисы для мониторинга и логирования можно подключить для кластера Spark?</summary>

Кластеры Spark по умолчанию подключены к сервисам:

- [Cloud Logging](/ru/monitoring-services/logging) — сбор и анализ логов.
- [Cloud Alerting](/ru/monitoring-services/alerting) — отправка уведомлений об изменении ключевых метрик сервисов VK Cloud.
- [Cloud Monitoring](/ru/monitoring-services/monitoring) — отслеживание состояния ресурсов с использованием широкого набора метрик.

Подробнее — в статье [Мониторинг кластера](/ru/ml/spark-to-k8s/monitoring).

</details>
