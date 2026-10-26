{cut(Description of the fields of K8sClusterInfo objects)}

[cols="1,1,5", options="header", width=100%]
|===
|Field
|Type
|Description

|`id`

(required)
|`str`
|Unique identifier of the Cloud Spark cluster

|`name`

(required)
|`str`
|Unique name of the Cloud Spark cluster

|`k8s_id`

(optional)
|`str`
|Identifier of the Kubernetes cluster linked to the Cloud Spark cluster. It can be found in the management console in the **Kubernetes clusters → Kubernetes clusters** section.

`None` if the cluster is not linked (for example, in the first seconds after requesting cluster creation)

|`status`

(required)
|`str`
|Status of the Cloud Spark cluster. Accepted values:

- `CREATING` — cluster creation;
- `CREATING_REGISTRY` — cluster preparation;
- `INSTALL_SPARK_OPERATOR` — cluster preparation;
- `PROVISIONING` — cluster preparation;
- `RECONCILING` — cluster preparation;
- `CREATE_FAILED` — cluster creation failed with an error;
- `ERROR` — error;
- `STARTING` — cluster startup;
- `RUNNING` — the cluster is running;
- `FREEZING` — cluster stopping;
- `SHUTOFF` — the cluster is stopped;
- `DELETING` — cluster deletion

|`status_reason`

(optional)
|`str`
|Information about the reason the Cloud Spark cluster transitioned to the current status, for example, a description of the error if `status == CREATE_FAILED`.

`None` if there were no errors throughout the cluster's operation

|`s3_bucket_name`

(optional)
|`str`
|Name of the [bucket](/en/storage/s3/concepts/about#s3-concepts-about-bucket) linked to the Cloud Spark cluster. It can be found in the management console in the **Object Storage → Buckets** section.

`None` if a bucket has not yet been created for the cluster

|`docker_registry_id`

(required)
|`str`
|Identifier of the DockerRegistry instance linked to the Cloud Spark cluster. It can be found in the management console in the **ML Platform → Instances** section

|`history_server_url`

(optional)
|`str`
|URL of the Spark History Server.

`None` if the server has not yet been created

|`inactive_min`

(required)
|`int`
|Time in minutes since the last active task finished

|`suspend_after_inactive_min`

(required)
|`int`
|Time in minutes after which the cluster goes into sleep mode if it is not used.

`None` if the cluster's maximum inactivity time is not set

|`delete_after_inactive_min`

(required)
|`int`
|Time in minutes after which the cluster is deleted if it is not used.

`None` if the cluster's maximum inactivity time is not set

|`docker_registry`

(optional)
|`VmDetailInfo`
|Detailed information about the VM linked to the DockerRegistry instance of the Cloud Spark cluster.

`None` if the DockerRegistry instance has not yet been created
|===

{/cut}

{cut(Description of the fields of VmDetailInfo objects)}

[cols="1,1,5", options="header", width=100%]
|===
|Field
|Type
|Description

|`availability_zone`

(required)
|`str`
|VM availability zone. Accepted values: `MS1`, `GZ1`

|`volumes`

(required)
|`list[MLPlatformVolumeIn]`
|List of disks attached to the VM
|===

{/cut}

{cut(Description of the fields of MLPlatformVolumeIn objects)}

[cols="1,1,5", options="header", width=100%]
|===
|Field
|Type
|Description

|`size`

(required)
|`int`
|Disk size

|`volume_type`

(required)
|`str`
|Disk type

|`imageRef`

(optional)
|`str`
|Link to the disk image

|`availability_zone`

(required)
|`str`
|VM availability zone. Accepted values: `MS1`, `GZ1`

|`cinder_id`

(optional)
|`str`
|Identifier of the attached disk. It can be found in the management console in the **Cloud Computing → Disks** section.

`None` if the disk has not yet been created
|===

{/cut}
