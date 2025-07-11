Service accounts are special accounts intended for programs. On behalf of service accounts, programs can manage VK Cloud resources and interact with each other without human intervention. Service accounts help automate such interactions.

Like ordinary accounts, service accounts allow authorization in the API and CLI using a login and password. However, it is impossible to authorize in the VK Cloud management console using service accounts.

Access to VK Cloud resources by programs is limited by the scope of the role that is assigned to their used service account. A service account can be assigned with [any user role](../rolesandpermissions), except for the Project owner role.

Depending on their role in the project, a user in the VK Cloud management console can:

- [create](../../instructions/project-settings/service-account-manage#create) a service account
- [view](../../instructions/project-settings/service-account-manage#view_list) the list of the project service accounts
- [view](../../instructions/project-settings/service-account-manage#view_card) a service account details
- [download](../../instructions/project-settings/service-account-manage#download_rc_file) an OpenStack RC file to their device, which is required to use the API
- [configure](../../instructions/project-settings/service-account-manage#authorize) the environment for accessing the API on behalf of a service account
- [delete](../../instructions/project-settings/service-account-manage#delete) a service account

The same actions can be performed via API by a program that is authorized using a service account with a proper role.

Rights to manage the service accounts depending on the role in the project:

[cols="1,1,1", options="header"]
|===
|Roles
|Creating and deleting service accounts
|Viewing the list and details of service accounts, downloading the OpenStack RC file

|Project owner
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Superadministrator
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|User access administrator
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Project administrator
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Viewer
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

The list of all service accounts in the project is available in the **Access Management** section of the management console, on the **Service Users** tab. This tab is displayed only for users with the role listed in the table above and a verified email and phone number.

Up to 300 service accounts can be created in each project.
