{includetag(domain-events)}
Domain events record changes in resources states.

[cols="2,2,1", options="header"]
|===
|Event
|Description
|Resource

|`complete-checkpoint`
|Backup creation completed
|`checkpoint`

|`complete-restore`
|Backup restore completed
|`restore`

|`create-checkpoint`
|Manual backup creation started
|`checkpoint`

|`create-checkpoint-from-trigger`
|Scheduled backup creation started
|`checkpoint`

|`create-plan`
|Backup plan created
|`plan`

|`create-plan-checkpoint`
|Backup creation for the plan started
|`checkpoint` on success, `plan` on error

|`create-plan-resource`
|Resource added to the backup plan
|`plan`

|`create-restore`
|Backup restore started
|`restore`

|`create-trigger`
|Backup schedule created
|`trigger`

|`update-trigger`
|Backup schedule updated
|`trigger`

|`delete-checkpoint-resource`
|Backup resource deleted
|`checkpoint_resource`

|`delete-plan`
|Backup plan deleted
|`plan`

|`delete-plan-resource`
|Resource removed from the backup plan
|`plan`

|`disable-plan-object-lock`
|Object Lock disabled for the plan
|`plan`

|`enable-plan-object-lock`
|Object Lock enabled for the plan
|`plan`

|`extend-checkpoint-lock`
|Backup lock period extended
|`checkpoint`

|`mark-checkpoint-for-deletion`
|Backup marked for deletion
|`checkpoint`

|`unlock-checkpoint`
|Backup unlocked
|`checkpoint`

|`update-plan`
|Backup plan updated
|`plan`

|`update-plan-object-lock`
|Object Lock plan parameters updated
|`plan`
|===
{/includetag}

{includetag(api-events)}
API request events record data reads as well as authentication and authorization results.

[cols="2,2,1", options="header"]
|===
|Event
|Description
|Resource

|`authenticate-api-request`
|API request authentication error
|`api`

|`authorize-api-request`
|API request authorization error
|`api`

|`create-default-plan`
|Default plan created on request
|`plan`

|`get-default-plan`
|Default plan requested
|`plan`

|`get-plan`
|Specific plan requested
|`plan`

|`list-plans`
|List of plans requested
|`plan`

|`get-checkpoint`
|Backup requested
|`checkpoint`

|`get-checkpoint-consistency-status`
|Backup consistency status requested
|`checkpoint`

|`get-checkpoint-deleted-status`
|Backup deletion status requested
|`checkpoint`

|`get-checkpoint-metadata`
|Backup metadata requested
|`checkpoint`

|`list-checkpoints`
|List of backups requested
|`checkpoint`

|`list-checkpoints-by-plan`
|Backups grouped by plans requested
|`checkpoint`

|`get-trigger`
|Schedule requested
|`trigger`

|`list-triggers`
|List of schedules requested
|`trigger`

|`get-plans-statistics`
|Plan statistics requested
|`statistics`

|`get-checkpoints-statistics`
|Backup statistics requested
|`statistics`

|`get-restores-statistics`
|Restore statistics requested
|`statistics`

|`get-provider`
|Provider requested
|`provider`

|`get-resources-in-use`
|Resources used in plans requested
|`resources`
|===
{/includetag}
