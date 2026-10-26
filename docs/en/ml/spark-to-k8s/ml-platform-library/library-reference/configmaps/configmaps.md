# {heading(Working with ConfigMaps)[id=mlspark-library-reference-configmaps]}

{include(/en/_includes/_translated_by_ai_en.md)}

These methods allow you to work with [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) (configuration maps) of a Kubernetes cluster in the Managed Containers service, which provides the operation of the Cloud Spark cluster. They are used to store configuration data: environment variables, command-line arguments, or configuration files. Using a ConfigMap allows you to separate the configuration of environment-specific data from the application code. This makes it easier to move your Spark applications between code runtime environments.

{note:warn}

The ConfigMap class does not provide secrecy or encryption of the stored data. To work with confidential data, use the {linkto(../secrets#mlspark-library-reference-secrets)[text=methods for working with secrets]} or third-party tools.

{/note}

## {heading(create_configmap_from_yaml)[id=mlspark-library-reference-configmaps-create_configmap_from_yaml]}

Create a ConfigMap in the specified namespace based on the provided manifest. The manifest must be in YAML format.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-configmaps-create_configmap_from_yaml-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|The ID of the Cloud Spark cluster.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`configmap_yaml_path`

(required)
|`str`
|Path to the YAML file with the manifest to be passed to the Cloud Spark cluster

|`namespace`

(optional)
|`str`
|The name of the namespace in which to create the ConfigMap. The namespace must exist, otherwise the ConfigMap will not be created.

If the argument is omitted, the default value is used: `default`
|===

### {heading(Return value)[id=mlspark-library-reference-configmaps-create_configmap_from_yaml-result]}

An object of the `K8sConfigmap` class with information about the created ConfigMap.

[cols="1,1,4", options="header", width=100%]
|===
|Field
|Type
|Description

|`data`
|`dict[str,str]`
|ConfigMap data as `key: value` pairs

|`name`
|`str`
|The name of the ConfigMap

|`namespace`
|`str`
|The name of the namespace in which the ConfigMap is created
|===

### {heading(Method signature, manifest examples, and example of using the method)[id=mlspark-library-reference-configmaps-create_configmap_from_yaml-signature]}

{cut(Method signature)}

```python
create_configmap_from_yaml(cluster_id: str,
                           configmap_yaml_path: str,
                           namespace: str = 'default',
                           **kwargs
                          ) -> mlplatform_client.serializers.spark_proxy.K8sConfigmap
```

{/cut}

{cut(Example of a manifest with application code for a Cloud Spark cluster)}

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: custom-job-py
  namespace: default
data:
  custom_job.py: |
    import sys
    import os

    from random import random
    from operator import add

    from pyspark.sql import SparkSession

    """
        Usage: pi [partitions]
    """
    spark = SparkSession\
        .builder\
        .appName("PythonPi")\
        .getOrCreate()
    spark.sparkContext.setLogLevel('DEBUG')

    partitions = int(sys.argv[1]) if len(sys.argv) > 1 else 2
    n = 100000 * partitions

    def f(_: int) -> float:
        x = random() * 2 - 1
        y = random() * 2 - 1
        return 1 if x ** 2 + y ** 2 <= 1 else 0

    count = spark.sparkContext.parallelize(range(1, n + 1), partitions).map(f).reduce(add)
    print("Pi is roughly %f" % (4.0 * count / n))

    spark.stop()
```

{/cut}

{cut(Example of a manifest with settings for accessing a MongoDB database instance (mongodb_configmap.yaml))}

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: example-configmap
data:

# Configuration values can be set as key-value properties
  database: mongodb
  database_uri: mongodb://localhost:27017

# Or set as complete file contents (even JSON!)
  keys: | 
    image.public.key=771 
    rsa.public.key=42
```

{/cut}

{cut(Example of using the method with the mongodb_configmap.yaml manifest)}

{note:err}

For simplicity, the access token value is specified in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret vaults, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if you have not done so yet.
1. Run the Python script:

```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<access token value>'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap = mlp.create_configmap_from_yaml(
               cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
               configmap_yaml_path='/home/user/mongodb_configmap.yaml',
               namespace='default')
 
   print(configmap)
```

If successful, the following response will be displayed:

```txt
data:
  database: mongodb
  database_uri: mongodb://localhost:27017
  keys: "image.public.key=771 \nrsa.public.key=42"
name: example-configmap
namespace: default      
```

{/cut}

## {heading(list_configmaps)[id=mlspark-library-reference-configmaps-list_configmaps]}

Get a list of names of all ConfigMaps in the specified namespace.

To get detailed information about an individual ConfigMap from the list, use the [get_configmap_detail](#mlspark-library-reference-configmaps-get_configmap_detail) method.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-configmaps-list_configmaps-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|The ID of the Cloud Spark cluster.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|`namespace`

(optional)
|`str`
|The name of the namespace for which to get the list of all ConfigMaps.

If the argument is omitted, the default value is used: `default`
|===

### {heading(Return value)[id=mlspark-library-reference-configmaps-list_configmaps-result]}

An object of the `K8sObjectNamesList[str]` class that contains a list of names of all ConfigMaps in the specified namespace.

### {heading(Method signature and example of use)[id=mlspark-library-reference-configmaps-list_configmaps-signature]}

{cut(Method signature)}

```python
list_configmaps(cluster_id: str,
                namespace: str = 'default',
                **kwargs
               ) -> mlplatform_client.serializers.spark_proxy.K8sObjectNamesList[str]
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret vaults, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if you have not done so yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<access token value>'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap_names = mlp.list_configmaps(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      namespace='default')

   print(configmap_names)
   ```

   If successful, the names of all ConfigMaps in the `default` namespace will be displayed.

{/cut}

## {heading(get_configmap_detail)[id=mlspark-library-reference-configmaps-get_configmap_detail]}

Get information about a ConfigMap with the specified name.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-configmaps-get_configmap_detail-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|The ID of the Cloud Spark cluster.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|`configmap_name`

(required)
|`str`
|The name of the ConfigMap.

The list of names of all ConfigMaps can be obtained using the [list_configmaps](#mlspark-library-reference-configmaps-list_configmaps) method
|`namespace`

(optional)
|`str`
|The name of the namespace in which the ConfigMap is located.

If the argument is omitted, the default value is used: `default`
|===

### {heading(Return value)[id=mlspark-library-reference-configmaps-get_configmap_detail-result]}

An object of the `K8sConfigmap` class with information about the ConfigMap with the specified name.

[cols="1,1,4", options="header", width=100%]
|===
|Field
|Type
|Description

|`data`
|`dict[str,str]`
|ConfigMap data as `key: value` pairs

|`name`
|`str`
|The name of the ConfigMap object

|`namespace`
|`str`
|The name of the namespace in which the ConfigMap is located
|===

### {heading(Method signature and example of use)[id=mlspark-library-reference-configmaps-get_configmap_detail-signature]}

{cut(Method signature)}

```python
get_configmap_detail(cluster_id: str,
                     configmap_name: str,
                     namespace: str = 'default',
                     **kwargs
                    ) -> mlplatform_client.serializers.spark_proxy.K8sConfigmap
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret vaults, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if you have not done so yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap_details = mlp.get_configmap_detail(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      configmap_name='example-configmap',
      namespace='default')

   print(configmap_details)
   ```

   If successful, information about the ConfigMap named `example-configmap` will be displayed.

{/cut}

## {heading(delete_configmap)[id=mlspark-library-reference-configmaps-delete_configmap]}

Delete a ConfigMap with the specified name.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-configmaps-delete_configmap-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|The ID of the Cloud Spark cluster.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method
|`configmap_name`

(required)
|`str`
|The name of the ConfigMap.

The list of names of all ConfigMaps can be obtained using the [list_configmaps](#mlspark-library-reference-configmaps-list_configmaps) method
|`namespace`

(optional)
|`str`
|The name of the namespace in which the ConfigMap is located.

If the argument is omitted, the default value is used: `default`
|===

### {heading(Return value)[id=mlspark-library-reference-configmaps-delete_configmap-result]}

No return value.

### {heading(Method signature and example of use)[id=mlspark-library-reference-configmaps-delete_configmap-signature]}

{cut(Method signature)}

```python
delete_configmap(cluster_id: str,
                 configmap_name: str,
                 namespace: str = 'default',
                 **kwargs)
```

{/cut}

{cut(Example of using the method)}

{note:err}

For simplicity, the access token value is specified in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret vaults, or other tools for working with sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if you have not done so yet.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if you have not done so yet.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.delete_configmap(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      configmap_name='example-configmap',
      namespace='default')
   ```

   The ConfigMap with the specified name will be deleted from the Cloud Spark cluster. This can be verified using the [list_configmaps](#mlspark-library-reference-configmaps-list_configmaps) method.

{/cut}