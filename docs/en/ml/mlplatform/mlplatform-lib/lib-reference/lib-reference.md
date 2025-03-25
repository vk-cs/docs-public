These methods allow you to perform the following operations:

- Obtain the information needed to create JupyterHub, MLflow, and MLflow Deploy instances.
- Create and manage JupyterHub, MLflow, and MLflow Deploy instances.
- Deploy ML models on MLflow Deploy instances and verify that they work.
- Get ML model predictions.

## get_flavors

Get a list of all [VM configuration templates](/en/computing/iaas/concepts/about#flavors) available for creating JupyterHub, MLflow, MLflow Deploy instances.

Required token role: `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

No arguments.

### Return value

A list of available VM configuration templates. Each item in the list contains the following information:

- template ID
- template name
- RAM size
- number of CPU cores
- additional specifications

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
get_flavors(**kwargs
           ) -> List[mlplatform_client.serializers.nova.NovaFlavor]
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get and display a list of all configuration templates
   flavors = mlp.get_flavors()
   print(flavors)
   ```

    If successful, it will output information about all configuration templates available for creating JupyterHub, MLflow, MLflow Deploy instances. Example of part of the output:

   ```txt
    [
    ---------------
    Flavor Info:
    ---------------
    id: 00bbf595-XXXX
    name: STD2-16-32
    ram: 32768
    vcpus: 16
    extra_specs: 
        cpu_sockets: 2
        cpu_type: standard
        agg_gpu: None
        filter_gpu: None
        availability_zone: None
        gpu_info: , 
    ---------------
    Flavor Info:
    ---------------
    id: 04db9642-XXXX
    name: STD2-6-24
    ram: 24576
    vcpus: 6
    extra_specs: 
        cpu_sockets: 1
        cpu_type: standard
        agg_gpu: None
        filter_gpu: None
        availability_zone: None
        gpu_info: , 
    # end of fragment
   ```

</details>

## get_internal_networks

Get a list of all [standard networks](/en/networks/vnet/concepts/net-types#standard_network) available in the project.

Required token role: `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

No arguments.

### Return value

List of standard networks of the project. Each item in the list contains the ID, name, [SDN](/ru/networks/vnet/concepts/sdn "change-lang") and other network parameters.

### Method signature and usage example

<details>
<summary>Method signature</summary>

```python
get_internal_networks(**kwargs
                     ) -> List[mlplatform_client.serializers.gateway.NetworkOut]
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get and display a list of all configuration templates
   networks = mlp.get_internal_networks()
   print(networks)
   ```

   If successful, information about all available standard networks will be output. Example of part of the output:

   ```txt
    [
    ---------------
    Network Info:
    ---------------
    id: 1996dbe9-XXXX
    name: first_net
    admin_state_up: True
    created_at: 2024-05-18 14:57:35+00:00
    updated_at: 2024-06-18 12:58:47+00:00
    sdn: neutron
    external: False, 
    ---------------
    Network Info:
    ---------------
    id: 2a443a80-XXXX
    name: second_net
    admin_state_up: True
    created_at: 2023-12-11 06:59:00+00:00
    updated_at: 2023-12-11 12:32:24+00:00
    sdn: neutron
    external: False, 
    # end of fragment
   ```

</details>

## get_external_networks

Get a list of all [external networks](/en/networks/vnet/concepts/net-types#external_network) available in the project.

Required token role: `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

No arguments.

### Return value

A list of the project's external networks. Each list item contains ID, name, [SDN](/ru/networks/vnet/concepts/sdn "change-lang"), and other network parameters.

### Method signature and usage example

<details>
<summary>Method signature</summary>

```python
get_external_networks(**kwargs
                     ) -> List[mlplatform_client.serializers.gateway.NetworkOut]
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get and display a list of all external networks
   ext_networks = mlp.get_external_networks()
   print(ext_networks)
   ```

   If successful, information about all available external networks will be output. Example output:

   ```txt
    [
    ---------------
    Network Info:
    ---------------
    id: 298117ae-XXXX
    name: ext-net
    admin_state_up: True
    created_at: 2017-03-27 13:50:05+00:00
    updated_at: 2024-03-29 13:25:58+00:00
    sdn: neutron
    external: True]
   ```

</details>

## create_jupyter_hub

Create a JupyterHub instance.

<info>

As part of the Cloud ML Platform, the JupyterHub instance is used to develop and learn ML models.

</info>

Required token role: `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`instance_name`

(mandatory)
|`str`
|JupyterHub instance name

|`domain_name`

(optional)
|`str`
|Domain name of the instance. If not specified, will be created automatically.

Domain name requirements:

- 63 characters maximum length.
- Can contain only digits, lowercase Latin letters and special characters  `.`, `-`.
- Cannot begin and end with the `-` special character

|`jh_admin_name`

(mandatory)
|`str`
|Instance administrator login

|`jh_admin_password`

(mandatory)
|`str`
|The password of the instance administrator.

Password requirements:

- Must be at least 8 characters long.
- It can contain only digits, special characters `!`,`#`,`$`,`%`,`&`,`(`,`)`,`*`,`+`,`,`,`.`,`:`,`;`,`<`,`=`,`>`,`?`,`@`,`[`,`]`,`^`,`_`,`{`,<code>&#124;</code>,`}`,`~`,`-`, uppercase and lowercase Latin letters

|`flavor`

(mandatory)
|`str`
|The identifier of the configuration template to create the VM instance.

The list of configuration templates and their identifiers can be obtained using the [get_flavors](#get_flavors) method

|`volumes`

(mandatory)
|`List[MLPlatformVolumeIn]`
|A list of the instance's disks.

Each disk is described by an object of the `MLPlatformVolumeIn` class with fields:

- `size`: the volume of the disk in GB (type `int`).
- `volume_type`: [disс type](en/computing/iaas/concepts/about#disks_types_b7c586e). Valid values are `VolumeType.ceph_ssd` and `VolumeType.high_iops`.
- `availability_zone`: [availability zone](/en/intro/start/concepts/architecture#az). Valid values are `AvailabilityZone.GZ1` and `AvailabilityZone.MS1`.

<warn>

JupyterHub instances with only one drive are supported.

</warn>

Example of a disk description:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(mandatory)
|`MLPlatformNetworkIn`
|The network to which the instance will be connected.

A network is described by an object of the `MLPlatformVolumeIn` class with the `network_id` field containing the network identifier. The lists of standard and external networks of the project and their identifiers can be obtained using the methods of the [get_internal_networks](#get_internal_networks) and [get_external_networks](#get_external_networks) methods.

Example of network description:

```python
MLPlatformNetworkIn(network_id="net-12345")
```

|`s3fs_bucket`

(optional)
|`str`
|The name of the bucket that will be connected to the instance.

If a nonexistent name is specified, a new bucket with the specified name will be created.

Requirements for the new bucket name:

- Must be unique for the Cloud Storage service as a whole (not only within the project).
- Must contain from 4 to 63 characters.
- Man contain only numbers, lowercase Latin letters and special characters `.`, `-`.
- Must begin and end with lowercase Latin letters or numbers only
|===

### Return value

An object of class `VmDetailInfo` with information about the created JupyterHub instance.

### Method signature and usage example

<details>
<summary>Method signature</summary>

```python
create_jupiter_hub(instance_name: str,
                   domain_name: Optional[str] = None,
                   jh_admin_name: str,
                   jh_admin_password: str,
                   flavor: str, 
                   volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn],
                   networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn,
                   s3fs_bucket: Optional[str] = None,
                   **kwargs
                  ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get the ID of one of the configuration templates in the list of available templates
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Get the ID of one of the standard networks in the list of available networks
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Create a JupyterHub instance
   jh = mlp.create_jupyter_hub(
       instance_name="jh-test",
       jh_admin_name="admin",
       jh_admin_password="Admin123@",
       flavor=FLAVOR_ID,
       s3fs_bucket=<BUCKET_NAME>,  # Optional
       volumes=[MLPlatformVolumeIn(
           size=50,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       )
    )
    print(jh)

   ```

   If successful, information about the JupyterHub instance being created will be output. Example output:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-XXXX
    name: jh-test
    status: CREATING
    flavor_id: 00bbf595-XXXX
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: None
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]
   ```

   Immediately after calling the `create_jupyter_hub` method, the instance is in the process of creation, so some parameters are not defined, for example: domain name and IP address.

</details>

## attach_s3_bucket_to_jh

Connect the bucket to the JupyterHub instance.

<info>

Only one bucket can be connected to one instance.

</info>

Required role of the token: `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`jh_id`

(mandatory)
|`str`
|JupyterHub instance identifier.

A list of all Cloud ML Platform instances and their identifiers can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`s3fs_bucket`

(mandatory)
|`str`
|The name of the bucket that will be connected to the instance.

If a nonexistent name is specified, a new bucket with the specified name will be created.

Requirements for the new bucket name:

- Must be unique for the Cloud Storage service as a whole (not only within the project).
- Must contain from 4 to 63 characters.
- Can contain only numbers, lowercase Latin letters and special characters `.`, `-`.
- Must begin and end with lowercase Latin letters or numbers only
|===

### Return value

There is no return value.

### Method signature and usage example

<details>
<summary>Method signature</summary>

```python
attach_s3_bucket_to_jh(
                       jh_id: str,
                       s3fs_bucket: str,
                       **kwargs
                      ) -> None
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Connect the bucket
   mlp.attach_s3_bucket_to_jh(jh_id=<JupyterHub_INSTANCE_ID>,
                              s3fs_bucket="jh-bucket-1234")
   ```

   The connected bucket will be available on the JupyterHub instance with the specified id as the `/shared/s3fs` folder .

</details>

## create_mlflow

Create an MLflow instance connected to an existing JupyterHub instance.

<info>

Within Cloud ML Platform, the MLflow instance is used to store ML models and their parameters.

</info>

Required role of the token: `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`instance_name`

(mandatory)
|`str`
|MLflow Instance name

|`jh_id`

(mandatory)
|`str`
|The identifier of an existing JupyterHub instance to which the MLflow instance will be connected.

A list of all Cloud ML Platform instances and their identifiers can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`domain_name`

(optional)
|`str`
|The domain name of the instance. If not specified, it will be created automatically.

Domain name requirements:

- Maximum length is 63 characters.
- Can contain only digits, lowercase Latin letters and special characters `.`, `-`.
- Cannot begin and end with the `-` special character 

|`flavor`

(mandatory)
|`str`
|The identifier of the configuration template to create the VM instance.

The list of configuration templates and their identifiers can be obtained using the [get_flavors](#get_flavors) method

|`volumes`

(mandatory)
|`List[MLPlatformVolumeIn]`
|A list of the disks of the instance.

Each disk is described by an object of the `MLPlatformVolumeIn` class with fields:

- `size`: the volume of the disk in GB (`int` type).
- `volume_type`: [disk type](/en/computing/iaas/concepts/about#disks_types_b7c586e). Valid values are `VolumeType.ceph_ssd` and `VolumeType.high_iops`.
- `availability_zone`: [availability_zone](/en/intro/start/concepts/architecture#az). Valid values are `AvailabilityZone.GZ1` and `AvailabilityZone.MS1`.

<warn>

MLflow instances with only one disk are supported.

</warn>

Example of a disk description:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(mandatory)
|`MLPlatformNetworkIn`
|The network to which the instance will be connected. Must match the network of the JupyterHub instance to which the MLflow instance will be connected.

The network is described by an object of the `MLPlatformVolumeIn` class with the `network_id` field containing the network identifier. Lists of the project's standard and external networks and their identifiers can be obtained using the [get_internal_networks](#get_internal_networks) and [get_external_networks](#get_external_networks) methods.

Example of network description:

```python
MLPlatformNetworkIn(network_id="net-12345")
```
|`is_mlflow_demo_mode`

(mandatory)
|`bool`
|Creating an MLflow instance in demo mode:

- `True` — instance will be created in demo mode. A local SQLite database will be created on the instance VM.
- `False` — instance will be created in PRO mode. A PostgreSQL database will be created in the [Cloud Databases](/en/dbs/dbaas) service, available on the MLflow instance.

Default value: `True`.

<warn>

To preserve ML models and their results, it is recommended to use the demo mode only to familiarise yourself with the functionality

</warn>
|===

### Return value

An object of the `VmDetailInfo` class with information about the created MLflow instance.

### Method signature and usage example

<details>
<summary>Method signature</summary>

```python
create_mlflow(instance_name: str,
              jh_id: str,
              domain_name: Optional[str] = None,              
              flavor: str,
              volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn],
              networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn,
              is_mlflow_demo_mode: bool = True,
              **kwargs
             ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get the ID of one of the configuration templates in the list of available templates
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Get the ID of one of the standard networks in the list of available networks
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Create MLflow instance
   mlflow = mlp.create_mlflow(
       instance_name="mlflow-test",
       jh_id="6178700a-ХХХХ", # The JupyterHub instance should be up and running by now
       flavor=FLAVOR_ID,
       volumes=[MLPlatformVolumeIn(
           size=30,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       ),
       is_mlflow_demo_mode=True
   )
   print(mlflow)
   ```

   If successful, information about the MLflow instance being created will be output. Example output:

   ```txt
    ---------------
    MLflow Detail Info:
    ---------------
    id: f8258286-ХХХХ
    name: mlflow-test
    status: CREATING
    flavor_id: 1b624937-ХХХХ
    created_dt: 2024-08-02T11:02:27.752687Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: MLFLOW
    mlflow_jh_instance_id: 6178700a-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: jh_default_admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 30
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]
   ```

   Immediately after calling the `create_mlflow` method, the instance is in the process of creation, so some parameters are not defined, for example: domain name and IP address.

</details>

## create_deploy

Create an MLflow Deploy instance connected to an existing MLflow or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance.

<info>

Within Cloud ML Platform, the MLflow Deploy instance is used to deploy MLflow models on it.

</info>

Required token role: `Administrator`. [Learn more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`instance_name`

(mandatory)
|`str`
|MLflow Deploy instance name

|`mlflow_id`

(mandatory)
|`str`
|The identifier of an existing MLflow or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance to which the MLflow Deploy instance will be connected.

A list of all Cloud ML Platform instances and their identifiers can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`username`

(mandatory)
|`str`
|JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance admin login

|`password`

(mandatory)
|`str`
|JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance admin password 

|`domain_name`

(optional)
|`str`
|The domain name of the instance. If not specified, it will be created automatically.

Domain name requirements:

- 63 characters maximum length.
- Can contain only digits, lowercase Latin letters and special characters  `.`, `-`.
- Cannot begin and end with the `-` character.

|`flavor`

(mandatory)
|`str`
|The identifier of the configuration template to create the VM instance.

The list of configuration templates and their identifiers can be obtained using the [get_flavors](#get_flavors) method

|`volumes`

(mandatory)
|`List[MLPlatformVolumeIn]`
|A list of the disks of the instance.

Each disk is described by an object of the `MLPlatformVolumeIn` class with fields:

- `size`: the volume of the disk in GB (`int` type).
- `volume_type`: [disk type](/en/computing/iaas/concepts/about#disks_types_b7c586e). Valid values are `VolumeType.ceph_ssd` and `VolumeType.high_iops`.
- `availability_zone`: [availability_zone](/en/intro/start/concepts/architecture#az). Valid values are `AvailabilityZone.GZ1` and `AvailabilityZone.MS1`.

<warn>

MLflow instances with only one disk are supported.

</warn>

Example of a disk description:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(mandatory)
|`MLPlatformNetworkIn`
|The network to which the instance will be connected. Must match the network of the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance to which the MLflow Deploy instance will be connected.

A network is described by an object of `MLPlatformVolumeIn` class with `network_id` field containing the network identifier. The lists of standard and external networks of the project and their identifiers can be obtained using the methods [get_internal_networks](#get_internal_networks) and [get_external_networks](#get_external_networks).

Example of network description:

```python
MLPlatformNetworkIn(network_id="net-12345")
```
|`is_mlflow_demo_mode`

(mandatory)
|`bool`
|Create an MLflow Deploy instance in demo mode:

- `True` - the instance will be created in demo mode.
- `False` - the instance will be created in PRO mode.

Default value: `True`.

<warn>

The operating mode of the MLflow Deploy instance must match the operating mode of the MLflow or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance to which it will be connected.

</warn>
|===

### Returning value

An object of class `VmDetailInfo` with information about the created MLflow Deploy instance.

### Method signature and usage example

<details>
<summary>Method signature</summary>

```python
create_deploy(instance_name: str,
              mlflow_id: str, 
              username: str, 
              password: str, 
              domain_name: Optional[str] = None, 
              flavor: str, 
              volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn], 
              networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn, 
              is_mlflow_demo_mode: bool = True, 
              **kwargs
              ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

</details>

<details>
<summary>Example of method usage</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:
   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get the ID of one of the configuration templates in the list of available templates
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Get the ID of one of the standard networks in the list of available networks
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Create an MLflow Deploy instance
   mlflow_deploy = mlp.create_deploy(
       instance_name="mlflow-deploy-test",
       mlflow_id="f8258286-ХХХХ", # The MLflow Instance should already be created
       username="admin",
       password="Admin123@",
       flavor=FLAVOR_ID,
       volumes=[MLPlatformVolumeIn(
           size=30,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       ),
       is_mlflow_demo_mode=True
   )
   print(mlflow_deploy)
   ```

   If successful, information about the MLflow Deploy instance being created will be output. Example output:

   ```txt
    ---------------
    MLflow Deploy Detail Info:
    ---------------
    id: b27fdd89-XXXX
    name: mlflow-deploy-test
    status: CREATING
    flavor_id: 1b624937-XXXX
    created_dt: 2024-08-05T08:48:45.698165Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: DEPLOY
    mlflow_jh_instance_id: None
    mlflow_deploy_instance_id: f8258286-XXXX
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 30
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]

   ```

    Immediately after calling the `create_deploy` method, the instance is in the process of being created, so some parameters are not defined, for example: domain name and IP address.

</details>

## get_all_instances_info

Get a list of all Cloud ML Platform instances: JupyterHub, MLflow, and MLflow Deploy.

Required token role: `Administrator`. [Learn more about token roles](../lib-authz).

### Method arguments

There are no arguments.

### Return value

A list of objects of class `VmDetailInfo` with information about all available JupyterHub, MLflow and MLflow Deploy instances in the project.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
get_all_instances_info(**kwargs
                      ) -> List[mlplatform_client.serializers.gateway.VmDetailInfo]
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:
   ```python
   from mlplatform_client import MLPlatform

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get and display a list of all Cloud ML Platform instances
   instances = mlp.get_all_instances_info()
   print(instances)
   ```

   If successful, information about all Cloud ML Platform instances available in the project will be output. Example of the output part:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-ХХХХ
    name: jh-test
    status: RUNNING
    flavor_id: 00bbf595-ХХХХ
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: 10.0.2.40
    domain_name: jh-test-mlp-ХХХХ.ml.msk.vkcs.cloud/jh
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: f8258286-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: ml_platform_boot_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: ba1b3d71-ХХХХ, 
    ---------------
        name: ml_platform_data_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: d6ee2d16-ХХХХ],
    # fragment end
    ```

</details>

## get_instance_info

Get information about a Cloud ML Platform instance (JupyterHub, MLflow, MLflow Deploy) by its ID.

Required role of the token: `Administrator`. [Learn more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`instance_id`

(mandatory)
|`str`
|Cloud ML Platform instance identifier.

A list of all Cloud ML Platform instances and their IDs can be obtained using the [get_all_instances_info](#get_all_instances_info) method
|===

### Return value

An object of class `VmDetailInfo` with information about the Cloud ML Platform instance with the specified identifier.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
get_instance_info(instance_id: str,
                  **kwargs
                 ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:
   ```python
   from mlplatform_client import MLPlatform

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get a list of all Cloud ML Platform instances
   instances = mlp.get_all_instances_info()
   
   # Get and display information about the second instance in the list
   INSTANCE_ID = instances[1].id
   instance_info = mlp.get_instance_info(instance_id=INSTANCE_ID)
   print(instance_info)
   ```

   If successful, information about the instance with the specified identifier will be output. Example output:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-ХХХХ
    name: jh-test
    status: RUNNING
    flavor_id: 00bbf595-ХХХХ
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: 10.0.2.40
    domain_name: jh-test-mlp-ХХХХ.ml.msk.vkcs.cloud/jh
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: f8258286-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: ml_platform_boot_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: ba1b3d71-ХХХХ, 
    ---------------
        name: ml_platform_data_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: d6ee2d16-ХХХХ],
    ```

</details>

## delete_instance

Remove the Cloud ML Platform instance (JupyterHub, MLflow, or MLflow Deploy).

Required token role: `Administrator`. [Learn more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`instance_id`

(mandatory)
|`str`
|Cloud ML Platform instance identifier.

A list of all Cloud ML Platform instances and their IDs can be obtained using the [get_all_instances_info](#get_all_instances_info) method
|===

### Return value

There is no return value.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
delete_instance(instance_id: str,
                **kwargs
               ) -> None
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `Administrator` role if not already done.
1. Run the Python script:
   ```python
   from mlplatform_client import MLPlatform

   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get and display a list of all Cloud ML Platform instances
   instances = mlp.get_all_instances_info()
   print(instances)
   
   # Delete the first instance in the list
   INSTANCE_ID = instances[0].id
   mlp.delete_instance(instance_id=INSTANCE_ID)
   
   # Get and display the list of instances again for verification
   instances = mlp.get_all_instances_info()
   print(instances)
   ```

    The list of Cloud ML Platform instances will be displayed twice:

    - list of instances before deletion
    - list of instances after deletion

    In case of success, the second list will not contain the deleted instance.

</details>

## create_deployment

Create a deployment of the remote ML model.

<info>

The deployment is created as a Docker container with the ML model packed in it, running on the MLflow Deploy instance. Access to the container is provided via REST API.

</info>

Required role of the token: `User` or `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`deploy_server_name`

(mandatory)
|`str`
|MLflow Deploy instance name on which the remote ML model will be deployed.

A list of all Cloud ML Platform instances and their names can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`deployment_name`

(mandatory)
|`str`
|Deployment name of the remote ML model

|`model_uri`

(mandatory)
|`str`
|URI of the ML model in the artefact repository of the MLflow instance

|`username`

(mandatory)
|`str`
|The administrator login for the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance that the MLflow Deploy instance is associated with

|`password`

(mandatory)
|`str`
|The administrator password for the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance that the MLflow Deploy instance is associated with

|`model_username`

(mandatory)
|`str`
|User login to access the methods of the remote ML model, i.e. the [predict_model](#predict_model) and [ping_model](#ping_model) methods

|`model_password`

(mandatory)
|`str`
|User password for access to remote ML model methods

|`port_out`

(mandatory)
|`int`
|The port of the MLflow Deploy instance through which the remote ML model will be accessed.

If `None` is specified, the first free port in the range 62000-65000 will be selected
|===

### Return value

An object of the `DeployOut` class with information about the created ML model deployment: its name, status and other parameters.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
create_deployment(deploy_server_name: str,
                  deployment_name: str, 
                  model_uri: str, 
                  username: str, 
                  password: str, 
                  model_username: str, 
                  model_password: str, 
                  port_out: int = None, 
                  **kwargs
                 ) -> mlplatform_client.serializers.deployment.DeployOut
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install), if you have not already done it.
1. [Create an access token](../lib-authz) with the `User` role, if you have not already done it.
1. Authorize the library using the access token by executing the Python script:

   ```python
   from mlplatform_client import MLPlatform
  
   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [Create](../../jupyterhub/service-management/create) the JupyterHub instance, if you have not already done it.
1. [Create](../../mlflow/service-management/create) an MLflow instance, if you have not already done it.
1. Create and train an ML model, if you have not already done it.
1. [Create](../../deploymlflow/service-management/create "change-lang") instance of MLflow Deploy, if you have not already done it.
1. Run the Python script:

   ```python
   # Create an ML-model deployment
   deployment = mlp.create_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name="test_deployment_1", 
       model_uri="mlflow-artifacts:/2/bc303eb8eXXXX/artifacts/model", 
       username="admin", 
       password="Admin123@", 
       model_username="user123", 
       model_password="Password123!",
       port_out = None
   )
   print(deployment)

   ```

   If successful, the created ML model deployment will be output. Example output:

   ```txt
   2024-08-08 04:57:50,907 [ WARNING ]  Time-consuming operation was started, need to wait 2-3 mins or above

   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations
   ```

   To learn about preparing to create a deployment, see [Managing an instance with MLflow Client](/ru/ml/mlplatform/deploymlflow/how-to-guides/manage-mlflow-client "change-lang").

</details>

## list_deployments

Get a list of all ML model deployments available on the MLflow Deploy instance.

Required token role: `User` or `Administrator`. [Learn more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`deploy_server_name`

(mandatory)
|`str`
|MLflow Deploy instance name.

A list of all Cloud ML Platform instances and their names can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`username`

(mandatory)
|`str`
|The administrator login for the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance that the MLflow Deploy instance is associated with

|`password`

(mandatory)
|`str`
|The administrator password for the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance that the MLflow Deploy instance is associated with
|===

### Return value

A list of objects of the `DeployOut` class with information about ML model deployments available on the specified instance: their names, statuses and other parameters.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
list_deployments(deploy_server_name: str,
                 username: str,
                 password: str, 
                 **kwargs
                ) -> List[mlplatform_client.serializers.deployment.DeployOut]
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `User` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
  
   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Get and display a list of the ML model deployments
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test", # The MLflow Deploy instance must exist
       username="admin", 
       password="Admin123@"
   )
   print(deployments)

   ```

   If successful, a list will be output with information about the ML model deployments available on the instance. Example output:

   ```txt
   [
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations, 
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment
   status: running
   port: 62000
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: 
   predict_ref: ]
   ```

</details>

## get_deployment

Get information about the ML model deployment by its name.

Required role of the token: `User` or `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`deploy_server_name`

(mandatory)
|`str`
|MLflow Deploy instance name.

A list of all Cloud ML Platform instances and their names can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`deployment_name`

(mandatory)
|`str`
|The name of the remote ML model deployment.

A list of all deployments and their names can be obtained using the [list_deployments](#list_deployments) method

|`username`

(mandatory)
|`str`
|The administrator login for the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance that the MLflow Deploy instance is associated with

|`password`

(mandatory)
|`str`
|The administrator password for the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance that the MLflow Deploy instance is associated with
|===

### Return value

An object of the `DeployOut` class with information about the specified MLmodel deployment: its name, status and other parameters.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
get_deployment(deploy_server_name: str,
               deployment_name: str, 
               username: str, 
               password: str, 
               **kwargs
              ) -> mlplatform_client.serializers.deployment.DeployOut
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `User` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
  
   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # The MLflow Deploy instance must exist and at least one deployment must be available on it

   # Get a list of ML model deployments
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@"
   )

   # Get and display information about the first deployment in the list
   DEPLOYMENT_NAME = deployments[0].name
   deployment_info = mlp.get_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name=DEPLOYMENT_NAME,
       username="admin", 
       password="Admin123@"
   )
   print(deployment_info)

   ```

   If successful, the first ML model deployment in the list on the specified MLflow Deploy instance will be output. Example output:

   ```txt
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations
   ```

</details>

## delete_deployment

Remove the ML model deployment.

Required token role: `User` or `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`deploy_server_name`

(mandatory)
|`str`
|MLflow Deploy instance name.

A list of all Cloud ML Platform instances and their names can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`deployment_name`

(mandatory)
|`str`
|ML model deployment name.

A list of all deployments and their names can be obtained using the [list_deployments](#list_deployments) method

|`username`

(mandatory)
|`str`
|The administrator login for the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance that the MLflow Deploy instance is associated with

|`password`

(mandatory)
|`str`
|The administrator password for the JupyterHub or [MLflow Standalone](../../concepts/mlflow-modes#standalone) instance that the MLflow Deploy instance is associated with
|===

### Return value

There is no return value.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
delete_deployment(deploy_server_name: str,
                  deployment_name: str, 
                  username: str, 
                  password: str, 
                  **kwargs
                 ) -> None
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `User` role, if not already done.
1. Run the Python script:

   ```python
   from mlplatform_client import MLPlatform
  
   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # The MLflow Deploy instance must exist and at least one deployment must be available on it
   
   # Get and display a list of ML model deployments
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@" 
   )
   print(deployments)

   # Delete the first deployment in the list
   DEPLOYMENT_NAME = deployments[0].name
   mlp.delete_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name=DEPLOYMENT_NAME,
       username="admin", 
       password="Admin123@" 
   )
   
   # Retrieve and display the deployment list again
   deployments_after_deletion = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@"
   )
   print(deployments_after_deletion)

   ```

    A list of ML model deployments will be displayed twice:

    - list of deployments before deletion
    - list of deployments after deletion

    If successful, the second list will be missing the remote deployment of the ML model.

</details>

## ping_model

Verify that the remote ML model is ready for operation.

Required token role: `User` or `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`deploy_server_name`

(mandatory)
|`str`
|MLflow Deploy instance name, on which the ML model is deployed.

A list of all Cloud ML Platform instances and their names can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`deployment_name`

(mandatory)
|`str`
|The name of the remote ML model deployment.

A list of all deployments and their names can be obtained using the [list_deployments](#list_deployments) method

|`model_username`

(mandatory)
|`str`
|User login for access to methods of the remote ML-model, which was specified in the method call  [create_deployment](#create_deployment)

|`model_password`

(mandatory)
|`str`
|User password for access to the remote ML-model methods, which was specified in the method call  [create_deployment](#create_deployment)
|===

### Return value

New line character `\n` if the model is ready for operation.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
ping_model(deploy_server_name: str,
           deployment_name: str, 
           model_username: str, 
           model_password: str, 
           **kwargs
          ) -> str
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install), if you have not already done it.
1. [Create an access token](../lib-authz) with the `User` role, if you have not already done it.
1. Authorize the library using the access token by executing the Python script:

   ```python
   from mlplatform_client import MLPlatform
  
   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [Create](../../jupyterhub/service-management/create) the JupyterHub instance, if you have not already done it.
1. [Create](../../mlflow/service-management/create) an MLflow instance, if you have not already done it.
1. Create and train an ML model, if you have not already done it.
1. [Create](../../deploymlflow/service-management/create "change-lang") instance of MLflow Deploy, if you have not already done it.
1. Deploy the ML model on the MLflow Deploy instance using the [create_deployment](#create_deployment) method.
1. Run the Python script:

   ```python
   # Check the ML model is ready for operation
   result = mlp.ping_model(deploy_server_name="mlflow-deploy-test", 
       deployment_name="test_deployment_1", 
       model_username="user123", 
       model_password="Password123!"
   )
   print(result)
   ```

   If successful, an empty string will be printed.

   To prepare for using the ML model, see [Managing an instance with MLflow Client](/ru/ml/mlplatform/deploymlflow/how-to-guides/manage-mlflow-client "change-lang").

</details>

## predict_model

Obtain ML model prediction for given input data.

Required token role: `User` or `Administrator`. [Read more about token roles](../lib-authz).

### Method arguments

[cols="1,1,4", options="header", width=100%]
|===
|Argument
|Type
|Description

|`data`

(mandatory)
|`Dict`
|Input data for the ML model

|`deploy_server_name`

(mandatory)
|`str`
|MLflow Deploy instance name, on which the ML model is deployed.

A list of all Cloud ML Platform instances and their names can be obtained using the [get_all_instances_info](#get_all_instances_info) method

|`deployment_name`

(mandatory)
|`str`
|The name of the remote ML model deployment.

A list of all deployments and their names can be obtained using the [list_deployments](#list_deployments) method

|`model_username`

(mandatory)
|`str`
|User login for access to methods of the remote ML-model, which was specified in the [create_deployment](#create_deployment) method call

|`model_password`

(mandatory)
|`str`
|The user password for accessing the remote ML model methods, which was specified in the [create_deployment](#create_deployment) method call
|===

### Return value

ML model prediction for given input data in the `Dict[str, Any]` format.

### Method signature and example of use

<details>
<summary>Method signature</summary>

```python
predict_model(data: Dict,
              deploy_server_name: str, 
              deployment_name: str, 
              model_username: str, 
              model_password: str, 
              **kwargs
             ) -> Dict[str, Any]
```

</details>

<details>
<summary>Example of using the method</summary>

<err>

For simplicity, the value of the access token is specified in the Python script example.

When working in a production environment, do not operate tokens in the clear. Use environment variables, secret stores, or other tools to handle sensitive data. [Read more about tokens](../lib-authz).

</err>

1. [Install the library](../lib-install) if not already done.
1. [Create an access token](../lib-authz) with the `User` role, if not already done.
1. Authorize the library using the access token by executing the Python script:

   ```python
   from mlplatform_client import MLPlatform
  
   # Log in to the library using an access token
   REFRESH_TOKEN = '<ACCESS_TOKEN_VALUE>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [Create](../../jupyterhub/service-management/create) the JupyterHub instance, if you have not already done it.
1. [Create](../../mlflow/service-management/create) an MLflow instance, if you have not already done it.
1. Create and train an ML model, if you have not already done it.
1. [Create](../../deploymlflow/service-management/create "change-lang") instance of MLflow Deploy, if you have not already done it.
1. Deploy the ML model on the MLflow Deploy instance using the [create_deployment](#create_deployment) method.
1. Run the Python script:

   ```python
   # Define the input data for the ML model
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],
                     [0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]
                    ]}

   # Get and display ML model prediction
   result = mlp.predict_model(data=data,
       deploy_server_name="mlflow-deploy-test", 
       deployment_name="test_deployment", 
       model_username="user123", 
       model_password="Password123!"
   )
   print(result)
   ```

   If successful, the ML model prediction will be output. Example output:

   ```txt
   {'predictions': [262.3591008044226, 215.47878674779508]}
   ```

   To learn about preparing to use the ML model, see [Managing instances with MLflow Client](/ru/ml/mlplatform/deploymlflow/how-to-guides/manage-mlflow-client "change-lang").

</details>
