Для работы с MLflow создается клиентский сервер, который содержит предустановленные настройки для работы с сервисом.

Инстанс MLflow может функционировать в двух режимах:

- в связке с JupyterHub;
- отдельно, в режиме Standalone.

## {heading(Связка с JupyterHub)[id=with_jh]}

В этом режиме при создании клиентского сервера MLflow для связки выбирается уже созданный сервер JupyterHub. С одним инстансом JupyterHub можно связать только один инстанс MLflow.

Если MLflow работает в связке с инстансом JupyterHub, то [создание пользователей](../../jupyterhub/service-management/) и аутентификация выполняется через JupyterHub.

## {heading(Режим Standalone)[id=standalone]}

MLflow Standalone представляет собой отдельный инстанс с установленным на него MLflow и базовой аутентификацией без привязки к JupyterHub.

Особенности режима Standalone:

- Нет связи между MLflow и JupyterHub.
- Аутентификация пользователей производится на основе встроенного плагина MLflow Authentication, независимо от JupyterHub.
- Ролевая модель на основе аутентификации позволяет для каждого пользователя настроить индивидуальный доступ до каждого конкретного эксперимента и модели.

Этот режим удобно использовать для доступа к сервису через клиентскую библиотеку ML Platform.

В режиме Standalone администратор инстанса добавляется при [создании инстанса](../../mlflow/service-management/create/), для доступа других пользователей используются токены.

## Развертывание модели в режиме Standalone

Клиентская библиотека использует переменные среды MLflow для создания сервера развертывания, а также для развертывания самой модели. Переменные среды содержат в себе `mlflow uri`, `mlflow username`, `mlflow password` для аутентификации.

Процесс развертывания модели:

1. Клиентская библиотека формирует и добавляет в запрос заголовок для `http basic auth`. Имя пользователя и пароль для заголовка берутся из переменных среды, используемых для аутентификации в MLflow.
1. Сервер развертывания отправляет запрос в MLflow и получает модель, которую необходимо развернуть.
1. Модель поднимается в docker-контейнере и настраивается прокси [Traefik](https://traefik.io/traefik/), чтобы открыть доступ модели во внешнюю сеть.

<details>
<summary>Пример кода по работе с сервером развертывания из клиентской библиотеки</summary>

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
