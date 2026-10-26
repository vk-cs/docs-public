# {heading(Access management)[id=kafka-concepts-iam]}

{include(/en/_includes/_translated_by_ai_en.md)}

To differentiate rights for {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=invited]} members of a {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} or {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=service accounts]}, Cloud Kafka uses a unified identity and access management service — {linkto(../../../../access/iam#iam)[text=IAM]}. Access can be managed centrally from the {var(cloud)} personal dashboard.

The list of actions available to a project member in the Cloud Kafka service is determined by:

- A {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=basic role]} — defines a default set of rights.
- Individual {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=assigned]} additionally, if those included in the {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=basic role]} are not sufficient.

    {note:info}
    For Cloud Kafka service instances created before 15.01.2026, permissions whose names start with `dp_kafka_` are used. In the personal dashboard, they are displayed with the `(legacy)` suffix in their name.
    {/note}

The Cloud Kafka service has no {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=specialized roles]}.

Only project members with the `Project Owner`, `Superadministrator`, and `User Administrator (IAM)` roles can {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=assign]} roles and permissions. When granting roles and permissions, follow the principle of least privilege: a user should have only the rights without which their tasks cannot be performed.

## {heading(Role model example)[id=kafka-concepts-iam-example]}

The basic roles `Project Owner`, `Superadministrator`, and `Project Administrator` get full access to all Cloud Kafka operations; configuring individual {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} is not needed.

To differentiate access, the {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=basic role]} `User Administrator (IAM)` or `Observer` can be used with additional {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]}. By default, access to Cloud Kafka for these basic roles is limited:

- `User Administrator (IAM)`: no access.
- `Observer`: can only view some information about previously created Cloud Kafka service instances.

You can grant any {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]}, creating a role model that suits you.

### {heading(Full access)[id=kafka-concepts-iam-example-full-access]}

All actions are allowed, including creating and deleting Cloud Kafka service instances. This access level can be used by a project member with broad expertise and a high degree of responsibility. Creating new service instances can increase infrastructure costs, and deletion is an irreversible operation that can disrupt the operation of an application using your Cloud Kafka service instance.

{cut(Full list of permissions available in Cloud Kafka)}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_install]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_uninstall]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_innerips_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_cruisecontrol]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_maintenance]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_reboot]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_scaledisk]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_ui]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_updateinfo]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_versionupdate]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}

### {heading(Infrastructure administration)[id=kafka-concepts-iam-example-admin]}

Has almost all permissions except creating and deleting Cloud Kafka service instances. Can be used by a project member acting as an infrastructure operator or DevOps engineer to manage already created service instances. It also implies an impact on the cost of services, but only through scaling existing service instances.

{cut(List of permissions for infrastructure administration)}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_install]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_uninstall]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_innerips_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_cruisecontrol]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_maintenance]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_reboot]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_scaledisk]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_ui]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_updateinfo]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_versionupdate]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_change]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_update]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}

### {heading(Service usage)[id=kafka-concepts-iam-example-usage]}

Has no access to service instance management and can only view information about them, except for audit data. Also allows creating, deleting, and viewing mirror connections for data replication between Kafka clusters. Can be used by project members working with data, for example, developers or data engineers.

{cut(List of permissions for service usage)}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{/cut}

### {heading(Security audit)[id=kafka-concepts-iam-example-security-audit]}

Cannot change the parameters of a Cloud Kafka service instance and has no access to the service graphical interface in the personal dashboard. Used exclusively for audit: examining logs and event history, as well as viewing the list of users. Typically suitable for security department employees.

{cut(List of permissions for security audit)}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/en/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}