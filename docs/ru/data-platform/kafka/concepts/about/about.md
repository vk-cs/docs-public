# {heading(О сервисе)[id=kafka_info]}

{ifdef(public)}

{include(/ru/_includes/_dp-unavailable.md)}

{/ifdef}

Cloud Kafka — управляемый сервис на базе Apache Kafka, разработанный VK Tech. Сервис поставляется в составе {var(data-p)}, которая позволяет разворачивать готовый к использованию {linkto(../architecture#kafka_architecture)[text=кластер Cloud Kafka]}.

Cloud Kafka предоставляет распределенную платформу для потоковой передачи данных в виде {linkto(../entities#kafka_entities)[text=сообщений]}: одни приложения публикуют сообщения, а другие их читают. Приложения читают сообщения независимо друг от друга: в отдельных {linkto(../entities#kafka-entities-groups)[text=группах потребителей]} и из нужных {linkto(../entities#kafka_entities_topic)[text=топиков]}. Остановка одного потребителя не блокирует работу остальных.

## {heading(Назначение сервиса)[id=kafka-about-tasks]}

Сервис Cloud Kafka подходит для сценариев, в которых поставщики и потребители данных работают с разной скоростью: сообщения накапливаются в топике, а потребители читают их, когда готовы обработать. Сервис позволяет:

- Связывать приложения и информационные системы. Например, передавать события о заказах между системами продаж или об изменении статусов заявлений между системами организации.
- Передавать данные для аналитики и машинного обучения. Например, собирать события об обработке заявок из нескольких подразделений для расчета показателей или передавать данные в приложения с ML-моделями.
- Собирать показания устройств интернета вещей (IoT). Например, передавать телеметрию оборудования в приложения, которые отслеживают его состояние и выявляют отклонения.
- Передавать события о действиях пользователей сайта или приложения для персонализации и уведомлений. Например, направлять сведения о просмотренных материалах в систему рекомендаций.
- Собирать логи и метрики приложений для передачи в системы мониторинга и анализа.

## {heading(Возможности {var(data-p)})[id=kafka-about-features]}

Через интерфейс {var(data-p)} доступны:

- {linkto(../../instructions/create#kafka_create)[text=Создание и настройка экземпляра Cloud Kafka]}. При создании экземпляра можно задать ресурсы узлов и подключить {linkto(../architecture#kafka-architecture-components)[text=дополнительные компоненты]} для работы с сообщениями.
- {linkto(../../instructions/management#kafka_scaling)[text=Масштабирование]}. После создания экземпляра можно изменить число брокеров, ресурсы узлов и {linkto(../../instructions/management#kafka_disk-resize)[text=размер дисков]}.
- {linkto(../../instructions/management#kafka_maintenance)[text=Обслуживание]}. В интерфейсе {var(data-p)} можно обновить версию Apache Kafka и выполнить резервное копирование.
- {ifdef(public)}Мониторинг и логи{/ifdef}{ifndef(public)}{linkto(../../instructions/monitoring#kafka-monitoring)[text=Мониторинг]} и {linkto(../../instructions/logs#kafka-logs)[text=логи]}{/ifndef}. С помощью метрик и логов экземпляра сервиса можно отследить нагрузку, использование ресурсов и события.
- {ifdef(public)}{linkto(../iam-access#kafka-concepts-iam)[text=Разграничение доступа]}{/ifdef}{ifndef(public)}{linkto(../access_management#kafka-concepts-iam)[text=Разграничение доступа]}{/ifndef}. Права участников проекта позволяют ограничить действия по управлению экземпляром, а роли учетных записей Cloud Kafka — доступ к объектам и данным сервиса.

## {heading(Что дальше)[id=kafka-about-next]}

- {linkto(../entities#kafka_entities)[text=Узнайте, как работает сервис]}.
- {linkto(../architecture#kafka_architecture)[text=Познакомьтесь с архитектурой сервиса]}.
- {linkto(../availability#kafka-availability)[text=Узнайте, как обеспечить высокую доступность]}.
- {ifdef(public)}{linkto(../iam-access#kafka-concepts-iam)[text=Ознакомьтесь с разграничением доступа]}{/ifdef}{ifndef(public)}{linkto(../access_management#kafka-concepts-iam)[text=Ознакомьтесь с разграничением доступа]}{/ifndef}.
