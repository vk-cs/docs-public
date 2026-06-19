# {heading(Вопросы и ответы)[id=mlspark-faq]}

{cut(Какая конфигурация используется для master-узла?)}

Конфигурацию master-узла определяет режим работы кластера.

- **DEV**: для master-узла будет использоваться виртуальная машина с 2 vCPU и 4 GB RAM.
- **PROD**: для master-узла будет использоваться виртуальная машина с 6 vCPU и 6 GB RAM.

{/cut}

{cut(Можно ли подключиться к кластеру с помощью kubectl или библиотеки?)}

Чтобы подключиться к кластеру, используйте токены доступа в личном кабинете {var(cloud)} или библиотеке Cloud ML Platform. Процесс создания токенов подробно описан в разделе {linkto(../ml-platform-library/authz#mlspark-library-authz)[text=Аутентификация и авторизация]}.

{note:err}

Не используйте kubectl для подключения к кластеру Spark и не меняйте напрямую сущности Kubernetes: секреты, пространства имен, Deployments, ConfigMaps, настройки Spark Operator.

Это может привести к неправильной работе приложения.

{/note}

{/cut}

{cut(Как получить доступ к Spark History Server?)}

Воспользуйтесь {linkto(../monitoring#mlspark-monitoring-spark-history-server)[text=инструкцией]}.

{/cut}

{cut(Как получить доступ к бакету?)}

По умолчанию у кластера Spark есть доступ к бакету [VK Object Storage](/ru/storage/s3), который автоматически создается вместе с кластером. Чтобы получить доступ к другим бакетам, воспользуйтесь {linkto(../instructions/buckets#mlspark-instructions-buckets)[text=инструкцией]}.

{/cut}

{cut(Какие сервисы для мониторинга и логирования можно подключить для кластера Spark?)}

Кластеры Spark по умолчанию подключены к сервисам:

- [Cloud Logging](/ru/monitoring-services/logging) — сбор и анализ логов.
- [Cloud Alerting](/ru/monitoring-services/alerting) — отправка уведомлений об изменении ключевых метрик сервисов {var(cloud)}.
- [Cloud Monitoring](/ru/monitoring-services/monitoring) — отслеживание состояния ресурсов с использованием широкого набора метрик.

Подробнее — в статье {linkto(../monitoring#mlspark-monitoring)[text=Мониторинг кластера]}.

{/cut}
