Events that the service of [disk and snapshot management](/en/computing/iaas/service-management/volumes) reports to Cloud Audit.

## Cinder v2 component events

[cols="2,3", options="header"]
|===
|Event
|Description

|`force-delete-backup`
|A backup has been forcibly deleted

|`accept-volume-transfer`
|A volume transfer from one user to another has been accepted

|`create-volume-transfer`
|A volume transfer has been created

|`delete-volume-transfer`
|A volume transfer has been deleted

|`create-backup`
|A backup has been created

|`delete-backup`
|A backup has been deleted

|`restore-backup`
|A restore from a backup has been performed

|`reset-snapshot-status`
|A snapshot status has been reset

|`create-snapshot`
|A snapshot has been created

|`update-snapshot-metadata`
|Snapshot metadata has been updated

|`update-snapshot`
|A snapshot has been updated

|`delete-snapshot`
|A snapshot has been deleted

|`volume-type-action`
|An action has been performed with a volume type

|`create-consistency-group`
|A consistency group for making volume snapshots has been created

|`create-consistency-group-from-source`
|A consistency group has been created from a source

|`delete-consistency-group`
|A consistency group has been deleted

|`update-consistency-group`
|A consistency group has been updated

|`extend-volume-size`
|A volume size has been extended

|`manage-existing-volume`
|An existing volume has been taken under the Cinder management

|`unset-keys-in-qos-specification`
|Keys in a QoS specification have been unset

|`set-keys-in-qos-specification`
|Keys in a QoS specification have been set

|`delete-qos-specification`
|A QoS specification has been deleted

|`create-qos-specification`
|A QoS specification has been created

|`update-quotas-for-user`
|Quotas for a user have been updated

|`delete-quotas-for-user`
|Quotas for a user have been deleted

|`update-quotas`
|Quotas have been updated

|`delete-quotas`
|Quotas have been deleted

|`create-volume`
|A volume has been created

|`update-volume`
|A volume has been updated

|`delete-volume`
|A volume has been deleted

|`create-volume-metadata`
|Volume metadata has been created

|`update-volume-metadata`
|Volume metadata has been updated

|`delete-consistency-group-snapshot`
|A snapshot of a consistency group has been deleted

|`create-consistency-group-snapshot`
|A snapshot of a consistency group has been created

|`update-volume-type`
|A volume type has been updated

|`delete-volume-type`
|A volume type has been deleted

|`create-volume-type`
|A volume type has been created

|`action-volume`
|An action has been performed with a volume
|===

## Cinder v3 component events

[cols="2,3", options="header"]
|===
|Event
|Description

|`accept-volume-transfer`
|A volume transfer from one user to another has been accepted

|`create-volume-transfer`
|A volume transfer has been created

|`delete-volume-transfer`
|A volume transfer has been deleted

|`force-delete-backup`
|A backup has been forcibly deleted

|`delete-group-snapshot`
|A group snapshot has been deleted

|`create-group-snapshot`
|A group snapshot has been created

|`create-backup`
|A backup has been created

|`delete-backup`
|A backup has been deleted

|`restore-backup`
|A restore from a backup has been performed

|`add-private-volume-type-access-to-project`
|Access to a private volume type has been added to a project

|`create-consistency-group`
|A consistency group for making volume snapshots has been created

|`create-consistency-group-from-source`
|A consistency group has been created from a source

|`delete-consistency-group`
|A consistency group has been deleted

|`update-consistency-group`
|A consistency group has been updated

|`unset-keys-in-qos-specification`
|Keys in a QoS specification have been unset

|`set-keys-in-qos-specification`
|Keys in a QoS specification have been set

|`delete-qos-specification`
|A QoS specification has been deleted

|`create-qos-specification`
|A QoS specification has been created

|`extend-volume-size`
|A volume size has been extended

|`create-volume`
|A volume has been created

|`update-volume`
|A volume has been updated

|`delete-volume`
|A volume has been deleted

|`create-metadata-for-volume`
|Volume metadata has been created

|`update-volume-metadata`
|Volume metadata has been updated

|`manage-an-existing-volume`
|An existing volume has been taken under the Cinder management

|`reset-snapshot-status`
|A snapshot status has been reset

|`update-group-type`
|A group type has been updated

|`create-group-specs-for-group-type`
|Group specifications for a group type have been created

|`delete-group-type`
|A group type has been deleted

|`create-group-type`
|A group type has been created

|`update-quotas-for-user`
|Quotas for a user have been updated

|`delete-quotas-for-user`
|Quotas for a user have been deleted

|`update-quotas-for-project`
|Quotas for a project have been updated

|`delete-quotas-for-project`
|Quotas for a project have been deleted

|`update-volume-type`
|A volume type has been updated

|`delete-volume-type`
|A volume type has been deleted

|`create-volume-type`
|A volume type has been created

|`create-an-encryption-type`
|An encryption type has been created

|`update-an-encryption-type`
|An encryption type has been updated

|`create-group`
|A group has been created

|`create-group-from-source`
|A group has been created from a source

|`delete-group`
|A group has been deleted

|`update-group`
|A group has been updated

|`create-snapshot`
|A snapshot has been created

|`update-snapshot-metadata`
|Snapshot metadata has been updated

|`update-snapshot`
|A snapshot has been updated

|`delete-snapshot`
|A snapshot has been deleted

|`delete-consistency-group-snapshot`
|A snapshot of a consistency group has been deleted

|`create-consistency-group-snapshot`
|A snapshot of a consistency group has been created
|===
