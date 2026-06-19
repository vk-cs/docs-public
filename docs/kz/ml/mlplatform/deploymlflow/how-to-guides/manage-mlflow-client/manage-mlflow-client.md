# {heading(MLflow Client көмегімен ML-модельдерді орналастыру)[id=mlflowdeploy-htg-manage-ml]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(cloud)} ұсынған JupyterHub-та алдын ала орнатылған python-кітапхана — MLflow Deployment Client көмегімен MLflow Deploy инстанстарын басқарыңыз.

## {heading(Жұмысты бастамас бұрын)[id=mlflowdeploy-htg-manage-ml-before-work]}

1. [Құрыңыз](../../../jupyterhub/instructions/create) JupyterHub инстансын.
2. [Құрыңыз](../../../mlflow/instructions/create) MLflow инстансын.
3. JupyterHub бар виртуалды машинаны қайта жүктеңіз:
   1. **Бұлттық есептеулер → Виртуалды машиналар** бөліміне өтіңіз.
   1. **ML Platform инстанстары** бөлімшесінде қажетті JupyterHub инстансы үшін ![ ](/kz/assets/more-icon.svg "inline") басып, **Қайта жүктеу** тармағын таңдаңыз.

{note:info}

JupyterHub, MLflow және MLflow Deploy инстанстары бір желіде құрылуы керек.

{/note}

## {heading(ML-модельді дайындау)[id=mlflowdeploy-htg-manage-ml-prepare-mlmodel]}

1. [Қосылыңыз](../../../jupyterhub/instructions/connect) JupyterHub инстансына.
2. **tutorials** директориясына өтіңіз.

   {var(cloud)} ұсынған JupyterHub құрамына оқытуға арналған Jupyter ноутбуктары кіреді: `mlflow_demo.ipynb` және `mlflow_deploy_demo.ipynb`.

3. Тестілік ML-модельді дайындаңыз:
   1. `mlflow_demo.ipynb` файлын екі рет басыңыз.
   2. Ашылған терезеде код мысалы бар ұяшықты басып, мәзірден **Run → Run Selected Cells** таңдаңыз.
   3. Код бар барлық ұяшықтар үшін әрекетті қайталаңыз.

## {heading(Инстансты басқару)[id=mlflowdeploy-htg-manage-ml-instance-manage]}

Оқытуға арналған Jupyter ноутбугының бүкіл сценарийін орындау үшін:

1. `mlflow_deploy_demo.ipynb` файлын екі рет басыңыз.
2. Ашылған терезеде код мысалы бар ұяшықты басып, мәзірден **Run → Run Selected Cells** таңдаңыз.
3. Код бар барлық ұяшықтар үшін әрекетті қайталаңыз.

Орналастыру сервері мен docker-контейнерді орналастыру бойынша орындалатын операцияларды толығырақ қарастырайық.

### {heading(MlflowClient жасау)[id=mlflowdeploy-htg-manage-ml-instance-manage-create-client]}

ML-модельдің URI-сын алу үшін MLflow-тың Tracking модулінен MlflowClient жасаңыз. URI кейін ML-модельді орналастыру үшін қажет болады. Мысалда URI бойынша ML-модельге жүгіну келтірілген.

```python
from mlflow.tracking import MlflowClient
cli = MlflowClient()
```

Мысал үшін ең бірінші ML-модельді пайдаланыңыз:

```python
model_source_uri = cli.search_registered_models()[0].latest_versions[0].source
print("Имя ML-модели: ", cli.search_registered_models()[0].latest_versions[0].name)
print("URI ML-модели: ", model_source_uri)
```

