# {heading(About the service)[id=airflow_info]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

Cloud Airflow is a service for programming, scheduling, and monitoring workflows based on the [Apache Airflow](https://airflow.apache.org/) platform and Kubernetes clusters.

Workflows are sequences of tasks that are executed in a specific order according to a defined schedule or trigger. Typically, these are tasks implementing ETL processes (Extract, Transform, Load). Such tasks can be repetitive and have complex dependencies on each other, which makes managing them difficult.

The Cloud Airflow service represents workflows as directed acyclic graphs (DAG — Directed Acyclic Graph), in which the relationships between tasks and the order of their execution are strictly defined. In the service, you can create and run tasks, manage them, track their execution status, and analyze logs and possible errors.

## Possible use cases for the service

- ETL process orchestration: automating the extraction, transformation, and loading of data from heterogeneous sources into target storage.
- Data pipeline management: building complex data processing chains with dependency control and error handling.
- Task scheduling: executing periodic operations (daily reports, data mart updates) according to a defined schedule.
- Machine learning: orchestrating the training and operation of ML models.
- Integrations with external systems for data transfer.
- Event processing: reacting to events in real time (appearance of new files, messages in queues).