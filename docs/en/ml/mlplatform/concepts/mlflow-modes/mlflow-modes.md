To work with MLflow you have to create a client server, which contains preset settings for working with the service.

The MLflow instance can operate in two modes:

- in connection with JupyterHub
- separately, in Standalone mode

## {heading(Connection with JupyterHub)[id=with_jh]}

In this mode, when creating an MLflow client server, you have to select the already created JupyterHub server for the bundle. Only one MLflow instance can be associated with one JupyterHub instance.

If MLflow works in connection with the JupyterHub instance, [users creating](../../jupyterhub/service-management/) and authentication is performed via JupyterHub.

## {heading(Standalone mode)[id=standalone]}

MLflow Standalone is a separate instance with MLflow installed on it and basic authentication without binding to JupyterHub.

Features of Standalone mode:

- No link between MLflow and JupyterHub.
- User authentication is based on the built-in MLflow Authentication plugin, independent of JupyterHub.
- An authentication-based role model allows for each user to customize individual access to each specific experiment and model.

This mode is useful for accessing the service via the ML Platform client library.

In Standalone mode, the instance administrator is added when [creating an instance](../../mlflow/service-management/create/), use tokens for other users access.

## Deploy the model in Standalone mode

The client library uses MLflow environment variables to create the deployment server as well as to deploy the model itself. Environment variables contain `mlflow uri`, `mlflow username`, `mlflow password` for authentication.

A model deployment process:

1. The client library generates and adds a header for `http basic auth` to the request. The user name and password for the header are taken from the environment variables used for MLflow authentication.
1. The deployment server sends a request to MLflow and receives the model to be deployed.
1. The model is lifted in the docker container and the [Traefik](https://traefik.io/traefik/) proxy is configured to open the model access to the external network.

<details>
<summary> Sample code for working with the deployment server from the client library </summary>

```python
# Add environment variables to work with MLflow Standalone
export MLFLOW_TRACKING_URI=https://mlflow/
export MLFLOW_TRACKING_USERNAME=admin
export MLFLOW_TRACKING_PASSWORD=password
 
 
# Deployment server code
from mlplatform_client import MLPlatform
from mlflow.tracking import MlflowClient
 
 
tracking_cli = MlflowClient()
mlp_client = MLPlatform(refresh_token=os.getenv("REFRESH_TOKEN"))
 
deploy_server_name = "deploy_server"
 
# Each method will automatically add a header to work with MLflow Standalone
# Authorization: Basic username:password
mlp_client.create_endpoint_standalone(name=deploy_server_name)
 
model_source_uri = tracking_cli.search_registered_models()[0].latest_versions[0].source
 
auth_value = "user:Password123!"
auth_deployment_name = "test_deploy_auth"
mlp_client.create_deployment_standalone(deploy_server_name, auth_deployment_name, model_source_uri, auth=auth_value)
```
