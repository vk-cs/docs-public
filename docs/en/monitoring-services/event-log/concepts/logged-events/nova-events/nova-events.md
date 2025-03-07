Events that the service of [computing resource management](/en/computing/iaas/service-management/vm) reports to Cloud Audit.

[cols="2,3", options="header"]
|===
|Event
|Description

|`create-vm`
|A VM has been created

|`delete-vm`
|A VM has been deleted

|`update-vm`
|A VM has been updated

|`vm-action`
|An action has been performed with a VM

|`vm-create-console`
|A VM console has been created

|`vm-create-or-update-metadata`
|VM metadata has been created or updated

|`vm-delete-metadata`
|VM metadata has been deleted

|`vm-attach-interface`
|An interface has been attached to a VM

|`vm-detach-interface`
|An interface has been detached from a VM

|`vm-clear-password`
|A VM password has been cleared

|`vm-attach-volume`
|A volume has been attached to a VM

|`vm-detach-volume`
|A volume has been detached from a VM

|`vm-update-volume`
|A VM volume has been updated

|`flavor-create`
|A VM flavor (configuration template) has been created

|`flavor-delete`
|A VM flavor has been deleted

|`flavor-update`
|A VM flavor has been updated

|`flavor-modify-access`
|Access to a VM flavor has been changed

|`flavor-create-extraspecs`
|Extra specifications have been added to a VM flavor

|`flavor-delete-extraspecs`
|Extra specifications have been deleted from a VM flavor

|`flavor-update-extraspecs`
|Extra specifications of a VM flavor have been updated

|`keypair-create`
|A key pair has been created

|`keypair-delete`
|A key pair has been deleted

|`aggregate-create`
|An aggregate has been created

|`aggregate-delete`
|An aggregate has been deleted

|`aggregate-delete`
|An aggregate has been updated

|`external-event`
|An external event has occurred

|`assisted-volume-snapshots-create`
|Volume state snapshots have been created using an emulator or hypervisor

|`assisted-volume-snapshots-delete`
|Volume state snapshots have been deleted using an emulator or hypervisor

|`vm-migration-create`
|A VM migration has been launched

|`vm-migration-abort`
|A VM migration has been aborted

|`quota-update`
|A quota has been updated

|`quota-class-update`
|Quotas for a quota class have been updated

|`quota-revert-to-default`
|A quota has been reverted to default

|`server-groups-create`
|Server groups have been created

|`server-groups-delete`
|Server groups have been deleted

|`tags-replace`
|All tags have been replaced

|`tags-delete`
|All tags have been deleted

|`tag-create`
|A tag has been created

|`tag-delete`
|A tag has been deleted

|`create-security-group`
|A security group has been created

|`update-security-group`
|A security group has been updated

|`delete-security-group`
|A security group has been deleted

|`create-security-group-rule`
|A security group rule has been created

|`delete-security-group-rule`
|A security group rule has been deleted

|`create-floating-ip`
|A [Floating IP address](/en/networks/vnet/concepts/ips-and-inet#floating_ip_address) has been created

|`delete-floating-ip`
|A Floating IP address has been deleted
|===
