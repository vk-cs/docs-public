# {heading(Access management)[id=trino-concepts-iam]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

To differentiate rights for {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=invited]} members of a {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} or {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=service accounts]}, Cloud Trino uses a unified identity and access management service — {linkto(../../../../access/iam#iam)[text=IAM]}. Access can be managed centrally from the {var(cloud)} management console.

The list of actions available to a project member in the Cloud Trino service is determined by:

- {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=Basic role]} — defines the default set of rights.
- Individual {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} — are {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=assigned]} additionally if those included in the {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=basic role]} are not sufficient.

The Cloud Trino service has no {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=specialized roles]}.

Roles and permissions can only be {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=assigned]} by project members with the `Project Owner`, `Superadministrator`, and `User Administrator (IAM)` roles. When granting roles and permissions, follow the principle of least privilege: a user should have only the rights without which their tasks cannot be performed.

## {heading(Role model example)[id=trino-concepts-iam-example]}

The basic roles `Project Owner`, `Superadministrator`, and `Project Administrator` get full access to all Cloud Trino operations; configuring individual {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} is not required.

To differentiate access, the {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=basic role]} `User Administrator (IAM)` or `Reader` can be used with additional {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]}. By default, access to Cloud Trino for these basic roles is limited:

- `User Administrator (IAM)`: no access.
- `Reader`: view-only access to some information about previously created Cloud Trino service instances.

You can grant any {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]}, creating a role model that suits you.

### {heading(Full access)[id=trino-concepts-iam-example-full-access]} 

All actions are allowed, including creating and deleting Cloud Trino service instances. This access level can be used by a project member with broad competencies and a high degree of responsibility. Creating new service instances can increase infrastructure costs, and deletion is an irreversible operation that can disrupt the operation of the application using your Cloud Trino service instance.

{cut(Full list of permissions available in Cloud Trino)}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_settings_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_settings_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_logs_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_versionupdate]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_monitoring_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_ui]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_reboot]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_settings_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_install]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_audit]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_execsql]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_uninstall]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_scaledisk]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_maintenance]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_backups_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_install]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_uninstall]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_innerips_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_updateinfo]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_viewhistory]}

{/cut}

### {heading(Infrastructure administration)[id=trino-concepts-iam-example-admin]}

Has almost all permissions except creating and deleting Cloud Trino service instances. Can be used by a project member acting as an infrastructure operator or DevOps engineer to manage already created service instances. It also implies impact on service costs, but only through scaling of already existing service instances.

{cut(List of permissions for infrastructure administration)}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_settings_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_settings_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_logs_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_versionupdate]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_monitoring_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_ui]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_reboot]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_settings_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_install]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_audit]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_execsql]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_uninstall]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_scaledisk]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_maintenance]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_backups_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_install]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_uninstall]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_innerips_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_updateinfo]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_viewhistory]}

{/cut}

### {heading(Service usage)[id=trino-concepts-iam-example-usage]}

Has no access to managing service instances and can only view information about them, except for audit data. Also has access to executing SQL queries via the console in the management console; can be used by project members who work with data, for example, developers or analysts.

{cut(List of permissions for service usage)}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_settings_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_monitoring_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_execsql]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_view]}

{/cut}

### {heading(Security audit)[id=trino-concepts-iam-example-security-audit]}

Cannot modify Cloud Trino service instance parameters and has no access to the console in the management console. Used exclusively for audit: studying logs and event history, as well as viewing the list of users. As a rule, it is suitable for security department employees.

{cut(List of permissions for security audit)}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_logs_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_monitoring_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_audit]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_backups_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_connections_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_extensions_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_grants_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_instances_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_trino_users_viewhistory]}

{/cut}