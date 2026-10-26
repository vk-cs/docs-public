# {heading(Deploying ML models with MLflow Client)[id=mlflowdeploy-htg-manage-ml]}

{include(/en/_includes/_translated_by_ai_en.md)}

Manage MLflow Deploy instances using the MLflow Deployment Client — a Python library preinstalled in JupyterHub from {var(cloud)}.

## {heading(Before you start)[id=mlflowdeploy-htg-manage-ml-before-work]}

1. [Create](../../../jupyterhub/instructions/create) a JupyterHub instance.
2. [Create](../../../mlflow/instructions/create) an MLflow instance.
3. Reboot the virtual machine with JupyterHub:
   1. Go to the **Cloud Computing → Virtual Machines** section.
   1. In the **ML Platform Instances** subsection, click ![ ](/ru/assets/more-icon.svg "inline") for the desired JupyterHub instance and select **Reboot**.

{note:info}

JupyterHub, MLflow, and MLflow Deploy instances must be created in the same network.

{/note}

## {heading(Preparing an ML model)[id=mlflowdeploy-htg-manage-ml-prepare-mlmodel]}

1. [Connect](../../../jupyterhub/instructions/connect) to the JupyterHub instance.
2. Go to the **tutorials** directory.

   JupyterHub from {var(cloud)} includes training Jupyter notebooks: `mlflow_demo.ipynb` and `mlflow_deploy_demo.ipynb`.

3. Prepare a test ML model:
   1. Double-click on `mlflow_demo.ipynb`.
   2. In the window that opens, click on the cell with the example code and select **Run → Run Selected Cells** from the menu.
   3. Repeat the operation for all cells with code.

## {heading(Managing an instance)[id=mlflowdeploy-htg-manage-ml-instance-manage]}

To complete the entire scenario of the training Jupyter notebook:

1. Double-click on `mlflow_deploy_demo.ipynb`.
2. In the window that opens, click on the cell with the example code and select **Run → Run Selected Cells** from the menu.
3. Repeat the operation for all cells with code.

Let us take a closer look at the operations performed with the deployment of the server and the Docker container.

### {heading(Creating MlflowClient)[id=mlflowdeploy-htg-manage-ml-instance-manage-create-client]}

Create an MlflowClient from the MLflow Tracking module to obtain the ML model URI. The URI will be needed later for deploying the ML model. The example shows accessing an ML model by URI.

```python
from mlflow.tracking import MlflowClient
cli = MlflowClient()
```

For the example, use the very first ML model:

```python
model_source_uri = cli.search_registered_models()[0].latest_versions[0].source
print("ML model name: ", cli.search_registered_models()[0].latest_versions[0].name)
print("ML model URI: ", model_source_uri)
```

