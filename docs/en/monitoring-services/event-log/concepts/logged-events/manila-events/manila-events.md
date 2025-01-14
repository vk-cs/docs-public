Events that the service of [file storages](/en/computing/iaas/concepts/about#file_storage) reports to Cloud Audit:

[cols="1,4", options="header"]
|===
|Method
|Endpoint and events generated on it, including failed action attempts

2+^|[Creating and deleting file storages and changing their settings](https://docs.openstack.org/api-ref/shared-file-system/index.html#create-share)

|POST
|`/v2/shares/`

A file storage has been [created](/en/computing/iaas/service-management/fs-manage#creating_a_file_storage)

|POST
|`/v2/shares/manage`

A file storage created outside the file storage service has been brought under its management

|PUT
|`/v2/shares/{share_id}`

Settings of a file storage have been changed

|DELETE
|`/v2/shares/{share_id}`

A file storage has been [deleted](/en/computing/iaas/service-management/fs-manage#deleting_a_file_storage_and_its_network)
2+^|[Operations with file storage metadata](https://docs.openstack.org/api-ref/shared-file-system/index.html#delete-share-metadata-item)

|POST
|`/v2/shares/{share_id}/metadata`

* New metadata has been added as key/value pairs.
* Values ​​for the existing metadata have been changed

|PUT
|`/v2/shares/{share_id}/metadata`

All metadata of a file storage has been replaced with new ones

|DELETE
|`/v2/shares/{share_id}/metadata/{key}`

A metadata element with the given key has been deleted

2+^|[Additional operations with file storages](https://docs.openstack.org/api-ref/shared-file-system/index.html#grant-access)

|POST
|`/v2/shares/{share_id}/action`

* Access to a file storage has been [granted](/en/computing/iaas/service-management/fs-manage#adding_an_access_rule).
* Access to a file storage has been [revoked](/en/computing/iaas/service-management/fs-manage#deleting_an_access_rule).
* File storage size has been [changed](/en/computing/iaas/service-management/fs-manage#increasing_file_storage_size)

2+^|[Operations with file storage snapshots](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-snapshots)

|POST
|`/v2/snapshots`

A file storage snapshot has been [created](/en/computing/iaas/service-management/fs-manage#creating_a_snapshot)

|POST
|`/v2/snapshots/manage`

A snapshot of a file storage created outside the file storage service has been brought under its management

|POST
|`/v2/snapshots/{snapshot_id}/action`

Managing a snapshot of a file storage created outside of file storage service has been cancelled

|PUT
|`/v2/snapshots/{snapshot_id}`

Setting of a file storage snapshot have been changed

|DELETE
|`/v2/snapshots/{snapshot_id}`

A file storage snapshot has been [deleted](/en/computing/iaas/service-management/fs-manage#deleting_a_snapshot)

2+^|[Operations with metadata of file storage snapshots](https://docs.openstack.org/api-ref/shared-file-system/index.html#snapshot-metadata-since-api-v2-73)

|POST
|`/v2/snapshots/{snapshot_id}/metadata`

* New metadata has been added as key/value pairs.
* Values ​​for the existing metadata have been changed

|PUT
|`/v2/snapshots/{snapshot_id}/metadata`

All metadata of a file storage snapshot has been replaced with new ones

|DELETE
|`/v2/snapshots/{snapshot_id}/metadata/{key}`

A metadata element with the given key has been deleted

2+^|[Managing file storage networks](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-networks)

|POST
|`/v2/share-networks`

A file storage network has been [created](/en/computing/iaas/service-management/fs-manage#creating_a_file_storage)

|POST
|`/v2/share-networks/{share_network_id}/action`

Actions with a security service for a file storage network:

* the service has been added, deleted, or replaced;
* the ability to add or replace the service has been checked.

|PUT
|`/v2/share-networks/{share_network_id}`

Settings of a file storage network have been changed

|DELETE
|`/v2/share-networks/{share_network_id}`

A file storage network has been [deleted](/en/computing/iaas/service-management/fs-manage#deleting_a_file_storage_and_its_network)

2+^|[Managing subnets in file storage networks](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-network-subnets-since-api-v2-51)

|POST
|`/v2/share-networks/{share_network_id}/subnets`

A subnet of the specified file storage network has been created

|DELETE
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}`

A subnet of the specified file storage network has been deleted

2+^|[Managing file storage network metadata](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-network-subnets-metadata-since-api-v2-78)

|POST
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata`

* New metadata has been added as key/value pairs.
* Values ​​for the existing metadata have been changed

|PUT
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata`

All metadata of the specified subnet has been replaced with new ones

|DELETE
|`/v2/share-networks/{share_network_id}/subnets/{share_network_subnet_id}/metadata/{key}`

A metadata element with the given key has been deleted

2+^|[Operations with file storage types](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-types)

|POST
|`/v2/types`

A new type of file storages has been created

|POST
|`/v2/types/{share_type_id}/extra_specs`

An additional specification has been assigned to the specified file storage type

|DELETE
|`/v2/types/{share_type_id}/extra_specs/{extra-spec-key}`

An additional specification assignment for a file storage type has been cancelled

|POST
|`/v2/types/{share_type_id}/action`

* Access to a file storage type has been granted.
* Access to a file storage type has been revoked

|DELETE
|`/v2/types/{share_type_id}`

A type of file storages has been deleted

|PUT
|`/v2/types/{share_type_id}`

Settings of a file storage type have been changed

2+^|[Managing quotas](https://docs.openstack.org/api-ref/shared-file-system/index.html#quota-sets)

|PUT
|`/v2/quota-sets/{project_id_quota_request_path}?user_id={user_id}`

Quotas for a project or a user of a project have been changed

|DELETE
|`/v2/quota-sets/{project_id_quota_request_path}?user_id={user_id}`

A change to quotas for a project or a user of a project has been reverted, i.e. quotas are back to default

2+^|[Operations with access rule metadata](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-access-rule-metadata-since-api-v2-45)

|PUT
|`/v2/share-access-rules/{access_id}/metadata`

Metadata for a file storage access rule has been changed

|DELETE
|`/v2/share-access-rules/{access_id}/metadata/{key}`

* Setting metadata for a file storage access rule has been cancelled.
* A value of a metadata element with the given key has been deleted

2+^|[Managing file storage backup](https://docs.openstack.org/api-ref/shared-file-system/index.html#share-backups-since-api-v2-80)

|POST
|`/v2/share-backups`

A file storage backup has been created

|PUT
|`/v2/share-backups/{backup_id}`

Settings of a file storage backup has been changed

|DELETE
|`/v2/share-backups/{backup_id}`

A file storage backup has been deleted

|POST
|`/v2/share-backups/{backup_id}/action`

* A file storage has been restored from a backup.
* The administrator has changed the status of a backup copy
|===
