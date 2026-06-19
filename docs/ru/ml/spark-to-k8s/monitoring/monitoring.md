# {heading(Подключение к кластеру Spark)[id=mlspark-monitoring]}

Вы можете отслеживать состояние кластера Spark и анализировать его работу, используя следующие инструменты и сервисы:

- Cloud Logging;
- Cloud Monitoring;
- Cloud Alerting;
- журнал событий кластера;
- Spark History Server;
- методы библиотеки Cloud ML Platform.

## {heading(Использование Cloud Logging)[id=mlspark-monitoring-cloud-logging]}

Сервис [Cloud Logging](/ru/monitoring-services/logging) выполняет сбор, хранение и отображение логов пользовательских приложений и сервисов {var(cloud)}.

Чтобы иметь возможность просматривать логи кластера:

1. [Установите плагин логирования](/ru/monitoring-services/logging/instructions/connect-plugin) на ВМ кластера.
1. Подождите несколько минут, чтобы накопились данные.
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Мониторинг** → **Логирование**.
1. [Настройте](/ru/monitoring-services/logging/instructions/view-logs) фильтрацию логов в таблице.

## {heading(Использование Cloud Monitoring)[id=mlspark-monitoring-cloud-monitoring]}

Сервис [Cloud Monitoring](/ru/monitoring-services/monitoring) позволяет отслеживать и анализировать состояние кластера в режиме реального времени по заданным метрикам. Сервис отображает данные сбора метрик на графиках, которые можно настроить так, чтобы получать только нужную информацию о работе кластера.

Чтобы добавить график мониторинга кластера, воспользуйтесь [инструкцией](/ru/monitoring-services/monitoring/instructions/manage-dashboards#monitoring-create-custom-chart). В поле **Тип ресурса** выберите вариант **Сервис Spark в k8s**.

## {heading(Использование Cloud Alerting)[id=mlspark-monitoring-cloud-alerting]}

Сервис [Cloud Alerting](/ru/monitoring-services/alerting) позволяет настроить информирование об изменении ключевых метрик сервисов {var(cloud)}.

Чтобы получать уведомления о работе кластера:

1. [Создайте](/ru/monitoring-services/alerting/instructions/notification#alerting-notification-add) канал уведомлений.
1. [Настройте](/ru/monitoring-services/alerting/instructions/triggers#alerting-triggers-add) правила, при каких условиях будут отправляться уведомления по созданному каналу связи.

## {heading(Использование журнала событий)[id=mlspark-monitoring-event-journal]}

Журнал событий содержит сообщения о критических ошибках в работе кластера.

Чтобы просмотреть журнал событий:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Журнал событий**.

Если в работе кластера были ошибки, они будут отображаться на вкладке.

## {heading(Использование Spark History Server)[id=mlspark-monitoring-spark-history-server]}

Сервис Spark History Server собирает информацию об истории выполнения заданий и позволяет просматривать логи приложений в веб-интерфейсе. Сервис подключается для каждого кластера Spark.

Чтобы посмотреть логи в Spark History Server:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **ML Platform → Spark в k8s**.
1. Нажмите на имя нужного кластера.
1. На вкладке **Общие данные** перейдите по ссылке в строке **Spark History Server**.
1. Будет открыт инстанс Spark History Server. Для авторизации введите учетные данные:

    - логин и пароль от личного кабинета {var(cloud)} — этот способ используется для старых кластеров;
    - {linkto(../ml-platform-library/authz#mlspark-library-authz)[text=токен доступа]} — этот способ используется для новых кластеров.

Отобразится список событий кластера.

## Использование библиотеки Cloud ML Platform

Библиотека [Cloud ML Platform](../ml-platform-library/library-reference) позволяет получить списки событий и логов кластера.

Используйте следующие методы:

- {linkto(../ml-platform-library/library-reference/spark-jobs#mlspark-library-reference-spark-jobs-spark_events)[text=spark_events]} — получить список событий, произошедших в кластере.
- {linkto(../ml-platform-library/library-reference/spark-jobs#mlspark-library-reference-spark-jobs-spark_job_logs)[text=spark_job_logs]} — отобразить логи нужного приложения.
