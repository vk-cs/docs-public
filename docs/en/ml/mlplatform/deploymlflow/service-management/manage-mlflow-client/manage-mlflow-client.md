Manage MLflow Deploy instances using MLflow Deployment Client, a python library from VK Cloud pre-installed in JupyterHub.

## Before you start

1. [Create](../../../jupyterhub/quick-start/create/) a JupyterHub instance.
2. [Create](../../../mlflow/quick-start/create/) an MLflow instance.
3. Reboot the virtual machine with the JupyterHub instance:
    1. Go to **Cloud Servers → Virtual machines**.
    2. In the **ML Platform Instances** subsection, find the JupyterHub you need instance.
    3. Click ![ ](/en/assets/more-icon.svg "inline") for the instance and select **Restart**.

<info>

JupyterHub, MLflow and MLflow Deploy instances must be created on the same network.

</info>

## Preparing the model

1. [Connect](../../../jupyterhub/quick-start/connect/) to the JupyterHub instance.
2. Open the **tutorials** directory.

    JupyterHub from VK Cloud includes training Jupyter notebooks: `mlflow_demo.ipynb` and `mlflow_deploy_demo.ipynb`.

3. Prepare a test model:
    1. Double-click on `mlflow_demo.ipynb`.
    2. In the window that opens, click on the cell with the code example and select **Run → Run Selected Cells** from the menu.
    3. Repeat the operation for all cells with a code.

## Instance management

To go through the entire Jupyter tutorial script:

1. Double-click on `mlflow_deploy_demo.ipynb`.
2. In the window that opens, click on the cell with the code example and select **Run → Run Selected Cells** from the menu.
3. Repeat the operation for all cells with a code.

### Creating MlflowClient

Create an MlflowClient from the MLflow Tracking module to receive the URI of the ML model. The URI will be needed later to deploy the model. The example shows accessing the model by URI.

```python
from mlflow.tracking import MlflowClient
cli = MlflowClient()
```

For this example use the very first model:

```python
model_source_uri = cli.search_registered_models()[0].latest_versions[0].source
print("Model name: ", cli.search_registered_models()[0].latest_versions[0].name)
print("Model URI: ", model_source_uri)
```

Create a Client from the MLflow Deployments module to work in Cloud ML Platform:

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlplatform')
```

### Creating an endpoint

`endpoint` in VK Cloud MLflow Deploy terminology is a virtual machine configured as a deployment server.

```python
deploy_server_name = "deploy_server_one"
client.create_endpoint(name=deploy_server_name)
```
  
`client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)`

The full list of parameters is presented above. You can also create a deployment server by specifying only the server name. In this case, the value of the`av_zone` parameter will be the name of the zone in which the synchronized MLflow service is located.

The `perfomance` parameter in the `create_enpoint` method is responsible for the configuration of the virtual machine. The following values are available:

- `low - standard 4-4` (4 cores, 4 GB RAM)
- `mid - advanced 8-8` (8 cores, 8 GB RAM)
- `high - advanced 16-16` (16 cores, 16 GB RAM)

### Getting a list and status of servers

The deployment server is ready for operation when its status changes from `CREATING` to `RUNNING`. Typically, preparing a deployment server takes about five to ten minutes.

```python
client.list_endpoints()
```

Get information about the status of the deployment server by its name:

```python
client.get_endpoint(deploy_server_name)
```

### Creating a deployment

`deployment` in VK Cloud MLflow Deploy terminology is a Docker container with a model running on the deployment server.

```python
deployment_name="test_deployment"
client.create_deployment(server_name=deploy_server_name, deployment_name=deployment_name, model_uri=model_source_uri, port_out = None)
```

`port_out` can be omitted, the first free port in the range from `62000` to `65000` will be selected. Launching the model usually takes less than a minute.

### Getting the list of running models and the deployment status

1. Display a list of running models on the deployment server:

    ```python
    client.list_deployments(deploy_server_name)
    ```

1. Get information about a deployed model by its name and the name of the deployment server:

    ```python
    client.get_deployment(deploy_server_name, deployment_name)
    ```

1. Use the `predict` method of the model in the Docker container:

   ```python
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],[0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]]}
   client.predict(deploy_server_name, deployment_name, data)
   ```

### Creating a deployment available via public DNS

1. Set a username and password.

    <info>

    It is recommended to set details different from VK Cloud and JupyterHub.

    </info>

    ```bash
    auth_value = "user:PasswordDA@dvv//!123$"
    auth_deployment_name = "test_deploy_auth"
    client.create_deployment(deploy_server_name, auth_deployment_name, model_source_uri, auth=auth_value)
    ```

1. Get information about the deployed model:

    ```python
    deployment_info = client.get_deployment(deploy_server_name, auth_deployment_name)
    print(deployment_info)
    ```

1. Get a DNS name to access the model:

    ```python
    print(deployment_info['model_ref'])
    ```

1. Create a request with authorization data (an example is given below):

    ```python
    import requests
    data = {"inputs":[[0.045341, 0.050680, 0.060618, 0.031065, 0.028702, -0.047347, -0.054446, 0.071210, 0.133597, 0.135612],[0.075341, 0.0 10680, 0.030618, 0.011065, 0.098702, -0.007347, -0.014446, 0.071210 , 0.093597, 0.115612]]}
    response = requests.post('https://ml-platform-3bb5b04ebb82c0.ml.msk.vkcs.cloud/deploy/0e84f86c-b9f0-4102-861d-222c41a81452/test_deploy_auth/invocations', json=data, auth=(" user", "PasswordDA@dvv//!123$"))
    print(response.text)
    ```

1. Use the `predict` method of the model in the Docker container:

    ```python
    client.predict(deploy_server_name, auth_deployment_name, data)
    ```

### Deleting a deployment

Delete the deployment from the server using the names of the server and the deployment:

```python
client.delete_deployment(deploy_server_name, deployment_name)
```

### Deleting a deployment server

```python
client.delete_endpoint(deploy_server_name)
```

### Brief list of methods

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlpatform')

# endpoint — the VM configured as deployment server
client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)
client.list_endpoints()
client.get_endpoint(server_name)

# deployment — the running Docker container with a model on the deployment server
client.create_deployment(server_name, deployment_name, model_uri, port_out = None)

# port_out — can be omitted, the first free port in the range from 62000 to 65000 will be selected
client.list_deployments(server_name)
client.get_deployment(server_name, deployment_name)

# call of the predict method of the model in the Docker container
client.predict(server_name, deployment_name, df_payload)

client.delete_deployment(server_name, deployment_name)
client.delete_endpoint(server_name)
```