Cloud ML Platform-та жұмыс істеу үшін MLflow-тың Deployments модулінен Client жасаңыз:

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlplatform')
```

### {heading(endpoint жасау)[id=mlflowdeploy-htg-manage-ml-instance-manage-create-endpoint]}

`endpoint` {var(cloud)} MLflow Deploy терминологиясында — орналастыру сервері ретінде бапталған ВМ.

```python
deploy_server_name = "deploy_server_one"
client.create_endpoint(name=deploy_server_name)
```
  
`client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)`

Жоғарыда параметрлердің толық тізімі келтірілген. Орналастыру серверін тек сервер атауын көрсету арқылы да жасауға болады. Бұл жағдайда `av_zone` параметрінің мәні ретінде байланыстырылған MLflow сервисі орналасқан аймақ таңдалады.

`create_enpoint` әдісіндегі `perfomance` параметрі виртуалды машинаның конфигурациясына жауап береді. Келесі мәндер қолжетімді:

- `low — standard 4-4` (4 ядро, 4 гигабайт RAM);
- `mid — advanced 8-8` (8 ядро, 8 гигабайт RAM);
- `high — advanced 16-16` (16 ядро, 16 гигабайт RAM).

### {heading(Серверлер тізімі мен күйін алу)[id=mlflowdeploy-htg-manage-ml-instance-manage-get-server-info]}

Орналастыру сервері `CREATING` мәртебесі `RUNNING` мәртебесіне ауысқаннан кейін жұмысқа дайын болады. Әдетте орналастыру серверін дайындау шамамен бес-он минутты алады.

```python
client.list_endpoints()
```

Орналастыру серверінің күйі туралы ақпаратты оның атауы бойынша алыңыз:

```python
client.get_endpoint(deploy_server_name)
```

### {heading(deployment жасау)[id=mlflowdeploy-htg-manage-ml-instance-manage-create-deployment]}

`deployment` {var(cloud)} MLflow Deploy терминологиясында — орналастыру серверіндегі ML-модельі бар іске қосылған docker-контейнер.

```python
deployment_name="test_deployment"
client.create_deployment(server_name=deploy_server_name, deployment_name=deployment_name, model_uri=model_source_uri, port_out = None)
```

`port_out` параметрін көрсету міндетті емес, `62000`-нан `65000`-ға дейінгі ауқымнан бірінші бос порт таңдалады. ML-модельді іске қосу әдетте бір минуттан аз уақыт алады.

### {heading(deployment тізімі мен күйін алу)[id=mlflowdeploy-htg-manage-ml-instance-manage-get-deployment-info]}

1. Орналастыру серверіндегі іске қосылған ML-модельдердің тізімін шығарыңыз:

   ```python
   client.list_deployments(deploy_server_name)
   ```

1. Орналастыру серверінің атауы және ML-модель атауы бойынша орналастырылған ML-модель туралы ақпарат алыңыз:

   ```python
   client.get_deployment(deploy_server_name, deployment_name)
   ```

1. Docker-контейнердегі ML-модельде `predict` әдісін пайдаланыңыз:

   ```python
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],[0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]]}
   client.predict(deploy_server_name, deployment_name, data)
   ```

### {heading(Публичті DNS арқылы қолжетімді deployment жасау)[id=mlflowdeploy-htg-manage-ml-instance-manage-create-dnsdeployment]}

1. Пайдаланушы атын және құпиясөзді орнатыңыз.

   {note:info}

   {var(cloud)} жеке кабинетінің есептік деректерінен немесе JupyterHub инстансындағы авторизация параметрлерінен өзгеше деректерді пайдалану ұсынылады.

   {/note}

   ```console
   auth_value = "user:PasswordDA@dvv//!123$"
   auth_deployment_name = "test_deploy_auth"
   client.create_deployment(deploy_server_name, auth_deployment_name, model_source_uri, auth=auth_value)
   ```

1. Орналастырылған ML-модель туралы ақпарат алыңыз:

   ```python
   deployment_info = client.get_deployment(deploy_server_name, auth_deployment_name)
   print(deployment_info)
   ```

1. ML-модельге жүгінуге арналған DNS атауын алыңыз:

   ```python
   print(deployment_info['model_ref'])
   ```

1. Авторизация деректері бар сұрауды құрастырыңыз (төменде мысал келтірілген):

   ```python
   import requests
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],[0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]]}
   response = requests.post('https://ml-platform-3bb5b04ebb82c0.ml.msk.vkcs.cloud/deploy/0e84f86c-b9f0-4102-861d-222c41a81452/test_deploy_auth/invocations', json=data, auth=("user", "PasswordDA@dvv//!123$"))
   print(response.text)
   ```

1. Docker-контейнердегі ML-модельде `predict` әдісін пайдаланыңыз:

   ```python
   client.predict(deploy_server_name, auth_deployment_name, data)
   ```

### {heading(deployment жою)[id=mlflowdeploy-htg-manage-ml-instance-manage-delete-deployment]}

Сервер атауы және deployment атауы бойынша жүгініп, орналастыру серверінен `deployment` жойыңыз:

```python
client.delete_deployment(deploy_server_name, deployment_name)
```

### {heading(deployment жою)[id=mlflowdeploy-htg-manage-ml-instance-manage-delete_deploy_server]}

```python
client.delete_endpoint(deploy_server_name)
```

### {heading(Әдістердің қысқаша тізімі)[id=mlflowdeploy-htg-manage-ml-instance-manage-methods]}

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
