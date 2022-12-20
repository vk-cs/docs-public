Управляйте инстансами MLflow Deploy с помощью MLflow Deployment Client, предустановленной python-библиотеки в JupyterHub от VK Cloud.

## Перед началом работы

1. [Создайте](../../../jupyterhub/start/create/) инстанс JupyterHub.
2. [Создайте](../../../mlflow/start/create/) инстанс MLflow.
3. Перезагрузите виртуальную машину с JupyterHub:
   1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
   2. В подразделе **Инстансы ML Platform** найдите нужный инстанс JupyterHub.
   3. Наведите на значок с тремя точками и выберите пункт **Перезагрузить**.

<info>

Инстансы JupyterHub, MLflow и MLflow Deploy должны быть созданы в одной сети.

</info>

## Подготовка модели

1. [Подключитесь](../../../../../ml/mlplatform/jupyterhub/start/connect/) к инстансу JupyterHub.
2. Перейдите в директорию **tutorials**.

   В состав JupyterHub от VK Cloud включены обучающие Jupyter-ноутбуки: `mlflow_demo.ipynb` и `mlflow_deploy_demo.ipynb`.

3. Подготовьте тестовую модель:
   1. Нажмите два раза на `mlflow_demo.ipynb`.
   2. В открывшемся окне нажмите на клетку с примером кода и выберите в меню **Run → Run Selected Cells**.
   3. Повторите операцию для всех клеток с кодом.

## Управление инстансом

Чтобы пройти весь сценарий обучающего Jupyter-ноутбука:

1. Нажмите два раза на `mlflow_deploy_demo.ipynb`.
2. В открывшемся окне нажмите на клетку с примером кода и выберите в меню **Run → Run Selected Cells**.
3. Повторите операцию для всех клеток с кодом.

Разберем подробнее проводимые операции с разворачиванием сервера и docker-контейнера.

### Создание MlflowClient

Создайте MlflowClient из Tracking модуля MLflow для получения URI ML-модели. URI нам понадобится далее для деплоя модели. Мы будем обращаться к модели по URI.

```python
from mlflow.tracking import MlflowClient
cli = MlflowClient()
```

Берем для демо целей самую первую модель:

```python
model_source_uri = cli.search_registered_models()[0].latest_versions[0].source
print("Имя модели: ", cli.search_registered_models()[0].latest_versions[0].name)
print("URI модели: ", model_source_uri)
```

Создаем Client из Deployments модуля MLflow для работы в VK Cloud ML Platform

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlplatform')
```

### Создание endpoint

`endpoint` в терминологии VK Cloud MLflow Deploy — это деплой-сервер виртуальной машины.

```python
deploy_server_name = "deploy_server_one"
client.create_endpoint(name=deploy_server_name)
```
  
`client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)`

Выше перечислен полный список параметров. Создать деплой-сервер можно и с указанием только имени сервера. `av_zone` в этом случае будет взята аналогично зоне в которой расположен связанный MLflow сервис.

Параметр `perfomance` в методе `create_enpoint` отвечает за конфигурацию виртуальной машины. Доступны следующие значения:

- `low — standard 4-4` (4 ядра, 4 гигабайта RAM),
- `mid — advanced 8-8` (8 ядер, 8 гигабайт RAM),
- `high — advanced 16-16`

### Получение списка и статуса серверов

Деплой-сервер готов для работы после смены статуса `CREATING` на `RUNNING`. Обычно подготовка деплой-сервера занимает около пяти-десяти минут.

```python
client.list_endpoints()
```

Получаем информацию о статусе деплой-сервера по его имени:

```python
client.get_endpoint(deploy_server_name)
```

### Создание deployment

`deployment` в терминологии VK Cloud MLflow Deploy — это запущенный docker-контейнер с моделью на деплой-сервере.

```python
deployment_name="test_deployment"
client.create_deployment(server_name=deploy_server_name, deployment_name=deployment_name, model_uri=model_source_uri, port_out = None)
```

`port_out` можно не указывать, выберется первый свободный в диапазоне от 62000 до 65000. Запуск модели обычно занимает менее минуты.

### Получение списка и статуса deployment

Список запущенных моделей на деплой-сервере:

```python
client.list_deployments(deploy_server_name)
```

Получаем статус и информацию о развернутой модели по имени деплой-сервера и модели:

```python
client.get_deployment(deploy_server_name, deployment_name)
```

Вызываем метод `predict` у модели в docker-контейнере:

```python
data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],[0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]]}
client.predict(deploy_server_name, deployment_name, data)
```

### Удаление deployment

Удаляем deployment с сервера, обращаясь по имени сервера и deployment:

```python
client.delete_deployment(deploy_server_name, deployment_name)
```

### Удаление деплой-сервера

```python
client.delete_endpoint(deploy_server_name)
```

### Краткий список методов

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlpatform')

# endpoint – это деплой-сервер ВМ
client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)
client.list_endpoints()
client.get_endpoint(server_name)

# deployment – запущеный docker-контейнер с моделью на deployment сервере
client.create_deployment(server_name, deployment_name, model_uri, port_out = None)

# port_out – можно не указывать, выберется первый свободный в диапазоне от 62000 до 65000
client.list_deployments(server_name)
client.get_deployment(server_name, deployment_name)

# вызов метода predict у модели в docker-контейнере
client.predict(server_name, deployment_name, df_payload)

client.delete_deployment(server_name, deployment_name)
client.delete_endpoint(server_name)
```
