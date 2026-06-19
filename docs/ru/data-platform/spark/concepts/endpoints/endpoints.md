# {heading(Эндпоинты)[id=spark-endpoints]}

Cloud Spark предоставляет эндпоинты для работы с сервисом: Spark Connect и Spark Service. Эндпоинты отображаются на странице экземпляра сервиса на вкладке **Общая информация**.

## {heading(Spark Connect)[id=spark-endpoints-connect]}

Эндпоинт Spark Connect позволяет работать со Spark как с удаленной средой выполнения, подключаться к Spark из Jupyter Notebook или IDE и выполнять код построчно. Чтобы подключить эндпоинт, укажите его в переменной `SPARK_CONNECT_HOST` в клиентском скрипте.

## {heading(Spark Service)[id=spark-endpoints-service]}

Эндпоинт Spark Service можно использовать двумя способами:

- Просмотр в браузере интерактивных логов завершенных Spark-задач в сервисе History Server. Чтобы перейти в сервис, нажмите на эндпоинт на вкладке **Общая информация**. Подробнее о работе с сервисом — в инструкции {linkto(../../instructions/interactive_logs#spark_interactive_logs)[text=Просмотр интерактивных логов]}.
- Подключение к кластеру Spark из скрипта Spark-задачи. Для этого укажите эндпоинт в переменной `HOST` в скрипте задачи.
