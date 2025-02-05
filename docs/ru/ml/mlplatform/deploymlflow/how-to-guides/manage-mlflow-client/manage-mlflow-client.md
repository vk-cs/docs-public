
Управляйте инстансами MLflow Deploy с помощью MLflow Deployment Client — предустановленной python-библиотеки в JupyterHub от VK Cloud.

## Перед началом работы

1. [Создайте](../../../jupyterhub/service-management/create/) инстанс JupyterHub.
2. [Создайте](../../../mlflow/service-management/create/) инстанс MLflow.
3. Перезагрузите виртуальную машину с JupyterHub:
   1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
   1. В подразделе **Инстансы ML Platform** нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса JupyterHub и выберите пункт **Перезагрузить**.

<info>

Инстансы JupyterHub, MLflow и MLflow Deploy должны быть созданы в одной сети.

</info>

## Подготовка ML-модели

1. [Подключитесь](../../../jupyterhub/service-management/connect/) к инстансу JupyterHub.
2. Перейдите в директорию **tutorials**.

   В состав JupyterHub от VK Cloud включены обучающие Jupyter-ноутбуки: `mlflow_demo.ipynb` и `mlflow_deploy_demo.ipynb`.

3. Подготовьте тестовую ML-модель:
   1. Нажмите два раза на `mlflow_demo.ipynb`.
   2. В открывшемся окне нажмите на клетку с примером кода и выберите в меню **Run → Run Selected Cells**.
   3. Повторите операцию для всех клеток с кодом.

## Управление инстансом

Чтобы пройти весь сценарий обучающего Jupyter-ноутбука:

1. Нажмите два раза на `mlflow_deploy_demo.ipynb`.
2. В открывшемся окне нажмите на клетку с примером кода и выберите в меню **Run → Run Selected Cells**.
3. Повторите операцию для всех клеток с кодом.

Разберем подробнее проводимые операции с развертыванием сервера и docker-контейнера.

### Создание MlflowClient

Создайте MlflowClient из Tracking модуля MLflow для получения URI ML-модели. URI понадобится далее для развертывания ML-модели. В примере приведено обращение к ML-модели по URI.

```python
from mlflow.tracking import MlflowClient
cli = MlflowClient()
```

Для примера используйте самую первую ML-модель:

```python
model_source_uri = cli.search_registered_models()[0].latest_versions[0].source
print("Имя ML-модели: ", cli.search_registered_models()[0].latest_versions[0].name)
print("URI ML-модели: ", model_source_uri)
```

Создайте Client из Deployments модуля MLflow для работы в Cloud ML Platform:

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlplatform')
```

### Создание endpoint

`endpoint` в терминологии VK Cloud MLflow Deploy — это ВМ, сконфигурированная как сервер развертывания.

```python
deploy_server_name = "deploy_server_one"
client.create_endpoint(name=deploy_server_name)
```
  
`client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)`

Выше перечислен полный список параметров. Создать сервер развертывания можно и с указанием только имени сервера. В этом случае в качестве значения параметра `av_zone` будет выбрана зона, в которой расположен связанный MLflow сервис.

Параметр `perfomance` в методе `create_enpoint` отвечает за конфигурацию виртуальной машины. Доступны следующие значения:

- `low — standard 4-4` (4 ядра, 4 гигабайта RAM);
- `mid — advanced 8-8` (8 ядер, 8 гигабайт RAM);
- `high — advanced 16-16` (16 ядер, 16 гигабайт RAM).

### Получение списка и статуса серверов

Сервер развертывания готов для работы после смены статуса `CREATING` на `RUNNING`. Обычно подготовка сервера развертывания занимает около пяти-десяти минут.

```python
client.list_endpoints()
```

Получите информацию о статусе сервера развертывания по его имени:

```python
client.get_endpoint(deploy_server_name)
```

### Создание deployment

`deployment` в терминологии VK Cloud MLflow Deploy — это запущенный docker-контейнер с ML-моделью на сервере развертывания.

```python
deployment_name="test_deployment"
client.create_deployment(server_name=deploy_server_name, deployment_name=deployment_name, model_uri=model_source_uri, port_out = None)
```

`port_out` можно не указывать, будет выбран первый свободный в диапазоне от `62000` до `65000`. Запуск ML-модели обычно занимает менее минуты.

### Получение списка и статуса deployment

1. Выведите список запущенных ML-моделей на сервере развертывания:

   ```python
   client.list_deployments(deploy_server_name)
   ```

1. Получите информацию о развернутой ML-модели по имени сервера развертывания и ML-модели:

   ```python
   client.get_deployment(deploy_server_name, deployment_name)
   ```

1. Используйте метод `predict` у ML-модели в docker-контейнере:

   ```python
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],[0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]]}
   client.predict(deploy_server_name, deployment_name, data)
   ```

### Создание deployment, доступного по публичному DNS

1. Задайте имя пользователя и пароль.

   <info>

   Рекомендуется задавать реквизиты, отличные от учетных данных личного кабинета VK Cloud или параметров авторизации на инстансе JupyterHub.

   </info>

   ```bash
   auth_value = "user:PasswordDA@dvv//!123$"
   auth_deployment_name = "test_deploy_auth"
   client.create_deployment(deploy_server_name, auth_deployment_name, model_source_uri, auth=auth_value)
   ```

1. Получите информацию о развернутой ML-модели:

   ```python
   deployment_info = client.get_deployment(deploy_server_name, auth_deployment_name)
   print(deployment_info)
   ```

1. Получите DNS-имя для обращения к ML-модели:

   ```python
   print(deployment_info['model_ref'])
   ```

1. Сформируйте запрос с данными для авторизации (ниже приведен пример):

   ```python
   import requests
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],[0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]]}
   response = requests.post('https://ml-platform-3bb5b04ebb82c0.ml.msk.vkcs.cloud/deploy/0e84f86c-b9f0-4102-861d-222c41a81452/test_deploy_auth/invocations', json=data, auth=("user", "PasswordDA@dvv//!123$"))
   print(response.text)
   ```

1. Используйте метод `predict` у ML-модели в docker-контейнере:

   ```python
   client.predict(deploy_server_name, auth_deployment_name, data)
   ```

### Удаление deployment

Удалите deployment с сервера развертывания, обращаясь по имени сервера и deployment:

```python
client.delete_deployment(deploy_server_name, deployment_name)
```

### {heading(Удаление сервера развертывания)[id=delete_deploy_server]}

```python
client.delete_endpoint(deploy_server_name)
```

### Краткий список методов

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlpatform')

# endpoint – это ВМ, сконфигурированная как сервер развертывания
client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)
client.list_endpoints()
client.get_endpoint(server_name)

# deployment – запущенный docker-контейнер с ML-моделью на сервере развертывания
client.create_deployment(server_name, deployment_name, model_uri, port_out = None)

# port_out можно не указывать, выберется первый свободный в диапазоне от 62000 до 65000
client.list_deployments(server_name)
client.get_deployment(server_name, deployment_name)

# вызов метода predict у ML-модели в docker-контейнере
client.predict(server_name, deployment_name, df_payload)

client.delete_deployment(server_name, deployment_name)
client.delete_endpoint(server_name)
```
