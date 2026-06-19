# {heading(Ошибка при подключение к Cloud Spark через SparkSession)[id=spark-session_error]}

## {heading(Проблема)[id=spark-session_error_problem]}

Не работает подключение к Cloud Spark через `SparkSession`. 

Проблема возникает, потому что Cloud Spark разворачивается на кластерах Kubernetes с помощью Spark Operator. Такая схема не предполагает наличие master-узла Spark, поэтому к Spark нельзя подключиться с помощью `SparkSession`.

## {heading(Решение)[id=spark-session_error_solving]}

Используйте для работы с Cloud Spark манифест Spark-задач и специальный клиент `mlplatform_client`. Подробнее о работе с клиентом в инструкции {linkto(../../instructions/run_jobs_example#run_jobs_install_client)[text=Пример создания и запуска Spark-задачи]}.