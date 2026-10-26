# {heading(Working with Cloud Spark clusters)[id=mlspark-library-reference-clusters]}

{include(/en/_includes/_translated_by_ai_en.md)}

These methods allow you to manage the Cloud Spark clusters available in the project.

## {heading(get_clusters)[id=mlspark-library-reference-clusters-get_clusters]}

Get a list of all available Cloud Spark clusters.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-clusters-get_clusters-arguments]}

No arguments.

### {heading(Return value)[id=mlspark-library-reference-clusters-get_clusters-result]}

A list of `K8sClusterInfo` class objects with information about the available Cloud Spark clusters.

{include(/en/_includes/_spark_methods_return_value.md)}

### {heading(Method signature and usage example)[id=mlspark-library-reference-clusters-get_clusters-sinature]}

{cut(Method signature)}

```python
get_clusters(**kwargs
            ) -> List[mlplatform_client.serializers.spark_proxy.K8sClusterInfo]

```

{/cut}

{cut(Example of method usage)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not done yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if not done yet.
1. Run the Python script:

   ```python
      from mlplatform_client import MLPlatform

      REFRESH_TOKEN = '<access token value>'

      mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
      clusters = mlp.get_clusters()

      print(clusters)
   ```

{/cut}

## {heading(get_cluster_info)[id=mlspark-library-reference-clusters-get_cluster_info]}

Get detailed information about a Cloud Spark cluster by its identifier.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-clusters-get_cluster_info-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster identifier

The list of Cloud Spark clusters and their identifiers can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|===

### {heading(Return value)[id=mlspark-library-reference-clusters-get_cluster_info-result]}

A `K8sClusterInfo` class object with information about the cluster.

{include(/en/_includes/_spark_methods_return_value.md)}

### {heading(Method signature and usage example)[id=mlspark-library-reference-clusters-get_cluster_info-signature]}

{cut(Method signature)}

```python
get_cluster_info(cluster_id: str,
                 **kwargs
                ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```

{/cut}

{cut(Example of method usage)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not done yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if not done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster_info = mlp.get_cluster_info(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')

   print(cluster_info)
   ```

   If successful, the cluster information will be printed.

{/cut}

## {heading(set_cluster_delete_time)[id=mlspark-library-reference-clusters-set_cluster_delete_time]}

Set the cluster idle time after which the cluster will be automatically deleted.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-clusters-set_cluster_delete_time-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster identifier.

The list of Cloud Spark clusters and their identifiers can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`minutes`

(required)
|`int`
|Maximum cluster idle time in minutes
|===

### {heading(Return value)[id=mlspark-library-reference-clusters-set_cluster_delete_time-result]}

A `K8sClusterInfo` class object. If successful, the `delete_after_inactive_min` field of the object will contain the specified maximum cluster idle time.

{include(/en/_includes/_spark_methods_return_value.md)}

### {heading(Method signature and usage example)[id=mlspark-library-reference-clusters-set_cluster_delete_time-signature]}

{cut(Method signature)}

```python
set_cluster_delete_time(cluster_id: str,
                        minutes: int,
                        **kwargs
                       ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```
{/cut}

{cut(Example of method usage)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not done yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster = mlp.set_cluster_delete_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      minutes=1440)

   print(cluster.delete_after_inactive_min)
   ```
   If successful, the number `1440` will be printed.

{/cut}

## {heading(remove_cluster_delete_time)[id=mlspark-library-reference-clusters-remove_cluster_delete_time]}

Remove the maximum cluster idle time after which the cluster will be automatically deleted.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster identifier.

The list of Cloud Spark clusters and their identifiers can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|===

### {heading(Return value)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-result]}

A `K8sClusterInfo` class object. If successful, the `delete_after_inactive_min` field of the object will contain the value `None`.

{include(/en/_includes/_spark_methods_return_value.md)}

### {heading(Method signature and usage example)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-signature]}

{cut(Method signature)}

```python
remove_cluster_delete_time(cluster_id: str,
                           **kwargs
                          ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```
{/cut}

{cut(Example of method usage)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not done yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster = mlp.remove_cluster_delete_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   
   print(cluster.delete_after_inactive_min)
   ```

   If successful, the value `None` will be printed.

{/cut}

## {heading(set_cluster_suspend_time)[id=mlspark-library-reference-clusters-set_cluster_suspend_time]}

Set the cluster idle time after which the cluster will be automatically stopped.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster identifier.

The list of Cloud Spark clusters and their identifiers can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`minutes`

(required)
|`int`
|Maximum cluster idle time in minutes
|===

### {heading(Return value)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-result]}

A `K8sClusterInfo` class object. If successful, the `suspend_after_inactive_min` field of the object will contain the specified maximum cluster idle time.

{include(/en/_includes/_spark_methods_return_value.md)}

### {heading(Method signature and usage example)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-signature]}

{cut(Method signature)}

```python
set_cluster_suspend_time(cluster_id: str,
                         minutes: int,
                         **kwargs
                        ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```
{/cut}

{cut(Example of method usage)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not done yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster = mlp.set_cluster_suspend_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      minutes=120)
   
   print(cluster.suspend_after_inactive_min)
   ```

   If successful, the number `120` will be printed.

{/cut}

## {heading(remove_cluster_suspend_time)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time]}

Remove the maximum cluster idle time after which the cluster will be automatically stopped.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster identifier.

The list of Cloud Spark clusters and their identifiers can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|===

### {heading(Return value)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-result]}

A `K8sClusterInfo` class object. If successful, the `suspend_after_inactive_min` field of the object will contain the value `None`.

{include(/en/_includes/_spark_methods_return_value.md)}

### {heading(Method signature and usage example)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-signature]}

{cut(Method signature)}

```python
remove_cluster_suspend_time(cluster_id: str,
                            **kwargs
                           ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```

{/cut}

{cut(Example of method usage)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not done yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster = mlp.remove_cluster_suspend_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   
   print(cluster.suspend_after_inactive_min)
   ```

   If successful, the value `None` will be printed.

{/cut}

## {heading(stop)[id=mlspark-library-reference-clusters-stop]}

Terminate all current connections to the cluster.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

{note:info}

The cluster is not stopped when this method is executed.

{/note}

### {heading(Method arguments)[id=mlspark-library-reference-clusters-stop-arguments]}

No arguments.

### {heading(Return value)[id=mlspark-library-reference-clusters-stop-result]}

No return value.

### {heading(Method signature and usage example)[id=mlspark-library-reference-clusters-stop-signature]}

{cut(Method signature)}

```python
stop() 
```
{/cut}

{cut(Example of method usage)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not done yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.stop()
   ```

{/cut}

## {heading(wake_up_cluster)[id=mlspark-library-reference-clusters-wake_up_cluster]}

Activate the cluster.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

{note:warn}

Only a stopped cluster can be activated.

{/note}

### {heading(Method arguments)[id=mlspark-library-reference-clusters-wake_up_cluster-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|Cloud Spark cluster identifier.

The list of Cloud Spark clusters and their identifiers can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|===

### {heading(Return value)[id=mlspark-library-reference-clusters-wake_up_cluster-result]}

No return value.

### {heading(Method signature and usage example)[id=mlspark-library-reference-clusters-wake_up_cluster-signature]}

{cut(Method signature)}

```python
wake_up_cluster(cluster_id: str,
                **kwargs
               )
```

{/cut}

{cut(Example of method usage)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret storage, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not done yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not done yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.wake_up_cluster(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   ```

   The cluster will start launching.

{/cut}