Create a Client from the MLflow Deployments module to work in Cloud ML Platform:

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlplatform')
```

### {heading(Creating an endpoint)[id=mlflowdeploy-htg-manage-ml-instance-manage-create-endpoint]}

`endpoint` in the terminology of {var(cloud)} MLflow Deploy is a VM configured as a deployment server.

```python
deploy_server_name = "deploy_server_one"
client.create_endpoint(name=deploy_server_name)
```
  
`client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)`

The full list of parameters is listed above. A deployment server can also be created specifying only the server name. In this case, the value of the `av_zone` parameter will be set to the zone where the associated MLflow service is located.

The `perfomance` parameter in the `create_enpoint` method is responsible for the virtual machine configuration. The following values are available:

- `low — standard 4-4` (4 cores, 4 GB of RAM);
- `mid — advanced 8-8` (8 cores, 8 GB of RAM);
- `high — advanced 16-16` (16 cores, 16 GB of RAM).

### {heading(Getting the list and status of servers)[id=mlflowdeploy-htg-manage-ml-instance-manage-get-server-info]}

The deployment server is ready for operation after its status changes from `CREATING` to `RUNNING`. Typically, preparing a deployment server takes about five to ten minutes.

```python
client.list_endpoints()
```

Get information about the deployment server status by its name:

```python
client.get_endpoint(deploy_server_name)
```

### {heading(Creating a deployment)[id=mlflowdeploy-htg-manage-ml-instance-manage-create-deployment]}

`deployment` in the terminology of {var(cloud)} MLflow Deploy is a running Docker container with an ML model on the deployment server.

```python
deployment_name="test_deployment"
client.create_deployment(server_name=deploy_server_name, deployment_name=deployment_name, model_uri=model_source_uri, port_out = None)
```

`port_out` can be omitted; the first free port in the range from `62000` to `65000` will be selected. Starting an ML model usually takes less than a minute.

### {heading(Getting the list and status of deployments)[id=mlflowdeploy-htg-manage-ml-instance-manage-get-deployment-info]}

1. List the running ML models on the deployment server:

   ```python
   client.list_deployments(deploy_server_name)
   ```

1. Get information about the deployed ML model by the deployment server name and the ML model name:

   ```python
   client.get_deployment(deploy_server_name, deployment_name)
   ```

1. Use the `predict` method of the ML model in the Docker container:

   ```python
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],[0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]]}
   client.predict(deploy_server_name, deployment_name, data)
   ```

### {heading(Creating a deployment accessible via public DNS)[id=mlflowdeploy-htg-manage-ml-instance-manage-create-dnsdeployment]}

1. Set the username and password.

   {note:info}

   It is recommended to use credentials different from the management console credentials of {var(cloud)} or the authorization parameters of the JupyterHub instance.

   {/note}

   ```console
   auth_value = "user:PasswordDA@dvv//!123$"
   auth_deployment_name = "test_deploy_auth"
   client.create_deployment(deploy_server_name, auth_deployment_name, model_source_uri, auth=auth_value)
   ```

1. Get information about the deployed ML model:

   ```python
   deployment_info = client.get_deployment(deploy_server_name, auth_deployment_name)
   print(deployment_info)
   ```

1. Get the DNS name for accessing the ML model:

   ```python
   print(deployment_info['model_ref'])
   ```

1. Create a request with authorization data (an example is given below):

   ```python
   import requests
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],[0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]]}
   response = requests.post('https://ml-platform-3bb5b04ebb82c0.ml.msk.vkcs.cloud/deploy/0e84f86c-b9f0-4102-861d-222c41a81452/test_deploy_auth/invocations', json=data, auth=("user", "PasswordDA@dvv//!123$"))
   print(response.text)
   ```

1. Use the `predict` method of the ML model in the Docker container:

   ```python
   client.predict(deploy_server_name, auth_deployment_name, data)
   ```

### {heading(Deleting a deployment)[id=mlflowdeploy-htg-manage-ml-instance-manage-delete-deployment]}

Delete the deployment from the deployment server by referencing the server name and the deployment:

```python
client.delete_deployment(deploy_server_name, deployment_name)
```

### {heading(Deleting a deployment)[id=mlflowdeploy-htg-manage-ml-instance-manage-delete_deploy_server]}

```python
client.delete_endpoint(deploy_server_name)
```

### {heading(Brief list of methods)[id=mlflowdeploy-htg-manage-ml-instance-manage-methods]}

```python
from mlflow.deployments import get_deploy_client
client = get_deploy_client('vk-cloud-mlpatform')

# endpoint is a VM configured as a deployment server
client.create_endpoint(name, performance="low", disk_size=50, disk_type="ceph-ssd", av_zone=None)
client.list_endpoints()
client.get_endpoint(server_name)

# deployment is a running Docker container with an ML model on the deployment server
client.create_deployment(server_name, deployment_name, model_uri, port_out = None)

# port_out can be omitted; the first free port in the range from 62000 to 65000 will be selected
client.list_deployments(server_name)
client.get_deployment(server_name, deployment_name)

# calling the predict method of the ML model in the Docker container
client.predict(server_name, deployment_name, df_payload)

client.delete_deployment(server_name, deployment_name)
client.delete_endpoint(server_name)
```