Cloud Audit allows you to collect the IAM service events related to user authentication and authorization management in real time:

[cols="2,3,3", options="header"]
|===
|Event
|Description
|Where it is displayed

|`user-signin` with the `success == yes` parameter
|A user has logged into account
.6+|Event logs of all projects to which the user has access

|`user-signin` with the `success == no` parameter
|A user login attempt has failed

|`user-signout`
|A user has logged out

|`tfa-enable`
|Two-factor authorization for a user account has been enabled

|`tfa-disable`
|Two-factor authorization for a user account has been disabled

|`password-change`
|A user account password has been changed

|`invite_create`
|A user invitation to a project has been created
.3+|Event log of the project to which the user is invited

|`invite_update`
|A user invitation to a project has been changed

|`invite_remove`
|A user invitation to a project has been deleted

|`update_user_in_project`
|A user has been assigned a role in a project
|Event log of the project
|===
