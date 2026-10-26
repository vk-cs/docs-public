# {heading(Working with secrets)[id=mlspark-library-reference-secrets]}

{include(/en/_includes/_translated_by_ai_en.md)}

These methods allow you to work with Kubernetes cluster secrets in the Managed Containers service, which hosts the Cloud Spark cluster. [Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/) enable secure storage and use of sensitive data that may be needed during Spark job execution.

## {heading(create_secret_from_yaml)[id=mlspark-library-reference-secrets-create_secret_from_yaml]}

Create a secret in the specified namespace based on the provided manifest. The manifest must be in YAML format.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-secrets-create_secret_from_yaml-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|ID of the Cloud Spark cluster in which to create the secret. The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`secret_yaml_path`

(required)
|`str`
|Path to the YAML file with the manifest

|`namespace`

(optional)
|`str`
|Name of the namespace in which to create the secret. This namespace must exist, otherwise the secret will not be created.

If this argument is omitted when calling the method, the default value is used: `default`
|===

### {heading(Return value)[id=mlspark-library-reference-secrets-create_secret_from_yaml-result]}

An object of the `K8sSecret` class with information about the created secret.

[cols="1,1,4", options="header", width=100%]
|===
|Field
|Type
|Description

|`name`
|`str`
|Name of the secret

|`type`
|`str`
|Type of the secret

|`namespace`
|`str`
|Name of the namespace in which the secret is located

|`data`
|`dict[str,str]`
|Secret data as `key: value` pairs. For security reasons, the data is not displayed in plain text
|===

### {heading(Method signature and usage example)[id=mlspark-library-reference-secrets-create_secret_from_yaml-signature]}

{cut(Method signature)}

```python
create_secret_from_yaml(cluster_id: str,
                        secret_yaml_path: str,
                        namespace: str = 'default',
                        **kwargs
                       ) -> mlplatform_client.serializers.spark_proxy.K8sSecret
```
{/cut}

{cut(Usage example)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   secret = mlp.create_secret_from_yaml(
               cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
               secret_yaml_path='/home/user/sample-secret.yaml',
               namespace='default')
   
   print(secret)
   ```

{/cut}

## {heading(list_secrets)[id=mlspark-library-reference-secrets-list_secrets]}

Get the list of secret names in the specified namespace.

To get detailed information about an individual secret from the list, use the [get_secret_detail](#mlspark-library-reference-secrets-get_secret_detail) method.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-secrets-list_secrets-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(optional)
|`str`
|ID of the Cloud Spark cluster for which to get the list of secrets.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`namespace`

(optional)
|`str`
|Name of the namespace from which to get the list of secrets.

If this argument is omitted when calling the method, the default value is used: `default`
|===

### {heading(Return value)[id=mlspark-library-reference-secrets-list_secrets-result]}

An object of the `K8sObjectNamesList` class that contains the list of secret names.

### {heading(Method signature and usage example)[id=mlspark-library-reference-secrets-list_secrets-signature]}

{cut(Method signature)}

```python
list_secrets(cluster_id: str,
             namespace: str = 'default',
             **kwargs
            ) -> mlplatform_client.serializers.spark_proxy.K8sObjectNamesList[str]
```

{/cut}

{cut(Usage example)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   secrets = mlp.list_secrets(
                cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
                namespace='default')

   print(secrets)
   ```

   If successful, the list of secrets in the `default` namespace will be displayed.

{/cut}

## {heading(get_secret_detail)[id=mlspark-library-reference-secrets-get_secret_detail]}

Get detailed information about a [Kubernetes secret](https://kubernetes.io/docs/concepts/configuration/secret/) by its name.

Required token role: `Administrator` or `User`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-secrets-get_secret_detail-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|ID of the Cloud Spark cluster for which to get information about the secret.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`secret_name`

(required)
|`str`
|Name of the secret to get information about.

The list of secret names can be obtained using the [list_secrets](#mlspark-library-reference-secrets-list_secrets) method

|`namespace`

(optional)
|`str`
|Name of the namespace in which the secret is located.

If this argument is omitted when calling the method, the default value is used: `default`
|===

### {heading(Return value)[id=mlspark-library-reference-secrets-get_secret_detail-result]}

An object of the `K8sSecret` class with information about the secret.

[cols="1,1,4", options="header", width=100%]
|===
|Field
|Type
|Description

|`name`
|`str`
|Name of the secret

|`type`
|`str`
|Type of the secret

|`namespace`
|`str`
|Name of the namespace in which the secret is located

|`data`
|`dict[str,str]`
|Secret data as `key: value` pairs.

For security reasons, the data is not displayed in plain text
|===

### {heading(Method signature and usage example)[id=mlspark-library-reference-secrets-get_secret_detail-signature]}

{cut(Method signature)}

```python
get_secret_detail(cluster_id: str,
                  secret_name: str,
                  namespace: str = 'default',
                  **kwargs
                 ) -> mlplatform_client.serializers.spark_proxy.K8sSecret
```

{/cut}

{cut(Usage example)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` or `User` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   secret_details = mlp.get_secret_detail(
                        cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
                        secret_name='sample-secret',
                        namespace='default')

   print(secret_details)
   ```

   If successful, information about the `sample-secret` secret will be displayed.

{/cut}

## {heading(delete_secret)[id=mlspark-library-reference-secrets-delete_secret]}

Delete a secret by its name.

Required token role: `Administrator`. {linkto(../../authz#mlspark-library-authz)[text=Learn more about token roles]}.

### {heading(Method arguments)[id=mlspark-library-reference-secrets-delete_secret-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`cluster_id`

(required)
|`str`
|ID of the Cloud Spark cluster for which to get information about the secret.

The list of Cloud Spark clusters and their IDs can be obtained using the [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) method

|`secret_name`

(required)
|`str`
|Name of the secret to delete.

The list of secret names can be obtained using the [list_secrets](#mlspark-library-reference-secrets-list_secrets) method

|`namespace`

(optional)
|`str`
|Name of the namespace in which the secret is located.

If this argument is omitted when calling the method, the default value is used: `default`
|===

### {heading(Return value)[id=mlspark-library-reference-secrets-delete_secret-result]}

No return value.

### {heading(Method signature and usage example)[id=mlspark-library-reference-secrets-delete_secret-signature]}

{cut(Method signature)}

```python
delete_secret(cluster_id: str,
              secret_name: str,
              namespace: str = 'default',
              **kwargs)
```

{/cut}

{cut(Usage example)}

{note:err}

For simplicity, the access token value is specified directly in the Python script example.

When working in a production environment, do not handle tokens in plain text. Use environment variables, secret stores, or other tools for handling sensitive data. {linkto(../../authz#mlspark-library-authz)[text=Learn more about tokens]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Install the library]}, if not already done.
1. {linkto(../../authz#mlspark-library-authz)[text=Create an access token]} with the `Administrator` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<access token value>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.delete_secret(
        cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        secret_name='sample-secret',
        namespace='default')
   ```

   The secret will be deleted from the Cloud Spark cluster. This can be verified using the [list_secrets](#mlspark-library-reference-secrets-list_secrets) method.

{/cut}