{include(/kz/_includes/_translated_by_ai.md)}

MLflow-пен жұмыс істеу үшін сервисте жұмыс істеуге арналған алдын ала орнатылған баптаулары бар клиенттік сервер құрылады.

MLflow инстансы екі режимде жұмыс істей алады:

- JupyterHub-пен бірге;
- бөлек, Standalone режимінде.

## {heading(JupyterHub-пен байланыс)[id=with_jh]}

Бұл режимде MLflow клиенттік серверін байланыс үшін жасау кезінде бұрыннан жасалған JupyterHub сервері таңдалады. Бір JupyterHub инстансымен тек бір MLflow инстансын байланыстыруға болады.

Егер MLflow JupyterHub инстансымен байланыста жұмыс істесе, онда [пайдаланушыларды жасау](../../jupyterhub/instructions) және аутентификация JupyterHub арқылы орындалады.

## {heading(Standalone режимі)[id=standalone]}

MLflow Standalone — JupyterHub-қа байланыстырылмаған, оған MLflow орнатылған және базалық аутентификациясы бар жеке инстанс.

Standalone режимінің ерекшеліктері:

- MLflow пен JupyterHub арасында байланыс жоқ.
- Пайдаланушылардың аутентификациясы JupyterHub-тан тәуелсіз, кірістірілген MLflow Authentication плагині негізінде орындалады.
- Аутентификацияға негізделген рөлдік модель әрбір пайдаланушы үшін әрбір нақты эксперимент пен модельге жеке қолжетімділікті баптауға мүмкіндік береді.

Бұл режимді сервиске ML Platform клиенттік кітапханасы арқылы қол жеткізу үшін пайдалану ыңғайлы.

Standalone режимінде инстанс әкімшісі [инстансты жасау](../../mlflow/instructions/create) кезінде қосылады, басқа пайдаланушыларға қол жеткізу үшін токендер пайдаланылады.

## Standalone режимінде модельді орналастыру

Клиенттік кітапхана орналастыру серверін жасау үшін, сондай-ақ модельдің өзін орналастыру үшін MLflow орта айнымалыларын пайдаланады. Орта айнымалыларында аутентификацияға арналған `mlflow uri`, `mlflow username`, `mlflow password` бар.

Модельді орналастыру процесі:

1. Клиенттік кітапхана `http basic auth` үшін тақырыпты қалыптастырады және сұрауға қосады. Тақырып үшін пайдаланушы аты мен құпиясөз MLflow-та аутентификация үшін қолданылатын орта айнымалыларынан алынады.
1. Орналастыру сервері MLflow-қа сұрау жібереді және орналастыру қажет модельді алады.
1. Модель docker-контейнерде іске қосылады және модельге сыртқы желіден қолжетімділікті ашу үшін [Traefik](https://traefik.io/traefik) проксиі бапталады.

{cut(Клиенттік кітапханадан орналастыру серверімен жұмыс істеу кодының мысалы)}

```python
# Добавляются переменные среды для работы с MLflow Standalone
export MLFLOW_TRACKING_URI=https://mlflow/
export MLFLOW_TRACKING_USERNAME=admin
export MLFLOW_TRACKING_PASSWORD=password
 
 
# Код работы с сервером развертывания
from mlplatform_client import MLPlatform
from mlflow.tracking import MlflowClient
 
 
tracking_cli = MlflowClient()
mlp_client = MLPlatform(refresh_token=os.getenv("REFRESH_TOKEN"))
 
deploy_server_name = "deploy_server_q2"
 
# При выполнении каждого метода для работы с MLflow Standalone будет автоматически добавляться заголовок
# Authorization: Basic username:password
mlp_client.create_endpoint_standalone(name=deploy_server_name)
 
model_source_uri = tracking_cli.search_registered_models()[0].latest_versions[0].source
 
auth_value = "user:Password123!"
auth_deployment_name = "test_deploy_auth"
mlp_client.create_deployment_standalone(deploy_server_name, auth_deployment_name, model_source_uri, auth=auth_value)
```
