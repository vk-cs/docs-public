[Cloud Spark](/ru/data-platform/spark/concepts/about) — фреймворк для обработки данных в режиме реального времени с возможностью распределения задач между несколькими вычислительными узлами, объединенными в кластеры. Опционально включается в архитектуру DLH при необходимости реализации сложных сквозных многоэтапных ETL-пайплайнов обработки данных от источников через S3-хранилище до конечных потребителей.

Cloud Spark ускоряет обработку больших данных благодаря реализованным технологическим решениям:

- In-memory processing — хранение и обработка данных в оперативной памяти.
- Lazy Evaluation — стратегия обработки данных, при которой выполнение вычислений откладывается до момента, пока не понадобится их результат.
- Resilient Distributed Datasets (RDD) — стратегия хранения данных как распределенного набора объектов, при которой исходные датасеты и результаты вычислений реплицируются на нескольких узлах кластера, что позволяет ускорить обработку запросов и повысить отказоустойчивость системы.
- Параллельная обработка и комбинирование операций — балансировка нагрузки по узлам кластера для возможности параллельного выполнения операций в режиме реального времени.

Компонент выполняет следующие функции:

- Предоставляет API для возможности выгрузки данных из источников – интеграционные сервисы могут быть написаны на языках Python, Java и R, что сильно снижает порог входа в DLH.
- Выполняет трансформацию данных, полученных из источников, до их сохранения в основное S3-хранилище DLH.
- Предоставляет библиотеки для двустороннего обмена данными с основным S3-хранилищем DLH с поддержкой различных типов данных:

    - Spark SQL – выполнение типичных для реляционных СУБД операций со структурированными данными.
    - Spark Streaming – обработка входящего потока данных в режиме реального времени.
    - GraphX – выполнение вычислений над огромными массивами связанных объектов «Вершина - Ребро» для решения типовых задач графовой аналитики (например, subgraph, joinVerticles и aggregateMessages).
    - MLlib – выполнение классификации, регрессии, кластеризации данных для подготовки датасетов и алгоритмов обучения ML-моделей.

- Преобразует данные DLH к формату, требуемому для отчетов, аналитики BI, машинного обучения.
- Взаимодействует с потребителями информации DLH напрямую или через специализированные СУБД для аналитики, например, [ClickHouse](#clickhouse) или [PostgreSQL](/ru/dbs/dbaas/how-to-guides/tls-connect).

Cloud Spark дополняет [Сloud Trino](../trino) в архитектуре DLH: Сloud Trino подходит для интерактивных аналитических запросов и задач data science, Cloud Spark обеспечивает ETL- и ELT-обработку, потоковые вычисления и машинное обучение. Использование обоих компонентов позволяет создать сбалансированную среду, где каждый инструмент применяется для наиболее подходящих задач.
